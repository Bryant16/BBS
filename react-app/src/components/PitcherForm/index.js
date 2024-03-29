import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPitcherForm } from "../../store/Pitcher";
import EvalButtons from "../NonPitcherForm/ButtonsForEval";
import "./PitcherForm.css";

const PitcherForm = ({ playerId }) => {
  const dispatch = useDispatch();
  const pitcher = useSelector((state) => state.pitcher);
  const [priorEval, setPriorEval] = useState(false);
  const [fastball, setFastball] = useState(20);
  const [curve, setCurve] = useState(20);
  const [control, setControl] = useState(20);
  const [pace, setPace] = useState(20);
  const [slider, setSlider] = useState(20);
  const [knuckle, setKnuckle] = useState(20);
  const [other, setOther] = useState(20);
  const [poise, setPoise] = useState(20);
  const [instinct, setInstinct] = useState(20);
  const [aggressive, setAggressive] = useState(20);
  const [arm, setArm] = useState("");
  const [delivery, setDelivery] = useState("");

  useEffect(() => {
    dispatch(getPitcherForm(playerId));
    try {
      if (pitcher[0]) {
        setFastball(pitcher[0].fast_ball);
        setCurve(pitcher[0].curve);
        setControl(pitcher[0].control);
        setPace(pitcher[0].change_of_pace);
        setSlider(pitcher[0].slider);
        setKnuckle(pitcher[0].knuckle_ball);
        setOther(pitcher[0].other);
        setPoise(pitcher[0].poise);
        setInstinct(pitcher[0].baseball_instinct);
        setAggressive(pitcher[0].aggresiveness);
        setArm(pitcher[0].arm_action);
        setDelivery(pitcher[0].delivery);
        setPriorEval(true);
      }
    } catch (e) {}
    
  }, [dispatch]);

  const submitEval = async () => {
    // e.preventDefault();
    const new_pitcher_eval = {
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
      delivery,
    };
    if (!priorEval) {
      dispatch(getPitcherForm(playerId));
      setPriorEval(true);
      const response = await fetch(`/api/players/${playerId}/pitcher/`, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(new_pitcher_eval),
      });
      if (response.ok) {
        // const json = await response.json();
        // history.push(`/players/${playerId}`);
      } else {
        alert("Error Player Could not be created");
      }
    } else {
      const res = await fetch(`/api/players/${playerId}/pitcher/`, {
        headers: { "Content-type": "application/json" },
        method: "PUT",
        body: JSON.stringify(new_pitcher_eval),
      });
      if (res.ok) {
        dispatch(getPitcherForm(playerId));
        // history.push(`/players/${playerId}`);
      }
    }
  };

  useEffect(()=>{
        submitEval()
},[fastball,
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
  delivery]);
 

  const Categories = ({ title, value, set, submitEv }) => {
    return (
      <div>
        <div>
          <label>{title}</label>
        </div>
        <div>
          {value}
          <EvalButtons setType={set} type={value} submitEv={submitEv}/>
        </div>
      </div>
    );
  };

  

  return (
    <div className="pitcher_form_container">
       <h1 id='title_for_forms'>Pitcher</h1>
      {pitcher ? (
        <form>
         
          <div className="category_pitcher_container">
            <Categories title={"FASTBALL"} value={fastball} set={setFastball} submitEv={submitEval}/>
            <Categories title={"CURVE"} value={curve} set={setCurve} submitEv={submitEval}/>
            <Categories title={"CONTROL"} value={control} set={setControl} submitEv={submitEval}/>
            <Categories title={"CHANGE OF PACE"} value={pace} set={setPace} submitEv={submitEval}/>
            <Categories title={"SLIDER"} value={slider} set={setSlider} submitEv={submitEval}/>
            <Categories
              title={"KNUCKLE BALL"}
              value={knuckle}
              set={setKnuckle}
              submitEv={submitEval}
            />
            <Categories title={"OTHER"} value={other} set={setOther} submitEv={submitEval}/>
            <Categories title={"POISE"} value={poise} set={setPoise} submitEv={submitEval}/>
            <Categories title={"INSTINCT"} value={instinct} set={setInstinct} submitEv={submitEval}/>
            <Categories
              title={"AGGRESSIVENESS"}
              value={aggressive}
              set={setAggressive}
              submitEv={submitEval}
            />
          </div>
          <div>
            <input
              className='text_input_pitcher'
              type="text"
              value={arm}
              onChange={(e) =>{
                setArm(e.target.value)
                submitEval(e)
              }} 
              placeholder={"ARM ACTION"}
            />
            <div>
              <input
                type="text"
                className='text_input_pitcher'
                value={delivery}
                onChange={(e) =>{
                  setDelivery(e.target.value)
                  submitEval(e)
                }} 
                placeholder={"DELIVERY"}
              />
            </div>
          </div>
        </form>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default PitcherForm;
