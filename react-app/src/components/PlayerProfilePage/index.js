import React, { useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect,Link } from 'react-router-dom';
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
import {Image} from "@chakra-ui/react";
import {infoPDF} from '../../store/player';
import helper from './baseballHelper.png';
import ReactPlayer from 'react-player';
import AWS from 'aws-sdk';

const PlayerProfilePage = ()=>{
    const{REACT_APP_aws_access_key_id,REACT_APP_aws_secret_access_key} = process.env;

    const config = {
    bucketName: 'bbscouting',
    region: 'us-east-1',
    mode: 'no-cors',
    accessKeyId: REACT_APP_aws_access_key_id,
    secretAccessKey: REACT_APP_aws_secret_access_key
    }
    
    AWS.config.update({ region: config.region, accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey });
    
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const nonPitcher = useSelector(state=> state.nonPitcher);
    const pitcher = useSelector((state) => state.pitcher);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const {playerid} = useParams();
    const [videoUrl, setVideoUrl] =useState(false);
    const [videos, setVideos] = useState(false)
    const players = useSelector(state=> state.players);
    const [playerImageUrl, setPlayerImageUrl] = useState(false);
    const [loadPercentage, setLoadPercentage] = useState(0);
    const [controls, setControls] = useState(false);
    const dispatch = useDispatch();
    
    const getVideos=async()=>{
        let res = await fetch(`/api/media/videos/${playerid}`)
        if(controls) setControls(false);
        if(res.ok){
            let videos = await res.json();
            setVideos(videos.videos)
        }
    }

    useEffect(()=>{
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

    const getUrlUpload = async(data,file)=>{
        try{
            const res = await fetch(`/api/media/media_url/${playerid}`,
            {method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({data,type:file.type})})
            if (res.ok){
                const {url} = await res.json();
                setVideoUrl(url)
                setLoading(false)
            }
        }catch(err){
                alert('Sorry There was an Error with the Upload')
                setLoading(false)
            }
      }
  const updateFile = async(e)=>{
      e.preventDefault();
      const file = e.target.files[0];
      var params = {Bucket: config.bucketName, Key: file.name, Body: file,ACL:'public-read'};
      setLoading(true)  
      s3
      .upload(params, async function(err, data) {
          return new Promise((resolve,reject)=>{
              getUrlUpload(data,file)
              resolve()
          })
            }).on('httpUploadProgress', function(evt) {
                setLoadPercentage(parseInt((evt.loaded * 100) / evt.total)+'%');
                })
  }
  const handleOpenButton =(e)=>{
      e.preventDefault()
    document.getElementById("new_media_upload").click()
  }
  const handleVideoOpen =(e,vid)=>{
      e.preventDefault()
      setVideos([vid])
      setControls(true)
      console.log()
  }
  const backToPlayerHome = (e)=>{
    e.preventDefault();
    getVideos()
  }
  const deleteContent = async(e)=>{
    e.preventDefault();
    let id = videos[0].id
       if(window.confirm('Delete this item?')){
        const res = await fetch('/api/media/videos', {
            headers: {'Content-type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({id})
        })
        if(res.ok){
            const {removed} = await res.json();
            if(removed){
                const getVideos=async()=>{
                    let res = await fetch(`/api/media/videos/${playerid}`)
                    if(res.ok){
                        let videos = await res.json();
                        setVideos(videos.videos)
                    }
                }
                getVideos()
                setControls(false)
            }
        }
    }
  };
    return (
    players[playerid] ? (<div className='player_profile_page'>
        {players && (
            <Grid container>
                <Grid item xs={12} sm={4} md={6}>
                    <Grid container justify="center">
                        <PlayerImage playerid={playerid}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    {players[playerid] ? <PlayerCard playerid={playerid} players={players}  pitcherEvals={pitcher[0]}nonPitcherEvals={nonPitcher[0]} notes={notes} media={videos} url={playerImageUrl}/>:<h1>loading</h1>}
                </Grid>
            </Grid>
        )}
        <div className='player_videos'>
            {loading && <div className='loader_container'><img src={helper} alt="centered image" className='loading_image' /><h1 >{loadPercentage}</h1></div>}
        <form>
                {!controls&&<Button onClick={handleOpenButton}  variant="contained" color="primary" >New Media</Button>}
                {controls&&<Button id='profile_back_button' onClick={backToPlayerHome}  variant="contained" color="primary">Back</Button>}
                {controls&&<Button id='profile_delete_button' onClick={deleteContent}  variant="contained" color="secondary">Delete</Button>}
                <input type='file'  id='new_media_upload'style={{'marginTop':'.5em', 'opacity':'0'}} name='video' onChange={updateFile} size="50" accept="image/*,video/*"/>
        </form>
            <div className='video_container'>
            {videos && videos.map(vid=>
            {if(vid.type.includes('video')){
                return <Link onClick={(e)=>handleVideoOpen(e,vid)}><ReactPlayer className='react-player' width='22em' height='22em' style={{'margin':'',"box-shadow":'5px 5px 15px 5px #B5B5B5', 'border-bottom':'1px solid black'}} controls={controls} playing={false} url={vid.content} /></Link>
                // return <VideoModal setVideos={setVideos} url={vid.content} vid={vid} playerid={playerid}/>
            }else{
                return <Link onClick={(e)=>handleVideoOpen(e,vid)}><Image width={!controls?'20em':'40em'} height={!controls ? '22em':'40em'}  objectFit={!controls?"fill":'scale-down'} src={vid.content} className='react-player'></Image> </Link>
                // return <PictureModal setVideos={setVideos} playerid={playerid} image={vid} content={vid.content} content_type={vid.content_type}/>
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