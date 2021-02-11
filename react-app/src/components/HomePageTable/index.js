import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const columns = [
  { field: 'first_name', headerName: 'First', width: 100 },
  { field: 'last_name', headerName: 'Last', width: 100 },
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
    width: 100,
  },
  {
    field: 'team_city',
    headerName: 'City',
    width: 140,
  },
  {
    field: 'team_state',
    headerName: 'State',
    width: 140,
  },
];
export default function DataGridDemo() {
    const history = useHistory()
    const click=(e)=>{
        const id = e.rowIds[0]
        history.push(`/players/${id}`)
    }
    const players  = useSelector((state) => state.players);
console.log('these are the players',Object.values(players))
const newArrOfPlayers = Object.values(players)
  return (
    <div style={{ height: '70vh', width: '50%' }}>
      <DataGrid rows={newArrOfPlayers} columns={columns} pageSize={10} checkboxSelection  onSelectionChange={click} />
    </div>
  );
}