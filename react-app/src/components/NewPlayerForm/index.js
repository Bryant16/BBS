import React, {useEffect, useState} from 'react';
import {useHistory, useParams, Redirect} from 'react-router-dom';
import { Input, Text, Select } from "@chakra-ui/react"
import './NewPlayerForm.css';

const NewPlayerForm = ({playerid, handleClose})=>{
    const history = useHistory();
    // const {playerid} = useParams();
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
    const [priorForm, setPriorForm] = useState(false);

    useEffect(()=>{
        const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player =await res.json();
                setPlayerInfo(single_player.player)
                setLoad(true)
            }
        }
        getPlayer()
        try{
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
            setPriorForm(true)
        }catch(e){
        }
    },[loaded])

    console.log('playerinfo',playerInfo)
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
        }
        console.log('new player', newPlayer)
        console.log(priorForm,'prior form')
        if(!priorForm){
        const response = await fetch('/api/players/',{
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(newPlayer)
        })
        if(response.ok){
            const {id} = await response.json();
            history.push(`/players/${id}`)
        }
    }else{
        const res = await fetch(`/api/players/${playerid}`,{
            headers:{'Content-type': 'application/json'},
            method: 'PUT',
            body:JSON.stringify(newPlayer)
           });
           if(res.ok){
               handleClose()
               return <Redirect to={`/players/${playerid}`} />
            //    history.push(`/players/${playerid}`)
           }
    }
    }
    let playerPositions = ['P','C','1B','2B','3B','SS','RF','LF','CF']
    return (
         <div className='new_player_form_container'>
            {(<form>
                <div>
                <label>First Name: </label>
                <Input 
                type='text'
                placeHolder='First Name'
                value={first_name}
                onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
                <div>
                <label>Last Name: </label>   
                <Input
                 type='text'
                 value={last_name}
                 placeHolder='Last Name'
                 onChange={(e)=>setLastName(e.target.value)} />
                </div>
                <div>
                <label>Height(ex. 5'11): </label>
                <Input
                 type='text'
                 value={height}
                 placeHolder='Height'
                 onChange={(e)=>setHeight(e.target.value)} />
                </div>
                <div>
                <label>Weight: </label>
                <Input 
                 type='text'
                 value={weight}
                 placeHolder='Weight'
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
                <label>Full Address: </label>
                <Input 
                 type='text'
                 value={address}
                 placeHolder='Full Address'
                 onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
                <label>Phone: </label>
                <Input 
                 type='text'
                 value={phone_number}
                 placeHolder='Phone 555-555-5555'
                 onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                <label>Email: </label>
                <Input 
                 type='text'
                 value={email}
                 placeHolder='Email'
                 onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label>Team Name: </label>
                <Input 
                 type='text'
                 value={team_name}
                 placeHolder='Team Name'
                 onChange={(e)=>setTeam(e.target.value)}/>
                </div>
                <div>
                <label>Team City: </label>
                <Input 
                 type='text'
                 placeHolder='Team City'
                 value={team_city}
                 onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div>
                <label>Team State: </label>
                <Input 
                 type='text'
                 placeHolder='Team State'
                 value={team_state}
                 onChange={(e)=>setState(e.target.value)}/>
                </div>
                <button onClick={registerClick}>Register</button>
            </form>) }
        </div> 
    )
}

export default NewPlayerForm;