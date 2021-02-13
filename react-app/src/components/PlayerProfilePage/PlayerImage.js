import React,{useEffect, useState} from 'react';
import defaultUser from "./default-user.png";
import {Image} from "@chakra-ui/react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


const PlayerImage = ({playerid})=>{
    const [imageUpload, setImage] = useState('');
    const [playerImageUrl, setPlayerImageUrl] =useState(false);

    useEffect(()=>{
        const getProfileUrl = async()=>{
            let response = await fetch(`/api/media/images/${playerid}`);
            if(response.ok){
                let profile_url = await response.json();
                setPlayerImageUrl(profile_url.URL)
            }
        }
        getProfileUrl()
    },[playerImageUrl])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("image", imageUpload)
        // const res = await fetch(`/api/images/${playerid}`,{method:"POST",body:formData})
        // if (res.ok){
        //     const imageUpload = await res.json();
        //     setPlayerImageUrl(imageUpload.URL)
        // }
}
    const updateFile = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        if(file){
        formData.append("image", file)
        const res = await fetch(`/api/media/images/${playerid}`,{method:"POST",body:formData})
        if (res.ok){
            const imageUpload = await res.json();
            setPlayerImageUrl(imageUpload.URL)
        }
    }
            // setImage(file)
    
    }
    
    return (
        <div className='player_profile_container_image'>
        <div>
        {playerImageUrl ? <Image boxSize="245px" objectFit="cover" src={playerImageUrl}/>: <Image boxSize="245px" objectFit="cover" src={defaultUser}/>}
        </div>
        <div className='file_upload_container'>
        <form onSubmit={handleSubmit}>
                <input type='file' name='file' onChange={updateFile} size="60" accept="image/*"/>
                <label id='file_upload' for="file"><CloudUploadIcon/></label>
        </form>
        </div>
        </div>
    )
}

export default PlayerImage;