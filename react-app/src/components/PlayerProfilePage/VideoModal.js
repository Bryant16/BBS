import React from 'react';
import {Image} from "@chakra-ui/react";
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import NewPlayerForm from '../NewPlayerForm';
import ReactPlayer from 'react-player';
import './Modal.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
    width: '30em',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function VideoModal({url, setVideos, playerid}) {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteContent = async(e, content)=>{
    e.preventDefault();
       if(window.confirm('Delete this item?')){
        const res = await fetch('/api/media/videos', {
            headers: {'Content-type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify(content)
        })
        if(res.ok){
            const {removed} = await res.json();
            if(removed){
                const getVideos=async()=>{
                    let res = await fetch(`/api/media/videos/${playerid}`)
                    if(res.ok){
                        let videos = await res.json();
                        setVideos(videos.videos)
                    }
                }
                getVideos()
                handleClose()
            }
        }
    }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <h2 id="simple-modal-title">Edit Player</h2> */}
      <div className='picture_modal_container'>
      <ReactPlayer className='react-player'  width='25em' height='40em' style={{'margin':'',"box-shadow":'5px 5px 15px 5px #B5B5B5', 'border-bottom':'1px solid black'}} controls url={url} />
            <button onClick={e=>deleteContent(e, url)}>delete</button>
    </div>
    </div>
  );

  return (
    <div>
    <Link onClick={handleOpen}><ReactPlayer className='react-player'  width='13em' height='15em' style={{'margin':'',"box-shadow":'5px 5px 15px 5px #B5B5B5', 'border-bottom':'1px solid black'}} controls url={url} /></Link>
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