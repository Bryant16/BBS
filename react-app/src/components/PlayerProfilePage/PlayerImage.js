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
            let response = await fetch(`/api/images/${playerid}`);
            if(response.ok){
                let profile_url = await response.json();
                setPlayerImageUrl(profile_url.URL)
            }
        }
        getProfileUrl()
    },[playerImageUrl])

    const updateFile = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        if(file) setImage(file);
    }
    const handleSubmit = async(e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("image", imageUpload)
            const res = await fetch(`/api/images/${playerid}`,{method:"POST",body:formData})
            if (res.ok){
                const imageUpload = await res.json();
                setPlayerImageUrl(imageUpload.URL)
            }
    }
    return (
        <div className='player_profile_container_image'>
        <div>
        {playerImageUrl ? <Image boxSize="200px" objectFit="cover" src={playerImageUrl}/>: <img className='profile_picture' src={defaultUser}/>}
        </div>
        <div className='file_upload_container'>
        <form onSubmit={handleSubmit}>
            <input type='file' name='file' onChange={updateFile} />
            <Button type="submit" size='small' variant="contained" startIcon={<CloudUploadIcon />}>Upload</Button>
        </form>
        </div>
        </div>
    )
}

export default PlayerImage;