import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './NewPlayerForm.css';

const NewPlayerForm = ()=>{
    const history = useHistory();
    const [first_name, setFirstName] = useState("");
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
        const response = await fetch('/api/players/',{
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(newPlayer)
        })
        if(response.ok){
            const {id} = await response.json();
            history.push(`/players/${id}`)
        }else{
            alert('Error Player Could not be created')
        }
    }
    return (
        <div className='new_player_form_container'>
            <form>
                <div>
                <label>First Name:</label>
                <input 
                type='text'
                value={first_name}
                onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
                <div>
                <label>Last Name:</label>
                <input
                 type='text'
                 value={last_name}
                 onChange={(e)=>setLastName(e.target.value)} />
                </div>
                <div>
                <label>Height:</label>
                <input
                 type='text'
                 value={height}
                 onChange={(e)=>setHeight(e.target.value)} />
                </div>
                <div>
                <label>Weight:</label>
                <input 
                 type='text'
                 value={weight}
                 onChange={(e)=>setWeight(e.target.value)}/>
                </div>
                <div>
                <label>Position:</label>
                <input 
                 type='text'
                 value={position}
                 onChange={(e)=>setPosition(e.target.value)}/>
                </div>
                <div>
                <label>Address:</label>
                <input 
                 type='text'
                 value={address}
                 onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
                <label>Phone Number:</label>
                <input 
                 type='text'
                 value={phone_number}
                 onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                <label>email:</label>
                <input 
                 type='text'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label>Team Name:</label>
                <input 
                 type='text'
                 value={team_name}
                 onChange={(e)=>setTeam(e.target.value)}/>
                </div>
                <div>
                <label>Team City:</label>
                <input 
                 type='text'
                 value={team_city}
                 onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div>
                <label>Team State:</label>
                <input 
                 type='text'
                 value={team_state}
                 onChange={(e)=>setState(e.target.value)}/>
                </div>
                <div>
                <label>Bats:</label>
                <input 
                 type='text'
                 value={bats}
                 onChange={(e)=>setBats(e.target.value)}/>
                </div>
                <div>
                <label>Throws:</label>
                <input 
                 type='text'
                 value={throws}
                 onChange={(e)=>setThrows(e.target.value)}/>
                </div>
                <button onClick={registerClick}>Register</button>
            </form>
        </div>
    )
}

export default NewPlayerForm;