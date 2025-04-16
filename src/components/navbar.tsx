// import { Link } from "react-router-dom"
// import { auth } from "../config/firebase"
// export const Navbar = () => {
//     return (
//         <>
//             <div>
//                 <Link to="/" >Home</Link>
//                 <Link to="/login" >Login</Link>
//                 {auth.currentUser?.displayName}
//             </div>
//         </>
//     )
// }

//using useeffect and usestate to rerender the component login components navigates t0 main but it doesnt render or refresh the navbar so username is not visible 
//the Navbar component is not re-rendering to reflect the authenticated user's display name. This is likely because the auth object's state change is not triggering a re-render of the Navbar component.
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import '../App.css'

export const Navbar = () => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signoutuser = async () => {
        await signOut(auth)

    }

    return (
        <div id="nav">
            <div>
            <Link to="/">Home</Link>
            {!user ? <Link to="/login">Login</Link> : <Link to="./createpost">Create Post</Link> }
            </div>
            <div id="userinfo">

            {user && (
                <>
                    <div>{user?.displayName}</div>
                    <img src={user?.photoURL || " "} alt="" />
                    <button onClick={signoutuser} >Log Out</button>
                </>
            )
            }
            </div>
        </div>
    );
};