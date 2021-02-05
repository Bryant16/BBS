import React from 'react';
import './HomePagePlayerCard.css'
import {useHistory, Link} from 'react-router-dom';
import PlayerProfilePage from '../PlayerProfilePage';


const HomePagePlayerCard =({player})=>{
    const history = useHistory();

    const profileClick= (e)=>{
        e.preventDefault();
        history.push(`/player/${player.id}`)
    }

    return (
        <div className='homepage_player_cards_individual'>
        <p>{player.first_name}</p>
        <p>{player.last_name}</p>
        <p>{player.position}</p>
        <p>{player.bats}</p>
        <p>{player.throws}</p>
        <p>{player.team_name}</p>
        <p>{player.team_city}</p>
        <p>{player.team_state}</p>
        <Link to={`/players/${player.id}`}>Profile Page</Link>
        {/* <button onClick={profileClick}>Profile Page</button> */}
        </div>
    )
}

export default HomePagePlayerCard;