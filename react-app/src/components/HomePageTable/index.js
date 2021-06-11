import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const columns = [
  { field: '__check__', hide: true },
  { field: 'first_name', headerName: 'First', width: 120},
  { field: 'last_name', headerName: 'Last', width: 120 },
  {
    field: 'position',
    headerName: 'Pos',
    width: 80,
  },
  {
    field: 'bats',
    headerName: 'Bats',
    width: 85,
  },
  {
    field: 'throws',
    headerName: 'Throws',
    width: 100,
  },
  {
    field: 'team_name',
    headerName: 'Team',
    width: 125,
  },
  {
    field: 'team_city',
    headerName: 'City',
    width: 145,
  },
  {
    field: 'team_state',
    headerName: 'State',
    width: 140,
  },
];
export default function DataGridDemo() {
    const history = useHistory();
    const [hot, setHot] = useState(true);
    const [arr, setArr] = useState(false);
    const [tracked, setTracked] = useState("Tracking");

    const click=(e)=>{
        const id = e.rowIds[0]
        history.push(`/players/${id}`)
    };

    const players  = useSelector((state) => state.players);

  let newArrOfPlayers = Object.values(players);

  const handleTrack = (e)=>{
    e.preventDefault();
    if(hot){
      setTracked("Not Tracking")
    }else{
      setTracked("Tracking")
    }
    setArr(newArrOfPlayers.filter(play=> play.hot_list === !hot))
    setHot(!hot)
  };

  const filterResults = (e)=>{
    if(newArrOfPlayers.length > 0 ){
      setArr(newArrOfPlayers.filter(play=>{
        if(play.first_name){
          const string_to_check = play.first_name + play.last_name + play.team_name + play.team_state + play.address + play.position + play.team_city + play.team_name
          return string_to_check.toLowerCase().includes(e.target.value.toLowerCase())
        }
      }))
    }
  };
  
  return (
    <div style={{ height: '50em', width: '60em'}}>
      <button id='tracker_button' onClick={handleTrack}>{tracked}</button>
      <input id='search_bar' type='text' placeholder='search...'onChange={filterResults}></input>
      <DataGrid autoPageSize rows={arr || newArrOfPlayers.filter(play=>play.hot_list===true)} columns={columns} pageSize={10} checkboxSelection  onSelectionChange={click} />
    </div>
  );
}