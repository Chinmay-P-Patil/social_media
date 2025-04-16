import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Posts {
    id: string,
    userid: string,
    title: string,
    username: string,
    disciption: String
}

export const Main = () =>{  
    const [postlist, setpostlist] =useState<Posts[] | null>(null) 
    
    const postref = collection(db, "posts");

    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const getposts = async () =>{
        const data = await getDocs(postref);
        setpostlist(data.docs.map((doc)=>({...doc.data(), id: doc.id}))as Posts[]) 
    }

    useEffect(() =>{
        getposts();
    }, [])

    
    return(
        <>
        {user? <div >{postlist?.map((post) => (
            <><Post post={post} /></>
            ))}</div> : <div>this is home</div>}
         
        </>
    )
}
 