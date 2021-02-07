import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect } from 'react-router-dom';
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import defaultUser from "./default-user.png";
import './PlayerProfilePage.css';

const PlayerProfilePage = ()=>{
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
    },[dispatch]);
    useEffect(()=>{
        
    },[playerImageUrl])
    const updateFile = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        if(file) setImage(file);
    }
    const handleSubmit = async(e)=>{
            e.preventDefault();
            const formData = new FormData();
            // console.log('imageUpload',imageUpload)
            formData.append("image", imageUpload)
            const res = await fetch(`/api/images/${playerid}`,{method:"POST",body:formData})
            if (res.ok){
                const imageUpload = await res.json();
                return <Redirect to={`/players/${playerid}`}/> 
            }
    }
    return (
    <div>
        {playerInfo ? (
        <div className='player_profile_container'>
            <i class="fas fa-users"></i>
            <form onSubmit={handleSubmit}>
                <input type='file' name='file' onChange={updateFile} />
                <button type="submit" >Upload</button>
            </form>
            <Link to={`/players/${playerid}/evaluation`}>Evaluation</Link>
            <h2>first: {playerInfo.first_name}</h2>
            {playerImageUrl ? <img className='profile_picture' src={playerImageUrl}/>: <img className='profile_picture' src={defaultUser}/>}
            <h2>last: {playerInfo.last_name}</h2>
            <h2>height: {playerInfo.height}</h2>
            <h2>weight: {playerInfo.weight}</h2>
            <h2>position: {playerInfo.position}</h2>
            <h2>bats: {playerInfo.bats}</h2>
            <h2>address:{playerInfo.address}</h2>
            <h2>throws:{playerInfo.throws}</h2>
            <h2>phone_number: {playerInfo.phone_number}</h2>
            <h2>email:{playerInfo.email}</h2>
            <h2>team_name: {playerInfo.team_name}</h2>
            <h2>team_city: {playerInfo.team_city}</h2>
            <h2>team_state: {playerInfo.team_state}</h2>
            <h3>NOTES</h3>
            <h3>VIDEOS</h3>
            <h3>EVALUATION</h3>
        </div>
        ): <h1>loading</h1>}
    </div>
    )
}

export default PlayerProfilePage;