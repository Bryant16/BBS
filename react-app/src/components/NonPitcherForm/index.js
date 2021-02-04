import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const NonPitcherForm = ({playerId})=>{
const history = useHistory();
const [hitting, setHitting] = useState('');
const [power, setPower] = useState('');
const [running, setRunning] = useState('');
const [baseRunning, setBaseRunning] = useState('');
const [armStr, setArmStr] = useState('');
const [armAcc, setArmAcc] = useState('');
const [fielding, setFielding] = useState('');
const [armRange, setArmRange] = useState('');
const [instinct, setInstinct] = useState('');
const [aggressive, setAggressive] = useState('');
const [pull, setPull] = useState('');
const [away, setAway] = useState('');
const [opp, setOpp] = useState('');
// const [eval, setEval] = useState({});


const get_non_pitcher_form = async()=>{
    const res = await fetch(`/api/players/${playerId}/non_pitcher`);
    if(res.ok){
        // const eval = await res.json();
        // setEval(eval)
    }
}

const submitEval = async(e)=>{
    e.preventDefault();
    const new_non_pitcher_eval= {
        hitting,
        playerId,
        power,
        running,
        baseRunning,
        armStr,
        armAcc,
        fielding,
        armRange,
        instinct,
        aggressive,
        pull,
        away,
        opp

    }
    const response = await fetch(`/api/players/${playerId}/nonpitcher/`,{
        headers: { 'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(new_non_pitcher_eval)
    })
    if(response.ok){
        const json = await response.json();
        console.log(json)
        history.push(`/players/${playerId}`)
    }else{
        alert('Error Player Could not be created')
    }
}
return (
    <div className='pitcher_form_container'>
        <form>
            <div>
            <label>Hiting</label>
            <input 
            type='Integer'
            value={hitting}
            onChange={(e)=>setHitting(e.target.value)} />
            </div>
            <div>
            <label>Power</label>
            <input 
            type='Integer'
            value={power}
            onChange={(e)=>setPower(e.target.value)} />
            </div>
            <div>
            <label>Running Speed</label>
            <input 
            type='Integer'
            value={running}
            onChange={(e)=>setRunning(e.target.value)} />
            </div>
            <div>
            <label>Base Running</label>
            <input 
            type='Integer'
            value={baseRunning}
            onChange={(e)=>setBaseRunning(e.target.value)} />
            </div>
            <div>
            <label>Arm Strength</label>
            <input 
            type='Integer'
            value={armStr}
            onChange={(e)=>setArmStr(e.target.value)} />
            </div>
            <div>
            <label>Arm Accuracy</label>
            <input 
            type='Integer'
            value={armAcc}
            onChange={(e)=>setArmAcc(e.target.value)} />
            </div>
            <div>
            <label>Fielding</label>
            <input 
            type='Integer'
            value={fielding}
            onChange={(e)=>setFielding(e.target.value)} />
            </div>
            <div>
            <label>Arm Range</label>
            <input 
            type='Integer'
            value={armRange}
            onChange={(e)=>setArmRange(e.target.value)} />
            </div>
            <div>
            <label>Baseball Instinct</label>
            <input 
            type='Integer'
            value={instinct}
            onChange={(e)=>setInstinct(e.target.value)} />
            </div>
            <div>
            <label>Aggresiveness</label>
            <input 
            type='Integer'
            value={aggressive}
            onChange={(e)=>setAggressive(e.target.value)} />
            </div>
            <div>
            <label>Pull</label>
            <input 
            type='text'
            value={pull}
            onChange={(e)=>setPull(e.target.value)}
            placeholder='Pull'
            />
            </div>
            <div>
            <label>Strength Away</label>
            <input 
            type='text'
            value={away}
            onChange={(e)=>setAway(e.target.value)}
            placeholder='Str Away'
            />
            </div>
            <div>
            <label>Opposite Field</label>
            <input 
            type='text'
            value={opp}
            onChange={(e)=>setOpp(e.target.value)}
            placeholder='Opp Field'
            />
            </div>
            <button onClick={submitEval}>Submit</button>
        </form>
    </div>
)}

export default NonPitcherForm;