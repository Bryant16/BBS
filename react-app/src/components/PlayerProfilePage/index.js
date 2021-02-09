import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import { useDisclosure } from "react-use-disclosure";
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import './PlayerProfilePage.css';
import PlayerImage from './PlayerImage';
import Modal from './Modal';


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
            <div className='player_info_container'>
            <div>
                <h2>{(playerInfo.first_name).toUpperCase()} {(playerInfo.last_name).toUpperCase()}</h2>
                <h2>{playerInfo.height}, {playerInfo.weight}lbs</h2>
                <h2>{playerInfo.position}, Bat:{playerInfo.bats}, Throws:{playerInfo.throws} </h2>
               
            </div>
            <div>
                <h2>address:{playerInfo.address}</h2>
                <h2>phone_number: {playerInfo.phone_number}</h2>
                <h2>email:{playerInfo.email}</h2>
                <h2>team_name: {playerInfo.team_name}</h2>
                <h2>team_city: {playerInfo.team_city}</h2>
                <h2>team_state: {playerInfo.team_state}</h2>
                <Link to={`/players/${playerid}/evaluation`}>Evaluation</Link>
                <Modal playerid={playerid}/>
            </div>
            </div>
        </div>
        ): <h1>loading</h1>}
    </div>
    )
}

export default PlayerProfilePage;