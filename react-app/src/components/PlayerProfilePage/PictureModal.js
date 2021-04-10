import React from 'react';
import {Image} from "@chakra-ui/react";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modal.css';


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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({content, playerid, setVideos, image}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteContent = async(e, id)=>{
    e.preventDefault();
    if(window.confirm('Delete this item?')){
    const res = await fetch('/api/media/videos', {
        headers: {'Content-type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({id})
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
              <Image width='25em' height='30em' objectFit="scale-down" src={content} ></Image>
            <button className='delete_button_pic_video' onClick={e=>deleteContent(e, image.id)}>Delete</button>
    </div>
    </div>
  );

  return (
    <div>
    <Link onClick={handleOpen}><Image width='20em' height='22em'  objectFit="cover" src={content} ></Image> </Link>
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