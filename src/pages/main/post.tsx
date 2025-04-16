import { addDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { Posts } from "./mane"
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
interface Props {
    post: Posts
}
interface Like {
    userid_liking: string
}
export const Post = (props: Props) =>{
    const {post} = props;
    const [user] = useState(auth.currentUser);
    const [likes, setlikes] =useState<Like[] | null>(null)


    const likesref = collection(db, "likes"); // db from firebae "xyz" - collection name
    const likesDoc = query(likesref, where("userid_liked", "==", post.id))


    const getlikes= async() =>{
        const data = await getDocs(likesDoc);
        console.log(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        setlikes(data.docs.map((doc) => ({userid_liking: doc.data().userid_liking})))
    }


    const hasuserliked = likes?.find((like) => like.userid_liking === user?.uid)

    useEffect(()=>{
        getlikes()
    }, [])


    // const addlike = async () => {
    //     if (!user) {
    //         alert("You must be logged in to like a post.");
    //         return;
    //     }
    //     // Check if the user has already liked the post
    //     const likesQuery = query(likesref, where("userid_liking", "==", user.uid), where("userid_liked", "==", post.id));
    //     const querySnapshot = await getDocs(likesQuery);

    //     if (!querySnapshot.empty) {
    //         alert("You have already liked this post.");
    //         return;
    //     }
    //     // Add the like if the user hasn't already liked the post
    //     try {
    //         await addDoc(likesref, {
    //             userid_liking: user.uid,
    //             userid_liked: post.id
    //         });
    //     } catch (error) {
    //         console.error("Error adding like:", error);
    //     }

    //     setlikes((prev) => prev? [...prev, {userid_liking: user?.uid}] : [{userid_liking: user?.uid}])
    // };

    const AddRemovelike = async () => {
        if (!user) {
            alert("You must be logged in to like a post.");
            return;
        }
    
        // Check if the user has already liked the post
        const likesQuery = query(likesref, where("userid_liking", "==", user.uid), where("userid_liked", "==", post.id));
        const querySnapshot = await getDocs(likesQuery);
    
        if (!querySnapshot.empty) {
            // User has already liked the post, so remove the like
            try {
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
                // Update the likes state to remove the user's like
                setlikes((prev) => prev?.filter(like => like.userid_liking !== user.uid) || []);
            } catch (error) {
                console.error("Error removing like:", error);
            }
        } else {
            // User has not liked the post, so add the like
            try {
                await addDoc(likesref, {
                    userid_liking: user.uid,
                    userid_liked: post.id
                });
                // Update the likes state to add the user's like
                setlikes((prev) => prev ? [...prev, { userid_liking: user.uid }] : [{ userid_liking: user.uid }]);
            } catch (error) {
                console.error("Error adding like:", error);
            }
        }
    };


    return (  
        <div className="post-container">
            <div className="post-username">@{post.username}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-description">{post.disciption}</div>
            <div className="post-actions">
                <button className="like-button" onClick={AddRemovelike}>
                    {hasuserliked ? <>❤️</> : <>🤍</>}
                </button>
                {likes && <p className="likes-count">Likes: {likes.length}</p>}
            </div>
        </div>
    );
    
}

// import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { Posts } from "./mane";
// import { auth, db } from "../../config/firebase";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

// interface Props {
//     post: Posts;
// }

// export const Post = (props: Props) => {
//     const { post } = props;
//     const [user, setUser] = useState(auth.currentUser); // Track the authenticated user
//     const [likeAmount, setLikeAmount] = useState<number | null>(null);
//     const [userLikeId, setUserLikeId] = useState<string | null>(null); // Track the like ID for the current user

//     const likesRef = collection(db, "likes");

//     // Query to get likes for the current post
//     const likesDoc = query(likesRef, where("userid_liked", "==", post.id));

//     // Fetch likes and check if the current user has liked the post
//     const getLikes = async () => {
//         const data = await getDocs(likesDoc);
//         const likes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         setLikeAmount(likes.length);

//         // Check if the current user has liked the post
//         if (user) {
//             const userLike = likes.find((like) => like.id === user.uid);
//             if (userLike) {
//                 setUserLikeId(userLike.id); // Store the like ID for the current user
//             } else {
//                 setUserLikeId(null); // Reset if the user hasn't liked the post
//             }
//         }
//     };

//     // Listen for authentication state changes
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user); // Update the user state
//             getLikes(); // Re-fetch likes when the user changes
//         });

//         return () => unsubscribe(); // Cleanup subscription
//     }, []);

//     // Re-fetch likes when the post or user changes
//     useEffect(() => {
//         getLikes();
//     }, [post.id, user]);

//     const toggleLike = async () => {
//         if (!user) {
//             alert("You must be logged in to like a post.");
//             return;
//         }

//         try {
//             if (userLikeId) {
//                 // If the user has already liked the post, remove the like
//                 await deleteDoc(doc(likesRef, userLikeId));
//                 setUserLikeId(null); // Reset the user's like ID
//                 setLikeAmount((prev) => (prev !== null ? prev - 1 : 0)); // Decrement like count
//             } else {
//                 // If the user hasn't liked the post, add the like
//                 const newLike = await addDoc(likesRef, {
//                     userid_liking: user.uid,
//                     userid_liked: post.id,
//                 });
//                 setUserLikeId(newLike.id); // Store the new like ID
//                 setLikeAmount((prev) => (prev !== null ? prev + 1 : 1)); // Increment like count
//             }
//         } catch (error) {
//             console.error("Error toggling like:", error);
//         }
//     };

//     return (
//         <>
//             <div>{post.title}</div>
//             <div>{post.disciption}</div>
//             <div>@{post.username}</div>
//             <button onClick={toggleLike}>
//                 {userLikeId ? "❤️ Unlike" : "🤍 Like"}
//             </button>
//             {likeAmount !== null && <p>Likes: {likeAmount}</p>}
//         </>
//     );
// };