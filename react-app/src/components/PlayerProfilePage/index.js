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
import {getPlayers} from '../../store/player';

const PlayerProfilePage = ()=>{
    const history = useHistory();
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const players = useSelector(state=> state.players)
    const [playerInfo, setPlayerInfo] = useState(players);
    const dispatch = useDispatch();
    // console.log(players,'this oneeeeeeee')
    // const playerInfoSingle = players.filter(player=> player.id !== playerid)
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
        console.log('did this run')
        dispatch(getPlayers())
    },[dispatch])
   
    console.log(players[playerid],'new players state')
    return (
    <div className='player_profile_page'>
        {players && (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
             {players[playerid] ? <PlayerCard playerid={playerid} players={players}/>:<h1>loading</h1>}
        </div>
        )}
    </div>
    )
}

export default PlayerProfilePage;