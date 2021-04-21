import React, {useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import NewPlayerForm from '../NewPlayerForm';
import { useHistory } from 'react-router-dom';
import { firstTime } from '../../store/session';
import helper from './baseballHelper.png';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({firstTimes}) {
  const { user } = useSelector((state) => state.session);
const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState( false);

  const handleOpen = () => {
   setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNeverAgain = async() => {
    setOpen(false);
    const res = await fetch(`/api/users/stopHelper/${user.id}`)
    if(res.ok){
      const user = await res.json()
    }
  };

  const helpPage = (e)=>{
      e.preventDefault()
      history.push('/help')
  }
  useEffect(()=>{
      if(firstTimes === 1 && !user.help) handleOpen()
      dispatch(firstTime())
  },[])
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{'textAlign':'center'}}>Need Help?</h2>
      <img src={helper} style={{'marginLeft':'3em','marginBottom':'1em'}} />
      <div className='new_player_modal_container'>
      <Button type="button" size='small' variant="outlined" onClick={helpPage}>
        YES PLEASE!
      </Button>
      <Button type="button" size='small' variant="outlined" onClick={handleClose}>
        NO THANKS!
      </Button>
      <Button type="button" size='small' variant="outlined" onClick={handleNeverAgain}>
        PLEASE STOP!
      </Button>
    </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}