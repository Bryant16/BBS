import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const PitcherForm = ({playerId})=>{
    const history = useHistory();
    const [fastball, setFastball] = useState('');
    const [curve, setCurve] = useState('');
    const [control, setControl] = useState('');
    const [pace, setPace] = useState('');
    const [slider, setSlider] = useState('');
    const [knuckle, setKnuckle] = useState('');
    const [other, setOther] = useState('');
    const [poise, setPoise] = useState('');
    const [instinct, setInstinct] = useState('');
    const [aggressive, setAggressive] = useState('');
    const [arm, setArm] = useState('');
    const [delivery, setDelivery] = useState('');

    const submitEval = async(e)=>{
        e.preventDefault();
        const new_pitcher_eval= {
            fastball,
            curve,
            control,
            pace,
            slider,
            knuckle,
            other,
            poise,
            instinct,
            aggressive,
            arm,
            delivery
        }
        const response = await fetch(`/api/players/${playerId}/pitcher/`,{
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(new_pitcher_eval)
        })
        if(response.ok){
            const json = await response.json();
            history.push(`/players/${playerId}`)
        }else{
            alert('Error Player Could not be created')
        }
    }
    return (
        <div className='pitcher_form_container'>
            <form>
                <div>
                <label>Fastball</label>
                <input 
                type='Integer'
                value={fastball}
                onChange={(e)=>setFastball(e.target.value)} />
                </div>
                <div>
                <label>Curve</label>
                <input 
                type='Integer'
                value={curve}
                onChange={(e)=>setCurve(e.target.value)} />
                </div>
                <div>
                <label>Control</label>
                <input 
                type='Integer'
                value={control}
                onChange={(e)=>setControl(e.target.value)} />
                </div>
                <div>
                <label>Change of Pace</label>
                <input 
                type='Integer'
                value={pace}
                onChange={(e)=>setPace(e.target.value)} />
                </div>
                <div>
                <label>Slider</label>
                <input 
                type='Integer'
                value={slider}
                onChange={(e)=>setSlider(e.target.value)} />
                </div>
                <div>
                <label>Knuckle Ball</label>
                <input 
                type='Integer'
                value={knuckle}
                onChange={(e)=>setKnuckle(e.target.value)} />
                </div>
                <div>
                <label>Other</label>
                <input 
                type='Integer'
                value={other}
                onChange={(e)=>setOther(e.target.value)} />
                </div>
                <div>
                <label>Poise</label>
                <input 
                type='Integer'
                value={poise}
                onChange={(e)=>setPoise(e.target.value)} />
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
                <label>Arm Action</label>
                <input 
                type='text'
                value={arm}
                onChange={(e)=>setArm(e.target.value)}
                placeholder='arm action'
                />
                </div>
                <div>
                <label>Delivery</label>
                <input 
                type='text'
                value={delivery}
                onChange={(e)=>setDelivery(e.target.value)}
                placeholder='delivery'
                />
                </div>
                <button onClick={submitEval}>Submit</button>
            </form>
        </div>
    )}

export default PitcherForm;