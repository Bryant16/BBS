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

const PlayerProfilePage = ()=>{
    const history = useHistory();
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const [playerInfo, setPlayerInfo] = useState(false);
    const dispatch = useDispatch();
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

   
    
    return (
    <div className='player_profile_page'>
        {playerInfo ? (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
             <PlayerCard playerid={playerid} playerInfo={playerInfo}/>
        </div>
        ): <h1>loading</h1>}
    </div>
    )
}

export default PlayerProfilePage;