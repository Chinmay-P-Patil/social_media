import {useForm} from "react-hook-form"
import * as yup from "yup"
import {auth} from "../../config/firebase"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useNavigate } from "react-router-dom"

//this is for typescript
interface CreatePostData {
    title: string,
    description: string
}

export const Postform = () =>{
    const [user, setUser] = useState(auth.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a title")

    })

    const {register,handleSubmit,formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const postref = collection(db, "posts");

    const oncreatepost = async (data: CreatePostData)=>{
        console.log(data);

        await addDoc(postref, { 
            title: data.title,
            disciption: data.description,
            username: user?.displayName,
            userid: user?.uid
        })
        navigate("/")
    }
    return (
        <>
        <div className="post-form-container">

        {user && 
        <form action="" onSubmit={handleSubmit(oncreatepost)} className="post-form">
            <input type="text" placeholder="Title" className="post-input" {...register("title")}/>
            {errors.title?.message}
            <textarea className="post-input post-textarea" placeholder="Description" {...register("description")} />
            {errors.description?.message}
            <input type="submit" className="post-button" />
        </form>
        }
        </div>
        </>
    )
}
 