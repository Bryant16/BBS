import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPitcherForm } from "../../store/Pitcher";
import EvalButtons from "../NonPitcherForm/ButtonsForEval";
import "./PitcherForm.css";

const PitcherForm = ({ playerId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pitcher = useSelector((state) => state.pitcher);
  const [priorEval, setPriorEval] = useState(false);
  const [fastball, setFastball] = useState(0);
  const [curve, setCurve] = useState(0);
  const [control, setControl] = useState(0);
  const [pace, setPace] = useState(0);
  const [slider, setSlider] = useState(0);
  const [knuckle, setKnuckle] = useState(0);
  const [other, setOther] = useState(0);
  const [poise, setPoise] = useState(0);
  const [instinct, setInstinct] = useState(0);
  const [aggressive, setAggressive] = useState(0);
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
  }, []);

  const submitEval = async (e) => {
    e.preventDefault();
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
        const json = await response.json();
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
      {pitcher ? (
        <form>
          <div className="category_pitcher_container">
            <Categories title={"Fastball"} value={fastball} set={setFastball} submitEv={submitEval}/>
            <Categories title={"Curve"} value={curve} set={setCurve} submitEv={submitEval}/>
            <Categories title={"Control"} value={control} set={setControl} submitEv={submitEval}/>
            <Categories title={"Change of Pace"} value={pace} set={setPace} submitEv={submitEval}/>
            <Categories title={"Slider"} value={slider} set={setSlider} submitEv={submitEval}/>
            <Categories
              title={"Knuckle Ball"}
              value={knuckle}
              set={setKnuckle}
              submitEv={submitEval}
            />
            <Categories title={"Other"} value={other} set={setOther} submitEv={submitEval}/>
            <Categories title={"Poise"} value={poise} set={setPoise} submitEv={submitEval}/>
            <Categories title={"Instinct"} value={instinct} set={setInstinct} submitEv={submitEval}/>
            <Categories
              title={"Aggresiveness"}
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
              placeholder={"Arm Action"}
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
                placeholder={"Delivery"}
              />
            </div>
          </div>
          <button onClick={submitEval}>Submit</button>
        </form>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default PitcherForm;
