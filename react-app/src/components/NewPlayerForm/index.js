import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Input, Select } from "@chakra-ui/react";
import Button from '@material-ui/core/Button';
import './NewPlayerForm.css';
import {editPlayerProfile} from '../../store/player';
import {getPlayers, addPlayerProfile} from '../../store/player';

const NewPlayerForm = ({playerid, handleClose})=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [first_name, setFirstName] = useState("" );
    const [last_name, setLastName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [position, setPosition] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [team_name, setTeam] = useState("");
    const [team_city, setCity] = useState("");
    const [team_state, setState] = useState("");
    const [bats, setBats] = useState("");
    const [throws, setThrows] = useState("");
    const [playerInfo, setPlayerInfo] = useState(false);
    const [loaded, setLoad] = useState(false);
    const [hotList, setHotList] = useState(true);
    const players = useSelector(state => state.players);

    useEffect(()=>{
        dispatch(getPlayers())
        const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player = await res.json();
                setPlayerInfo(single_player.player)
                setLoad(true)
            }
        }
        getPlayer()
        try{
            if(playerInfo){
            setFirstName(playerInfo.first_name)
            setLastName(playerInfo.last_name)
            setAddress(playerInfo.address)
            setHeight(playerInfo.height)
            setWeight(playerInfo.weight)
            setPosition(playerInfo.position)
            setPhone(playerInfo.phone_number)
            setEmail(playerInfo.email)
            setTeam(playerInfo.team_name)
            setCity(playerInfo.team_city)
            setState(playerInfo.team_state)
            setThrows(playerInfo.throws)
            setBats(playerInfo.bats)
            setHotList(playerInfo.hot_list)
            }
        }catch(e){
        }
    },[dispatch, loaded])
  
    const registerClick = async(e)=>{
        e.preventDefault();
        const newPlayer = {
            first_name,
            last_name,
            height,
            weight,
            position,
            address,
            phone_number,
            email,
            team_name,
            team_city,
            team_state,
            bats,
            throws,
            hotList
        }
        if(players[playerid]){
            handleClose()
            dispatch(editPlayerProfile(playerid, newPlayer))
    }else{
        dispatch(addPlayerProfile(newPlayer))
        .then((id)=> history.push(`/players/${id}`))
      
    }
    }
    let playerPositions = ['P','C','1B','2B','3B','SS','RF','LF','CF']
    return (
         <div className='new_player_form_container'>
            {players && (<form>
                <div>
                <Input 
                type='text'
                required
                placeholder='First Name'
                value={first_name}
                onChange={(e)=>setFirstName(e.target.value)}/>
                </div>   
                <div>
                <Input
                 type='text'
                 value={last_name}
                 placeholder='Last Name'
                 onChange={(e)=>setLastName(e.target.value)} />
                </div>
                <div>
                <Input
                 type='text'
                 value={height}
                 placeholder='Height'
                 onChange={(e)=>setHeight(e.target.value)} />
                </div>
                <div>
                <Input 
                 type='text'
                 value={weight}
                 placeholder='Weight'
                 onChange={(e)=>setWeight(e.target.value)}/>
                </div>
                <div>
                <Select 
                 placeholder='Position'
                 value={position}
                 onChange={(e)=>setPosition(e.target.value)}>
                     {playerPositions.map((pos)=>{
                         return(
                             <option value={pos}>{pos}</option>
                         )
                     })}
                 </Select>
                <Select 
                 placeholder='Bats'
                 value={bats}
                 onChange={(e)=>setBats(e.target.value)}>
                     <option value='R'>R</option>
                     <option value='L'>L</option>
                     <option value='Both'>Both</option>
                 </Select>
                
                <Select 
                 placeholder='Throws'
                 value={throws}
                 onChange={(e)=>setThrows(e.target.value)}>
                    <option value='R'>R</option>
                    <option value='L'>L</option>
                    <option value='Both'>Both</option>
                </Select>
                </div>
                <div>
                <Input 
                 type='text'
                 value={address}
                 placeholder='Full Address'
                 onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
                <Input 
                 type='text'
                 value={phone_number}
                 placeholder='Phone 555-555-5555'
                 onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                <Input 
                 type='text'
                 value={email}
                 placeholder='Email'
                 onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <Input 
                 type='text'
                 value={team_name}
                 placeholder='Team Name'
                 onChange={(e)=>setTeam(e.target.value)}/>
                </div>
                <div>
                <Input 
                 type='text'
                 placeholder='Team City'
                 value={team_city}
                 onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div>
                <Input 
                 type='text'
                 placeholder='Team State'
                 value={team_state}
                 onChange={(e)=>setState(e.target.value)}/>
                </div>
                <div>
                    <label style={{'marginRight':'.5em'}}>Track</label>
                    <Input
                    type='checkbox'
                    checked={hotList}
                    onChange={(e)=> setHotList(e.target.checked)}
                    // onChange={(e)=>setHotList(e.target)}
                    ></Input>
                </div>
                <Button id="register_button" size='large' variant="contained" color='primary' onClick={registerClick}>Register</Button>
            </form>) }
        </div> 
    )
}

export default NewPlayerForm;