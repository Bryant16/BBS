import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { Image } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  FaAddressCard,
  FaMailchimp,
  FaBirthdayCake,
  FaBaseballBall,
  FaRegEnvelope
} from "react-icons/fa";

const EvalContainer = ({ pitcherEvals, nonPitcherEvals}) => {
  return (
    <div className='evalContainer'>
      {pitcherEvals && pitcherEvals.fast_ball ? (
        <>
        <div className="pdf_eval_pitcher">
        <h3 style={{textDecoration:'underline'}}>Pitcher</h3>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">FASTBALL</p>
              </div>
              <div>
                <p>{pitcherEvals.fast_ball}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">CURVE</p>
              </div>
              <div>
                <p>{pitcherEvals.fast_ball}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">SLIDER</p>
              </div>
              <div>
                <p>{pitcherEvals.slider}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">KNUCKLE BALL</p>
              </div>
              <div>
                <p>{pitcherEvals.knuckle_ball}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">OTHER</p>
              </div>
              <div>
                <p>{pitcherEvals.other}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">CHANGE OF PACE</p>
              </div>
              <div>
                <p>{pitcherEvals.change_of_pace}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">CONTROL</p>
              </div>
              <div>
                <p>{pitcherEvals.control}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">POSIE</p>
              </div>
              <div>
                <p>{pitcherEvals.poise}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">BASEBALL INSTINCT</p>
              </div>
              <div>
                <p>{pitcherEvals.baseball_instinct}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">AGGRESIVENESS</p>
              </div>
              <div>
                <p>{pitcherEvals.aggresiveness}</p>
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">DELIVERY</p>
                <p >{pitcherEvals.delivery}</p>
              </div>
              <div id="text_bar">
                
              </div>
            </div>
            <div className="pdf_pitcher_category">
              <div>
                <p id="category_title">ARM ACTION</p>
                <p >{pitcherEvals.arm_action}</p>
              </div>
              <div id="text_bar">
              </div>
          </div>
          </div>
        <div className="pdf_eval_nonpitcher">
        <h3 style={{textDecoration:'underline'}}>Non Pitcher</h3>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM ACCURACY</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_acc}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM RANGE</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_range}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM STRENGTH</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_str}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">AGGRESIVENESS</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.aggresiveness}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">BASEBALL INSTINCT</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.baseball_instinct}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">BASE RUNNING</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.baserunning}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">RUNNING SPEED</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.running_speed}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">FIELDING</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.fielding}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">HITTING ABILITY</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.hitting_ability}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">POWER</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.power}</p>
                </div>
                </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">PULL</p>
                  <p id="text_bar">{nonPitcherEvals.pull}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">OPPOSITE FIELD</p>
                  <p id="text_bar">{nonPitcherEvals.opp_field}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">STRENGTH AWAY</p>
                  <p id="text_bar">{nonPitcherEvals.str_away}</p>
                </div>
            </div>    
        </div>
        </>
      ) : (
        nonPitcherEvals && (
          <div className="pdf_eval_nonpitcher">
            <h3 style={{textDecoration:'underline'}}>Non Pitcher</h3>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM ACCURACY</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_acc}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM RANGE</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_range}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">ARM STRENGTH</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.arm_str}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">AGGRESIVENESS</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.aggresiveness}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">BASEBALL INSTINCT</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.baseball_instinct}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">BASE RUNNING</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.baserunning}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">RUNNING SPEED</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.running_speed}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">FIELDING</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.fielding}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">HITTING ABILITY</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.hitting_ability}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">POWER</p>
                </div>
                <div>
                  <p>{nonPitcherEvals.power}</p>
                </div>
                </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">PULL</p>
                  <p id="text_bar">{nonPitcherEvals.pull}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">OPPOSITE FIELD</p>
                  <p id="text_bar">{nonPitcherEvals.opp_field}</p>
                </div>
              </div>
              <div className="pdf_nonpitcher_category">
                <div>
                  <p id="category_title">STRENGTH AWAY</p>
                  <p id="text_bar" >{nonPitcherEvals.str_away}</p>
                </div>
            </div>
            </div>
        )
      )}
    </div>
  );
};
class ComponentToPrint extends React.PureComponent {
  render() {
    
    let catcherFormating = (p)=>{
      if(p.includes('Catcher')){
        return p.replace('atcher','')
      }else{
        return p
      }
    }
    return (
      <div className="print_container">
        <div className="pdf_container">
          {this.props.url && (
            <Image boxSize="245px" objectFit="scale-down" src={this.props.url} />
          )}
          <Card style={{ minWidth: "23em", height: "15.5em", padding: ".5em" }}>
            <CardContent style={{ padding: 0 }}>
              <Typography
                style={{ fontSize: "2rem" }}
                variant="h3"
                gutterBottom
              >
                {this.props.name.first_name} {this.props.name.last_name}
              </Typography>
              <Typography variant="h5" component="h2">
                {catcherFormating(this.props.name.position)} {this.props.name.height},{" "}
                {this.props.name.weight} lbs
              </Typography>
              <Typography style={{ marginBottom: 2 }} color="textSecondary">
                Throws: {this.props.name.throws} / Bats: {this.props.name.bats}
              </Typography>
              <Typography variant="body2" component="p">
                <FaAddressCard /> {this.props.name.address}
                <br />
                <FaRegEnvelope /> {this.props.name.email}
                <br />
                <FaBirthdayCake /> {this.props.name.dob}
                <br />
                <FaBaseballBall /> {this.props.name.team_name}{" "}
                {this.props.name.team_city}, {this.props.name.team_state}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className='eval_and_links_pdf'>
        <EvalContainer nonPitcherEvals={this.props.nonPitcherEvals}  pitcherEvals={this.props.pitcherEvals}/>
        <div style={{marginTop:'2em',marginLeft:'2em'}}>
        <h3 style={{textDecoration:'underline'}}>Word Descriptions</h3>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Habits</h7>
          <p >{this.props.notes['habits']}</p>
          </div>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Dedication</h7>
          <p >{this.props.notes['dedication']}</p>
          </div>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Agility</h7>
          <p >{this.props.notes['agility']}</p>
          </div>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Apitude</h7>
          <p >{this.props.notes['apitude']}</p>
          </div>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Phys. Maturity</h7>
          <p >{this.props.notes['pMaturity']}</p>
          </div>
          <div style={{display:'flex'}}>
          <h7 style={{marginRight:'.5em'}}id='category_title'>Emot. Maturity</h7>
          <p >{this.props.notes['eMaturity']}</p>
          </div>
        </div>
        </div>
        <div className='pdf_notes_container'>
          <div className='category_container_notes'>
          <div>
          <h4>Abilities</h4>
          <p style={{width:'12em'}}>{this.props.notes['Abilities']}</p>
          </div>
          <div>
          <h4>Weakness</h4>
          <p style={{width:'12em'}}>{this.props.notes['Weakness']}</p>
          </div>
          </div>
          <div  className='category_container_notes'>
          <div>
          <h4>Summary</h4>
          <p style={{width:'12em'}}>{this.props.notes['Summary']}</p>
          </div>
          <div>
          <h4>Physical Description</h4>
          <p style={{width:'12em'}}>{this.props.notes['Physical Description']}</p>
          </div>
          </div>
        </div>
        <div className="pdf_media_links_container">
        {(this.props.media.length > 0) && 
          <h2 style={{ textAlign: "left",marginTop:'.5em', textDecoration: "underline" }}>
            Media Links
          </h2>
        }
          <ul>
            {this.props.media.map((link) => (
              <a href={link.content}>
                <li>{link.content}</li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const Example = ({ load }) => {
  const componentRef = useRef();
  const history = useHistory();
  const { players } = useSelector((state) => state.players);
  const pdf = load.players.PDF;
  const back = (e) => {
    e.preventDefault();
    history.push(`/players/${pdf.singlePlayer.id}`);
  };
  return (
    <div>
      <div className="pdf_container_buttons">
        <ReactToPrint
          trigger={() => {
            return (
              <Button type="button" size="small" variant="outlined">
                Create PDF
              </Button>
            );
          }}
          content={() => componentRef.current}
        />
        <Button
          type="button"
          size="small"
          variant="contained"
          color="primary"
          onClick={back}
        >
          Back
        </Button>
      </div>
      <ComponentToPrint
        name={"" || pdf.singlePlayer}
        pitcherEvals={pdf.pitcherEvals}
        nonPitcherEvals={pdf.nonPitcherEvals}
        url={pdf.url}
        media={pdf.media}
        notes={pdf.notes}
        ref={componentRef}
      />
    </div>
  );
};

export default Example;
