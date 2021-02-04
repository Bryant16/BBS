import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getNonePitcherForm} from '../../store/nonPitcher';

const NonPitcherForm = ({playerId})=>{
const history = useHistory();
const dispatch = useDispatch();
const {nonPitcher} = useSelector(state=> state.nonPitcher);
const [loaded, setLoaded] = useState(nonPitcher);
const [hitting, setHitting] = useState("" || nonPitcher.hitting_ability);
const [power, setPower] = useState(''||nonPitcher.power);
const [running, setRunning] = useState(''||nonPitcher.running_speed);
const [baseRunning, setBaseRunning] = useState(''||nonPitcher.baserunning);
const [armStr, setArmStr] = useState(''||nonPitcher.arm_str);
const [armAcc, setArmAcc] = useState(''||nonPitcher.arm_acc);
const [fielding, setFielding] = useState(''||nonPitcher.fielding);
const [armRange, setArmRange] = useState(''||nonPitcher.arm_range);
const [instinct, setInstinct] = useState(''||nonPitcher.baseball_instinct);
const [aggressive, setAggressive] = useState(''||nonPitcher.aggresiveness);
const [pull, setPull] = useState(''||nonPitcher.pull);
const [away, setAway] = useState(''||nonPitcher.str_away);
const [opp, setOpp] = useState(''||nonPitcher.opp_field);


useEffect(()=>{
    dispatch(getNonePitcherForm(playerId))
    console.log(loaded)
    // setLoaded(true)
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
console.log(nonPitcher.length)
return (
    <div className='pitcher_form_container'>
        {nonPitcher ? (<form>
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
            value={ power}
            onChange={(e)=>setPower(e.target.value)} />
            </div>
            <div>
            <label>Running Speed</label>
            <input 
            type='Integer'
            value={running }
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
            value={armStr }
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
            value={armRange }
            onChange={(e)=>setArmRange(e.target.value)} />
            </div>
            <div>
            <label>Baseball Instinct</label>
            <input 
            type='Integer'
            value={instinct }
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
        ):<h1>loading</h1>
}
    </div>
)}

export default NonPitcherForm;