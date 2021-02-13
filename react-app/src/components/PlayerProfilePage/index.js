import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import { useDisclosure } from "react-use-disclosure";
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import './PlayerProfilePage.css';
import PlayerImage from './PlayerImage';
import Modal from './Modal';
import PlayerCard from './PlayerInfoCard';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {getPlayers} from '../../store/player';
import ReactPlayer from 'react-player';

const PlayerProfilePage = ()=>{
    const history = useHistory();
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const [videoUrl, setVideoUrl] =useState(false);
    const [videos, setVideos] = useState(false)
    const players = useSelector(state=> state.players)
    const [playerInfo, setPlayerInfo] = useState(players);
    const dispatch = useDispatch();
    // console.log(players,'this oneeeeeeee')
    // const playerInfoSingle = players.filter(player=> player.id !== playerid)
useEffect(()=>{
    const getVideos=async()=>{
        let res = await fetch(`/api/media/videos/${playerid}`)
        if(res.ok){
            let videos = await res.json();
            console.log(videos,'inside fetch')
            setVideos(videos.videos)
        }
    }
    getVideos()
},[])
    useEffect(()=>{
       const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player =await res.json();
                setPlayerInfo(single_player.player)
                
            }
        }
        getPlayer()
        dispatch(getNonePitcherForm(playerid))
        dispatch(getPitcherForm(playerid))   
    },[dispatch]);
    useEffect(()=>{
        dispatch(getPlayers())
    },[dispatch])

    const updateFile = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        if(file){
        formData.append("video", file)
        const res = await fetch(`/api/media/videos/${playerid}`,{method:"POST",body:formData})
        if (res.ok){
            const video = await res.json();
            setVideoUrl(video.video_url)
        }
    }
            // setImage(file)
    
    }
    console.log(videos,'vidsssssss')
    // console.log(players[playerid],'new players state')
    return (
    <div className='player_profile_page'>
        {players && (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
             {players[playerid] ? <PlayerCard playerid={playerid} players={players}/>:<h1>loading</h1>}
             
        </div>
        )}
        <div className='player_videos'>
        <div>
        <form>
                <input type='file' style={{"marginTop":'5em','opacity':1}} name='file' onChange={updateFile} size="60" accept="image/*"/>
        </form>
            <div className='video_container'>
            {videos && videos.map(vid=><ReactPlayer width='150px' height='240px'controls light url={vid.content} /> ) }
            </div>
        </div>
        </div>
    </div>
    )
}

export default PlayerProfilePage;