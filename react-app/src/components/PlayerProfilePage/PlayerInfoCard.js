import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import {FaAddressCard, FaBaseballBall} from 'react-icons/fa';
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    padding: '1em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({playerid,playerInfo}) {
  const classes = useStyles();
  const history = useHistory();
  const bull = <span className={classes.bullet}>•</span>;
  const goToEvaluation = (e)=>{
    e.preventDefault();
    history.push(`/players/${playerid}/evaluation`)
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {playerInfo.first_name} {playerInfo.last_name}
        </Typography>
        <Typography variant="h5" component="h2">
        {playerInfo.position}- {playerInfo.height}, {playerInfo.weight} lbs   
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Throws: {playerInfo.throws} / Bats: {playerInfo.bats}
        </Typography>
        <Typography variant="body2" component="p">
        <FaAddressCard /> {playerInfo.address}
          <br />
          <FaBaseballBall /> {playerInfo.team_name} {playerInfo.team_city}, {playerInfo.team_state}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={goToEvaluation} size="small">Evaluation</Button>
        {/* <Button onClick={editPlayerButton} size='small'>Edit Player</Button> */}
        <Modal playerid={playerid}/>
      </CardActions>
    </Card>
  );
}