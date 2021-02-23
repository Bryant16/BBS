import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import {Image} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
// import { ComponentToPrint } from './ComponentToPrint';
// import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import {useDispatch} from 'react-redux';
// import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Modal from './Modal';
import {FaAddressCard,FaMailchimp, FaBirthdayCake, FaBaseballBall} from 'react-icons/fa';
// import {infoPDF} from '../../store/player';



// export default function SimpleCard({playerid, players, evals, notes, media, url}) {
//   const classes = useStyles();
//   const history = useHistory();
//   const dispatch = useDispatch();
//   let singlePlayer= players[playerid]
//   const [loader, setLoader] = useState(false)
//   const goToEvaluation = (e)=>{
//     e.preventDefault();
//     history.push(`/players/${playerid}/evaluation`)
//   }
//   const share=(e)=>{
//     e.preventDefault();
//     const pdfPlayer = {
//       singlePlayer,
//       notes,
//       media,
//       evals,
//       url
//     }
//     dispatch(infoPDF(pdfPlayer))
//     history.push('/share')
//   }
//   return (
//     <Card className={classes.root}>
      
//       <CardContent style={{'padding':0}}>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
   
//           {singlePlayer.first_name} {singlePlayer.last_name}
//         </Typography>
//         <Typography variant="h5" component="h2">
//         {singlePlayer.position} {singlePlayer.height}, {singlePlayer.weight} lbs   
//         </Typography>
//         <Typography className={classes.pos} color="textSecondary">
//         Throws: {singlePlayer.throws} / Bats: {singlePlayer.bats}
//         </Typography>
//         <Typography variant="body2" component="p">
//         <FaAddressCard /> {singlePlayer.address}
//         <br/>
//         <FaMailchimp /> {singlePlayer.email}
//           <br />
//          <FaBirthdayCake /> {singlePlayer.dob}
//           <br/>
//           <FaBaseballBall /> {singlePlayer.team_name} {singlePlayer.team_city}, {singlePlayer.team_state}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }
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
//   const classes = useStyles();
class ComponentToPrint extends React.PureComponent {
    render() {
    
        
        return (
            <div>
            <div className='pdf_container'>
            {this.props.url&&<Image boxSize="245px" objectFit="cover" src={this.props.url}/>}
            <Card style={{minWidth: '23em',height: '15.5em',padding: '.5em',} }>
      <CardContent style={{'padding':0}}>
        <Typography  style={{fontSize: '2rem'}}color="textSecondary" gutterBottom>
   
          {this.props.name.first_name} {this.props.name.last_name}
        </Typography>
        <Typography variant="h5" component="h2">
        {this.props.name.position} {this.props.name.height}, {this.props.name.weight} lbs   
        </Typography>
        <Typography style={{ marginBottom: 2}}color="textSecondary">
        Throws: {this.props.name.throws} / Bats: {this.props.name.bats}
        </Typography>
        <Typography variant="body2" component="p">
        <FaAddressCard /> {this.props.name.address}
        <br/>
        <FaMailchimp /> {this.props.name.email}
          <br />
         <FaBirthdayCake /> {this.props.name.dob}
          <br/>
          <FaBaseballBall /> {this.props.name.team_name} {this.props.name.team_city}, {this.props.name.team_state}
        </Typography>
      </CardContent>
    </Card>
    </div>
    <div className='pdf_media_links_container'>
            <ul>
                {this.props.media.map(link=><a href={link.content}><li>{link.content}</li></a>)}
            </ul>
    </div>
    <div>
        {/* <p>{this.props.evals}</p> */}
    </div>
    </div>
            // <div className='pdf_container'>
            //      {this.props.url && <Image boxSize="245px" objectFit="cover" src={this.props.url}/>}
            //     <h1>{this.props.name.first_name} {this.props.name.last_name}</h1>
            //     <h1>{this.props.name.height} {this.props.name.weight}lbs</h1>
            //     <h1>Position {this.props.name.position}</h1>
            //     <h1>Bats {this.props.name.bats}</h1>
            //     <h1>Throws {this.props.name.throws}</h1>
            //     <h1>D.O.B. {this.props.name.dob}</h1>
            //     <h1>{this.props.name.phone_number}</h1>
            //     <h1>{this.props.name.address}</h1>
            //     <h1>{this.props.name.email}</h1>
            //     <h1>{this.props.name.team_name},{this.props.name.team_city}{this.props.name.team_state}</h1>
            //     <ul>
            //     {this.props.media.map(link=><li><a href={link.content}>{link.content}</a></li>)}
            //     </ul>
            // </div>
      );
    }
}
const Example = ({load}) => {
  const componentRef = useRef();
  const history = useHistory();
  const {players} = useSelector(state=> state.players)
  const pdf = load.players.PDF
console.log(pdf.evals)
const back = (e)=>{
    e.preventDefault()
    history.push(`/players/${pdf.singlePlayer.id}`)
}
  return (
    <div >
        <div className='pdf_container_buttons'>
      <ReactToPrint
        trigger={() =>{
            return <Button type="button" size='small' variant="outlined">Create PDF</Button>}
        }    
        content={() =>componentRef.current }
      />
        <Button type="button" size='small' variant="contained" color='primary' onClick={back}>Back</Button>
      </div>
      <ComponentToPrint name={""||(pdf.singlePlayer)} evals={pdf.evals} url={pdf.url} media={pdf.media}ref={componentRef} />
    </div>
  );
};

export default Example;