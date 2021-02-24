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
} from "react-icons/fa";

const EvalContainer = ({evals})=>{
    return (
        <div>
            {(evals && evals.fast_ball) ? (
                <div className='pdf_eval_pitcher'>
                    <div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>FASTBALL</p></div>
                        <div><p>{evals.fast_ball}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>CURVE</p></div>
                        <div><p>{evals.fast_ball}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>SLIDER</p></div>
                        <div><p>{evals.slider}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>KNUCKLE BALL</p></div>
                        <div><p>{evals.knuckle_ball}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>OTHER</p></div>
                        <div><p>{evals.other}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category_text'>
                        <div><p id='category_title'>ARM ACTION</p></div>
                        <div><p>{evals.arm_action}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category_text'>
                        <div><p id='category_title'>DELIVERY</p></div>
                        <div><p>{evals.delivery}</p></div>
                    </div>
                    </div>
                    <div style={{marginLeft:'1em'}}>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>CHANGE OF PACE</p></div>
                        <div><p>{evals.change_of_pace}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>CONTROL</p></div>
                        <div><p>{evals.control}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>POSIE</p></div>
                        <div><p>{evals.poise}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>BASEBALL INSTINCT</p></div>
                        <div><p>{evals.baseball_instinct}</p></div>
                    </div>
                    <div  className='pdf_pitcher_category'>
                        <div><p id='category_title'>AGGRESIVENESS</p></div>
                        <div><p>{evals.aggresiveness}</p></div>
                    </div>
                   
                    </div>
                <div>
            </div>
            </div>
            ):
            (evals &&(
            <div className='pdf_eval_nonpitcher'>
                <div>
                    <div  className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>ARM ACCURACY:</p></div>
                        <div><p>{evals.arm_acc}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category'>
                    <div><p id='category_title'>ARM RANGE</p></div>
                    <div><p>{evals.arm_range}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>ARM STRENGTH</p></div>
                        <div><p>{evals.arm_str}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>AGGRESIVENESS</p></div>
                        <div><p>{evals.aggresiveness}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>BASEBALL INSTINCT</p></div>
                        <div><p>{evals.baseball_instinct}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category_text'>
                        <div><p id='category_title'>PULL</p></div>
                        <div><p id='text_bar'>{evals.pull}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category_text'>
                        <div><p id='category_title'>OPPOSITE FIELD</p></div>
                        <div><p id='text_bar'>{evals.opp_field}</p></div>
                    </div>
                    <div className='pdf_nonpitcher_category_text'>
                        <div><p id='category_title'>STRENGTH AWAY</p></div>
                        <div><p id='text_bar'>{evals.str_away}</p></div>
                    </div>
                </div>
                <div style={{marginLeft:'1em'}}>
                <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>BASE RUNNING</p></div>
                        <div><p>{evals.baserunning}</p></div>
                    </div>
                <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>RUNNING SPEED</p></div>
                        <div><p>{evals.running_speed}</p></div>
                    </div>
                <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>FIELDING</p></div>
                        <div><p>{evals.fielding}</p></div>
                    </div>
                <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>HITTING ABILITY</p></div>
                        <div><p>{evals.hitting_ability}</p></div>
                    </div>
                <div className='pdf_nonpitcher_category'>
                        <div><p id='category_title'>POWER</p></div>
                        <div><p>{evals.power}</p></div>
                    </div>
                    
                </div>
            </div>
            ))}
        </div>
    )
}
class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div className='print_container'>
        <div className="pdf_container">
          {this.props.url && (
            <Image boxSize="245px" objectFit="cover" src={this.props.url} />
          )}
          <Card style={{ minWidth: "23em", height: "15.5em", padding: ".5em" }}>
            <CardContent style={{ padding: 0 }}>
              <Typography
                style={{ fontSize: "2rem" }}
                color="textSecondary"
                gutterBottom
              >
                {this.props.name.first_name} {this.props.name.last_name}
              </Typography>
              <Typography variant="h5" component="h2">
                {this.props.name.position} {this.props.name.height},{" "}
                {this.props.name.weight} lbs
              </Typography>
              <Typography style={{ marginBottom: 2 }} color="textSecondary">
                Throws: {this.props.name.throws} / Bats: {this.props.name.bats}
              </Typography>
              <Typography variant="body2" component="p">
                <FaAddressCard /> {this.props.name.address}
                <br />
                <FaMailchimp /> {this.props.name.email}
                <br />
                <FaBirthdayCake /> {this.props.name.dob}
                <br />
                <FaBaseballBall /> {this.props.name.team_name}{" "}
                {this.props.name.team_city}, {this.props.name.team_state}
              </Typography>
            </CardContent>
          </Card>
        </div>
              <EvalContainer evals={this.props.evals}/>
            {this.props.media.length && <h2 style={{textAlign:'left',textDecoration:'underline'}}>Media Links</h2>}
        <div className="pdf_media_links_container">
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
        evals={pdf.evals}
        url={pdf.url}
        media={pdf.media}
        ref={componentRef}
      />
    </div>
  );
};

export default Example;
