import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import defaultUser from "./default-user.png";
import {Image} from "@chakra-ui/react";
import './PlayerProfilePage.css';

const PlayerProfilePage = ()=>{
    const history = useHistory();
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const [playerInfo, setPlayerInfo] = useState(false);
    const [imageUpload, setImage] = useState('');
    const [playerImageUrl, setPlayerImageUrl] =useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
       const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player =await res.json();
                setPlayerInfo(single_player.player)
            }
        }
        const getProfileUrl = async()=>{
            let response = await fetch(`/api/images/${playerid}`);
            if(response.ok){
                let profile_url = await response.json();
                setPlayerImageUrl(profile_url.URL)
            }
        }
        getPlayer()
        getProfileUrl()
        dispatch(getNonePitcherForm(playerid))
        dispatch(getPitcherForm(playerid))
        console.log('rerender')
    },[dispatch, playerImageUrl]);

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
    console.log(playerImageUrl)
    return (
    <div className='player_profile_page'>
        {playerInfo ? (
        <div className='player_profile_container'>
            <div className='player_profile_container_image'>
            <div>
            {playerImageUrl ? <Image boxSize="200px" objectFit="cover" src={playerImageUrl}/>: <img className='profile_picture' src={defaultUser}/>}
            </div>
            <div className='file_upload_container'>
            <form onSubmit={handleSubmit}>
                <input type='file' name='file' onChange={updateFile} />
                <button type="submit" >Upload</button>
            </form>
            </div>
            </div>
            <div className='player_info_container'>
            <div>
                <Link to={`/players/${playerid}/evaluation`}>Evaluation</Link>
                <h2>first: {playerInfo.first_name}</h2>
                <h2>last: {playerInfo.last_name}</h2>
                <h2>height: {playerInfo.height}</h2>
                <h2>weight: {playerInfo.weight}</h2>
                <h2>position: {playerInfo.position}</h2>
                <h2>bats: {playerInfo.bats}</h2>
            </div>
            <div>
                <h2>address:{playerInfo.address}</h2>
                <h2>throws:{playerInfo.throws}</h2>
                <h2>phone_number: {playerInfo.phone_number}</h2>
                <h2>email:{playerInfo.email}</h2>
                <h2>team_name: {playerInfo.team_name}</h2>
                <h2>team_city: {playerInfo.team_city}</h2>
                <h2>team_state: {playerInfo.team_state}</h2>
            </div>
            <div>
                <h3>VIDEOS</h3>
            </div>
            </div>
        </div>
        ): <h1>loading</h1>}
    </div>
    )
}

export default PlayerProfilePage;