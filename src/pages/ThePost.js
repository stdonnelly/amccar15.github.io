import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from '../firebase-config';
import { collection, doc, getDoc } from 'firebase/firestore';

function ThePost() {

    const { id } = useParams();

    const postsCollectionRef = collection(db, "posts");

    const [docDetails, setDocDetails] = useState([]);

    const [seeAuthor, setAuthor] = useState([]);

    useEffect(() => {
        const getPost = async (postID) => {
            const postDoc = doc(postsCollectionRef, postID);
            const docSnap = await getDoc(postDoc);
            setDocDetails(docSnap.data());
    
            if(docSnap.exists()) {
                console.log("Document data: ", docSnap.data());

                setAuthor(docSnap.data().author.name);
            } else {
                console.log("Error");
            }
        };
        getPost(id);
    }, []);
    
    return (
        <div className="thePost"> 
            <div className="postHeader">
                <h1> {docDetails.title} </h1>
            </div>
            <div className="postTextContainer" dangerouslySetInnerHTML={{__html: docDetails.postText}}></div>
                <h3> 
                    @{seeAuthor}
                </h3>
            </div>
    );
}

export default ThePost;