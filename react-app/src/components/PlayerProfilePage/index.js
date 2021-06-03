import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';
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
import {infoPDF} from '../../store/player';
import helper from './baseballHelper.png';

const PlayerProfilePage = ()=>{
    const nonPitcher = useSelector(state=> state.nonPitcher);
    const pitcher = useSelector((state) => state.pitcher);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const {playerid} = useParams();
    const [videoUrl, setVideoUrl] =useState(false);
    const [videos, setVideos] = useState(false)
    const players = useSelector(state=> state.players);
    const [playerImageUrl, setPlayerImageUrl] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=>{
    const getVideos=async()=>{
        let res = await fetch(`/api/media/videos/${playerid}`)
        if(res.ok){
            let videos = await res.json();
            setVideos(videos.videos)
        }
    }
    
    const getTheNotes = async()=>{
        const res = await fetch(`/api/notes/${playerid}/`);
        if(res.ok){
            const notesJson = await res.json();
            const playerNotes = {}
        notesJson.forEach(note=>{
            if(note.title ==='Abilities'){
              playerNotes['Abilities'] = note.text
            }else if(note.title === 'Weakness'){
                playerNotes['Weakness'] = note.text
            }else if(note.title === 'Physical Description'){
                playerNotes['Physical Description'] = note.text
            }else if(note.title === 'habits'){
                playerNotes['habits'] = note.text
            }else if(note.title === 'dedication'){
                playerNotes['dedication'] = note.text
            }else if(note.title === 'agility'){
                playerNotes['agility'] = note.text
            }else if(note.title === 'apitude'){
                playerNotes['apitude'] = note.text
            }else if(note.title === 'pMaturity'){
                playerNotes['pMaturity'] = note.text
            }else if(note.title === 'eMaturity'){
                playerNotes['eMaturity'] = note.text
            }else if(note.title === 'Date'){
                playerNotes['Date'] = note.text
            }else{
                playerNotes['Summary'] = note.text
            }
        })
        setNotes(playerNotes)
            }
         }
        getTheNotes()
            
    const getProfileUrl = async()=>{
        let response = await fetch(`/api/media/images/${playerid}`);
        if(response.ok){
            let profile_url = await response.json();
            setPlayerImageUrl(profile_url.URL)
        }
    }
    getProfileUrl()
    getVideos()
},[videoUrl, playerid,playerImageUrl]);

    useEffect(()=>{
        dispatch(getAllNotes(playerid))
        dispatch(getNonePitcherForm(playerid))
        dispatch(getPitcherForm(playerid))  
        dispatch(getPlayers())
        const pdfPlayer = {
            player: players[playerid]
         }
         dispatch(infoPDF(pdfPlayer)) 
        
    },[dispatch,playerid]);

    const updateFile = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const file = e.target.files[0];
        const formData = new FormData();
        if(file){
        formData.append("video", file)
        formData.set("size", file.size)
        const res = await fetch(`/api/media/videos/${playerid}`,{method:"POST",body:formData})
        if (res.ok){
            const video = await res.json();
            setVideoUrl(video.video_url)
            setLoading(false)
        }else{
            setLoading(false)
            alert('Upload Failed')
        }
    }
    }
  
    return (
    players[playerid] ? (<div className='player_profile_page'>
        {players && (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
             {players[playerid] ? <PlayerCard playerid={playerid} players={players}  pitcherEvals={pitcher[0]}nonPitcherEvals={nonPitcher[0]} notes={notes} media={videos} url={playerImageUrl}/>:<h1>loading</h1>}
             
        </div>
        )}
        <div className='player_videos'>
            {loading && <img src={helper} alt="centered image" className='loading_image' />}
        <form>
                <label id='file_upload' for="video" ><Button style={{'min-width':'8em','height':'2.5em', 'background-color':'lightskyblue','border':'1px solid lightskyblue','color':'white'}}class='new_video'>New Media</Button></label>
                <input type='file'  style={{'marginTop':'.5em', 'opacity':'0'}} name='video' onChange={updateFile} size="50" accept="image/*,video/*"/>
        </form>
            <div className='video_container'>
            {videos && videos.map(vid=>
            {if(vid.type.includes('video')){
                return <VideoModal setVideos={setVideos} url={vid.content} vid={vid} playerid={playerid}/>
            }else{
                return <PictureModal setVideos={setVideos} playerid={playerid} image={vid} content={vid.content} content_type={vid.content_type}/>
            }}
            ) }
            </div>
        <div>
        </div>
        </div>
    </div>): <Redirect to='/' />
    )
}

export default PlayerProfilePage;