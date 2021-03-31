import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import {FaAddressCard,FaMailchimp, FaBirthdayCake, FaBaseballBall,FaRegEnvelope} from 'react-icons/fa';
import {infoPDF} from '../../store/player';

const useStyles = makeStyles({
  root: {
    minWidth: '32em',
    height: '25em',
    padding: '0',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '3rem',
    margin:0
  },
  pos: {
    marginBottom: 1,
  },
});

export default function SimpleCard({playerid, players, evals, notes, media, url}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let singlePlayer= players[playerid]
  const [loader, setLoader] = useState(false)
  const goToEvaluation = (e)=>{
    e.preventDefault();
    history.push(`/players/${playerid}/evaluation`)
  }
  const share=(e)=>{
    e.preventDefault();
    const pdfPlayer = {
      singlePlayer,
      notes,
      media,
      evals,
      url
    }
    dispatch(infoPDF(pdfPlayer))
    history.push('/share')
  }
  function calculateAge(birthday) { // birthday is a date
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  let birthdate = new Date(singlePlayer.dob)
  let catcherFormating = (p)=>{
    if(p.includes('Catcher')){
      return p.replace('atcher','')
    }else{
      return p
    }
  }
  return (
    <Card id='card_info_container' className={classes.root}>
      
      <CardContent style={{'padding':0}}>
        <Typography className={classes.title}  gutterBottom>
   
          {singlePlayer.first_name} {singlePlayer.last_name}
        </Typography>
        <Typography variant="h5" component="h2" >
        Age: {calculateAge(birthdate)||null} Height: {singlePlayer.height} Weight: {singlePlayer.weight} lbs  
        </Typography>
        <Typography className={classes.pos} variant='h5' style={{marginTop:'.5em'}}>
         {catcherFormating(singlePlayer.position)} / Bats: {singlePlayer.bats} / Throws: {singlePlayer.throws}
        </Typography>
        <Typography variant="body1" component="p" style={{'marginTop':'.5em','fontSize':'1.5em'}}>
        <FaAddressCard /> {singlePlayer.address}
        <br/>
        <FaRegEnvelope /> {singlePlayer.email}
          <br />
         <FaBirthdayCake /> {singlePlayer.dob}
          <br/>
          <FaBaseballBall /> {singlePlayer.team_name} {singlePlayer.team_city}, {singlePlayer.team_state}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={goToEvaluation} id="edit_player_button" variant="outlined" size="large" style={{width:'8em'}}>Evaluation</Button>
        <Modal playerid={playerid}/>
        <Button type="button" size='large' variant="outlined" onClick={share} style={{width:'8em'}}>Share</Button>
      </CardActions>
    </Card>
  );
}