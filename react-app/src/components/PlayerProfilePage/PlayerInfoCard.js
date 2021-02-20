import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import {FaAddressCard,FaMailchimp, FaBirthdayCake, FaBaseballBall} from 'react-icons/fa';
const useStyles = makeStyles({
  root: {
    minWidth: '23em',
    height: '15.5em',
    padding: '.5em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '2rem',
  },
  pos: {
    marginBottom: 2,
  },
});

export default function SimpleCard({playerid, players, evals, notes}) {
  const classes = useStyles();
  const history = useHistory();
  let singlePlayer= players[playerid]
  
  const goToEvaluation = (e)=>{
    e.preventDefault();
    history.push(`/players/${playerid}/evaluation`)
  }
  const share=(e)=>{
    e.preventDefault()
    console.log({
      singlePlayer,
      evals,
      notes
    })
  }
  return (
    <Card className={classes.root}>
      <CardContent style={{'padding':0}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {singlePlayer.first_name} {singlePlayer.last_name}
        </Typography>
        <Typography variant="h5" component="h2">
        {singlePlayer.position} {singlePlayer.height}, {singlePlayer.weight} lbs   
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Throws: {singlePlayer.throws} / Bats: {singlePlayer.bats}
        </Typography>
        <Typography variant="body2" component="p">
        <FaAddressCard /> {singlePlayer.address}
        <br/>
        <FaMailchimp /> {singlePlayer.email}
          <br />
         <FaBirthdayCake /> {singlePlayer.dob}
          <br/>
          <FaBaseballBall /> {singlePlayer.team_name} {singlePlayer.team_city}, {singlePlayer.team_state}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={goToEvaluation} id="edit_player_button" variant="outlined" size="small">Evaluation</Button>
        <Modal playerid={playerid}/>
        <Button type="button" size='small' variant="outlined" onClick={share}>Share</Button>
      </CardActions>
    </Card>
  );
}