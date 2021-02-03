import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';

const PlayerProfilePage = ()=>{
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const [playerInfo, setPlayerInfo] = useState(false);

    useEffect(()=>{
       const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player =await res.json();
                setPlayerInfo(single_player.player)
            }
        }
        getPlayer()
    },[]);

    return (
    <div>
        {playerInfo ? (
        <div className='player_profile_container'>
            <i class="fas fa-users"></i>
            <Link to={`/players/${playerid}/evaluation`}>Evaluation</Link>
            <h2>first: {playerInfo.first_name}</h2>
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