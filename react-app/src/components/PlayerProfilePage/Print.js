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
            <p>FastBall: {evals.fast_ball}</p>
            <p>Curve: {evals.curve}</p>
            <p>Slider: {evals.slider}</p>
            <p>Knuckle Ball: {evals.knuckle_ball}</p>
            <p>Other: {evals.other}</p>
            <p>Arm Action: {evals.arm_action}</p>
            </div>
            <div style={{marginLeft:'1em'}}>
            <p>Change of Pace: {evals.change_of_pace}</p>
            <p>Control: {evals.control}</p>
            <p>Poise: {evals.poise}</p>
            <p>Baseball Instinct: {evals.baseball_instinct}</p>
            <p>Aggresiveness: {evals.aggresiveness}</p>
            <p>Delivery: {evals.delivery}</p>
                
            </div>
            </div>
            ):
            (evals &&(<div className='pdf_eval_pitcher'>
            <div>
                <p>Arm Accuracy: {evals.arm_acc}</p>
                <p>Arm Range: {evals.arm_range}</p>
                <p>Arm Strength: {evals.arm_str}</p>
                <p>Aggresiveness:  {evals.aggresiveness}</p>
                <p>Baseball Instinct: {evals.baseball_instinct}</p>
                <p>Opposite Field: {evals.opp_field}</p>
                </div>
                <div style={{marginLeft:'1em'}}>
                <p>Base Running: {evals.baserunning}</p>
                <p>Running Speed: {evals.running_speed}</p>
                <p>Fielding: {evals.fielding}</p>
                <p>Hitting Ability: {evals.hitting_ability}</p>
                <p>Power: {evals.power}</p>
                <p>Pull: {evals.pull}</p>
                <p>Strength Away: {evals.str_away}</p>
            </div>
            </div>))}
        </div>
    )
}
class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div>
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
        <div className="pdf_media_links_container">
          <ul>
            {this.props.media.map((link) => (
              <a href={link.content}>
                <li>{link.content}</li>
              </a>
            ))}
          </ul>
        </div>
        <EvalContainer evals={this.props.evals}/>
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
