import { useNavigate } from "react-router-dom"
import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth" 
import google from "../assets/google.png"
export const Login =  () => {
    const navigate = useNavigate();

    const SignInWithGoogle = async () =>{
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/');
    }
    return (
        <>
        <div className="flex flex-col grid justify-items-center">
        <p>Sign In with Google to Continue</p>
        <button onClick={SignInWithGoogle} className="flex border-2 border-gray-500 rounded-lg w-45 pl-1"> <img src={google} alt="" className="h-6 w-6"/> <p className="w-35 text-center">Sign In with google</p></button>
        </div>
        </>
    )
}
