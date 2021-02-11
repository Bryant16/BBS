import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getNonePitcherForm} from '../../store/nonPitcher';
import './NonPitcherForm.css';
import EvalButtons from './ButtonsForEval';

const NonPitcherForm = ({playerId})=>{
const history = useHistory();
const dispatch = useDispatch();
const nonPitcher = useSelector(state=> state.nonPitcher);
const [loaded, setLoaded] = useState(nonPitcher);
const [priorEval, setPriorEval] = useState(false);
const [hitting, setHitting] = useState(0);
const [power, setPower] = useState(0);
const [running, setRunning] = useState(0);
const [baseRunning, setBaseRunning] = useState(0);
const [armStr, setArmStr] = useState(0);
const [armAcc, setArmAcc] = useState(0);
const [fielding, setFielding] = useState(0);
const [armRange, setArmRange] = useState(0);
const [instinct, setInstinct] = useState(0);
const [aggressive, setAggressive] = useState(0);
const [pull, setPull] = useState('');
const [away, setAway] = useState('');
const [opp, setOpp] = useState('');


useEffect(()=>{
    dispatch(getNonePitcherForm(playerId))
    try{
        if(nonPitcher[0]){
        setHitting(nonPitcher[0].hitting_ability)
        setPower(nonPitcher[0].power)
        setRunning(nonPitcher[0].running_speed)
        setBaseRunning(nonPitcher[0].baserunning)
        setArmStr(nonPitcher[0].arm_str)
        setArmAcc(nonPitcher[0].arm_acc)
        setFielding(nonPitcher[0].fielding)
        setArmRange(nonPitcher[0].arm_range)
        setInstinct(nonPitcher[0].baseball_instinct)
        setAggressive(nonPitcher[0].aggresiveness)
        setPull(nonPitcher[0].pull)
        setAway(nonPitcher[0].str_away)
        setOpp(nonPitcher[0].opp_field)
        setPriorEval(true)
    }}catch(e){
    }
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

   if(!priorEval){
        const response = await fetch(`/api/players/${playerId}/nonpitcher/`,{
        headers: { 'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(new_non_pitcher_eval)
        });
        if(response.ok){
            const json = await response.json();
            history.push(`/players/${playerId}`)
            }
    }else{
        const res = await fetch(`/api/players/${playerId}/nonpitcher/`,{
        headers:{'Content-type': 'application/json'},
        method: 'PUT',
        body:JSON.stringify(new_non_pitcher_eval)
       });
       if(res.ok){
           history.push(`/players/${playerId}`)
       }
   }
    
}

return (
    <div className='non_pitcher_form_container'>
        {nonPitcher ? (<form>
            <div>
            <label>Hiting</label>
            {hitting}
            <EvalButtons setType={setHitting} type={hitting} />
            </div>
            <div>
            <label>Power</label>
            { power}
            <EvalButtons setType={setPower} type={power} />
            </div>
            <div>
            <label>Running Speed</label>
            {running}
            <EvalButtons setType={setRunning} type={running} />
            </div>
            <div>
            <label>Base Running</label>
            {baseRunning}
            <EvalButtons setType={setBaseRunning} type={baseRunning} />
            </div>
            <div>
            <label>Arm Strength</label>
            {armStr}
            <EvalButtons setType={setArmStr} type={armStr} />
            </div>
            <div>
            <label>Arm Accuracy</label>
            {armAcc}
            <EvalButtons setType={setArmAcc} type={armAcc} />
            </div>
            <div>
            <label>Fielding</label>
            {fielding}
            <EvalButtons setType={setFielding} type={fielding} />
            </div>
            <div>
            <label>Arm Range</label>
            {armRange}
            <EvalButtons setType={setArmRange} type={armRange} />
            </div>
            <div>
            <label>Baseball Instinct</label>
            {instinct}
            <EvalButtons setType={setInstinct} type={instinct} />
            </div>
            <div>
            <label>Aggresiveness</label>
            {aggressive}
            <EvalButtons setType={setAggressive} type={aggressive} />
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