import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import './PlayerProfilePage.css';
import PlayerImage from './PlayerImage';
import PlayerCard from './PlayerInfoCard';
import {getPlayers} from '../../store/player';
import {getAllNotes} from '../../store/note';
import Button from '@material-ui/core/Button';
import PictureModal from './PictureModal';
import VideoModal from './VideoModal';


const PlayerProfilePage = ()=>{
    const nonPitcher = useSelector(state=> state.nonPitcher);
    const pitcher = useSelector((state) => state.pitcher);
    const notes = useSelector(state => state.notes);
    const {playerid} = useParams();
    const [videoUrl, setVideoUrl] =useState(false);
    const [videos, setVideos] = useState(false)
    const players = useSelector(state=> state.players);
    const dispatch = useDispatch();
useEffect(()=>{
    const getVideos=async()=>{
        let res = await fetch(`/api/media/videos/${playerid}`)
        if(res.ok){
            let videos = await res.json();
            setVideos(videos.videos)
        }
    }
    getVideos()
},[videoUrl, playerid]);

    useEffect(()=>{
        dispatch(getAllNotes(playerid))
        dispatch(getNonePitcherForm(playerid))
        dispatch(getPitcherForm(playerid))  
        dispatch(getPlayers()) 
    },[dispatch,playerid]);

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
   
    const whichEval=()=>{
        if(pitcher[0]){
            return pitcher[0]
        }else{
            return nonPitcher[0]
        }
    }
    return (
    <div className='player_profile_page'>
        {players && (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
             {players[playerid] ? <PlayerCard playerid={playerid} players={players} evals={whichEval()} notes={notes}/>:<h1>loading</h1>}
             
        </div>
        )}
        <div className='player_videos'>
        <form>
                <label id='file_upload' for="video" ><Button style={{'width':'6em','height':'2em', 'background-color':'white','border':'1px solid lightskyblue'}}class='new_video'>New Media</Button></label>
                <input type='file' style={{'marginTop':'.5em', 'opacity':'0'}} name='video' onChange={updateFile} size="50" accept="image/*"/>
        </form>
            <div className='video_container'>
            {videos && videos.map(vid=>
            {if(vid.type.includes('video')){
                return <VideoModal setVideos={setVideos} url={vid.content}  playerid={playerid}/>
            }else{
                return <PictureModal setVideos={setVideos} playerid={playerid} content={vid.content} content_type={vid.content_type}/>
            }}
            ) }
            </div>
        <div>
        </div>
        </div>
    </div>
    )
}

export default PlayerProfilePage;