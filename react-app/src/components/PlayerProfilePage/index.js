import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import { useDisclosure } from "react-use-disclosure";
import {getNonePitcherForm} from '../../store/nonPitcher';
import {getPitcherForm} from "../../store/Pitcher";
import './PlayerProfilePage.css';
import NewPlayerForm from '../NewPlayerForm';
import PlayerImage from './PlayerImage';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Lorem
  } from "@chakra-ui/react"

const PlayerProfilePage = ()=>{
    const history = useHistory();
    const { user } = useSelector((state) => state.session);
    const {playerid} = useParams();
    const [playerInfo, setPlayerInfo] = useState(false);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(()=>{
       const getPlayer = async()=>{
            let res = await fetch(`/api/players/${playerid}`)
            if(res.ok){
                let single_player =await res.json();
                setPlayerInfo(single_player.player)
            }
        }
        getPlayer()
        dispatch(getNonePitcherForm(playerid))
        dispatch(getPitcherForm(playerid))   
    },[dispatch]);

   
    
    return (
    <div className='player_profile_page'>
        {playerInfo ? (
            <div className='player_profile_container'>
             <PlayerImage playerid={playerid}/>
            <div className='player_info_container'>
            <div>
                <Link to={`/players/${playerid}/evaluation`}>Evaluation</Link>
                <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
                <h2>first: {playerInfo.first_name}</h2>
                <h2>last: {playerInfo.last_name}</h2>
                <h2>height: {playerInfo.height}</h2>
                <h2>weight: {playerInfo.weight}</h2>
                <h2>position: {playerInfo.position}</h2>
                <h2>bats: {playerInfo.bats}</h2>
            </div>
            <div>
                <h2>address:{playerInfo.address}</h2>
                <h2>throws:{playerInfo.throws}</h2>
                <h2>phone_number: {playerInfo.phone_number}</h2>
                <h2>email:{playerInfo.email}</h2>
                <h2>team_name: {playerInfo.team_name}</h2>
                <h2>team_city: {playerInfo.team_city}</h2>
                <h2>team_state: {playerInfo.team_state}</h2>
            </div>
            <div>
                <h3>VIDEOS</h3>
            </div>
            </div>
        </div>
        ): <h1>loading</h1>}
    </div>
    )
}

export default PlayerProfilePage;