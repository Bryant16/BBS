import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const NonPitcherForm = ({playerId})=>{
const history = useHistory();
const {nonPitcher} = useSelector(state=> state.nonPitcher);
const [evaluations, setEvaluations] = useState();
const [hitting, setHitting] = useState("" || nonPitcher.hitting_ability);
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
console.log(nonPitcher)


useEffect(()=>{
    const get_non_pitcher_form = async()=>{
        const res = await fetch(`/api/players/${playerId}/nonpitcher/`);
        if(res.ok){
            const player_evaluations = await res.json();
            setEvaluations(player_evaluations[0].non_pitcher_evaluations[0])
        }
    }
    get_non_pitcher_form()
},[])

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
const hitFunc = (e)=>{
    // let val = e.target.value
    setHitting('')
    setHitting(e.target.value)
}
return (
    <div className='pitcher_form_container'>
        {<form>
            <div>
            <label>Hiting</label>
            <input 
            type='Integer'
            value={hitting}
            // onMouseEnter={hitFunc}
            onChange={hitFunc} />
            </div>
            <div>
            <label>Power</label>
            <input 
            type='Integer'
            value={!evaluations ? power : evaluations.power}
            onChange={(e)=>setPower(e.target.value)} />
            </div>
            <div>
            <label>Running Speed</label>
            <input 
            type='Integer'
            value={!evaluations ? running : evaluations.running_speed }
            onChange={(e)=>setRunning(e.target.value)} />
            </div>
            <div>
            <label>Base Running</label>
            <input 
            type='Integer'
            value={!evaluations ? baseRunning : evaluations.baserunning }
            onChange={(e)=>setBaseRunning(e.target.value)} />
            </div>
            <div>
            <label>Arm Strength</label>
            <input 
            type='Integer'
            value={!evaluations ? armStr : evaluations.arm_str }
            onChange={(e)=>setArmStr(e.target.value)} />
            </div>
            <div>
            <label>Arm Accuracy</label>
            <input 
            type='Integer'
            value={!evaluations ? armAcc : evaluations.arm_acc }
            onChange={(e)=>setArmAcc(e.target.value)} />
            </div>
            <div>
            <label>Fielding</label>
            <input 
            type='Integer'
            value={!evaluations ? fielding : evaluations.fielding}
            onChange={(e)=>setFielding(e.target.value)} />
            </div>
            <div>
            <label>Arm Range</label>
            <input 
            type='Integer'
            value={!evaluations ? armRange : evaluations.arm_acc }
            onChange={(e)=>setArmRange(e.target.value)} />
            </div>
            <div>
            <label>Baseball Instinct</label>
            <input 
            type='Integer'
            value={!evaluations ? instinct : evaluations.baseball_instinct }
            onChange={(e)=>setInstinct(e.target.value)} />
            </div>
            <div>
            <label>Aggresiveness</label>
            <input 
            type='Integer'
            value={!evaluations ? aggressive : evaluations.aggresiveness }
            onChange={(e)=>setAggressive(e.target.value)} />
            </div>
            <div>
            <label>Pull</label>
            <input 
            type='text'
            value={!evaluations ? pull : evaluations.pull }
            onChange={(e)=>setPull(e.target.value)}
            placeholder='Pull'
            />
            </div>
            <div>
            <label>Strength Away</label>
            <input 
            type='text'
            value={!evaluations ? away: evaluations.str_away}
            onChange={(e)=>setAway(e.target.value)}
            placeholder='Str Away'
            />
            </div>
            <div>
            <label>Opposite Field</label>
            <input 
            type='text'
            value={!evaluations ? opp: evaluations.opp_field}
            onChange={(e)=>setOpp(e.target.value)}
            placeholder='Opp Field'
            />
            </div>
            <button onClick={submitEval}>Submit</button>
        </form>
}
    </div>
)}

export default NonPitcherForm;