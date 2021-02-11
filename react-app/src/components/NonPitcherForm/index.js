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
    console.log(fielding, 'fielding')
   if(!priorEval){
    dispatch(getNonePitcherForm(playerId))
    setPriorEval(true)
        const response = await fetch(`/api/players/${playerId}/nonpitcher/`,{
        headers: { 'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(new_non_pitcher_eval)
        });
        if(response.ok){
            const json = await response.json();
            // history.push(`/players/${playerId}`)
            }
    }else{
        const res = await fetch(`/api/players/${playerId}/nonpitcher/`,{
        headers:{'Content-type': 'application/json'},
        method: 'PUT',
        body:JSON.stringify(new_non_pitcher_eval)
       });
       if(res.ok){
        //    history.push(`/players/${playerId}`)
       }
   }
    
}

const Categories = ({ title, value, set, submitEv }) => {
    return (
      <div>
        <div>
          <label>{title}</label>
        </div>
        <div>
          {value}
          <EvalButtons setType={set} type={value} submitEv={submitEv} />
        </div>
      </div>
    );
  };
 
  
return (
    <div className='non_pitcher_form_container'>
        {nonPitcher ? (<form>
            <div className="category_pitcher_container">
               <Categories title={'Hitting'} value={hitting} set={setHitting} submitEv={submitEval} /> 
               <Categories title={'Power'} value={power} set={setPower} submitEv={submitEval} /> 
               <Categories title={'Running Speed'} value={running} set={setRunning} submitEv={submitEval}/> 
               <Categories title={'Base Running'} value={baseRunning} set={setBaseRunning} submitEv={submitEval} /> 
               <Categories title={'Arm Strength'} value={armStr} set={setArmStr} submitEv={submitEval}/> 
               <Categories title={'Arm Accuracy'} value={armAcc} set={setArmAcc} submitEv={submitEval}/> 
               <Categories title={'Fielding'} value={fielding} set={setFielding} submitEv={submitEval}/> 
               <Categories title={'Arm Range'} value={armRange} set={setArmRange} submitEv={submitEval}/> 
               <Categories title={'Baseball Instinct'} value={instinct} set={setInstinct} submitEv={submitEval}/> 
               <Categories title={'Aggresiveness'} value={aggressive} set={setAggressive} submitEv={submitEval}/> 
                <div>
                    <input 
                    className='text_input_pitcher'
                    type='text'
                    value={pull}
                    onChange={(e)=>{
                        setPull(e.target.value)
                        submitEval(e)
                        }}
                    placeholder='Pull'
                    />
                </div>
                <div>
                    
                    <input 
                    className='text_input_pitcher'
                    type='text'
                    value={away}
                    onChange={(e)=>{
                        setAway(e.target.value)
                        submitEval(e)
                    }}
                    placeholder='Str. Away'
                    />
                </div>
                <div>
                    <input 
                    className='text_input_pitcher'
                    type='text'
                    value={opp}
                    onChange={(e)=>{
                        setOpp(e.target.value)
                        submitEval(e)
                    }}
                    placeholder='Opp. Field'
                    />
                </div>
                <button onClick={submitEval}>Submit</button>
            </div>
        </form>
        ):<h1>loading</h1>
}
    </div>
)}

export default NonPitcherForm;