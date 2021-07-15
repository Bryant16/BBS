import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './HomePage.css';

const columns = [
  { field: '__check__', hide: true },
  { field: 'first_name', headerName: 'First', width: 130},
  { field: 'last_name', headerName: 'Last', width: 130},
  {
    field: 'position',
    headerName: 'Pos',
    width: 120
  },
  {
    field: 'bats',
    headerName: 'Bats',
    width: 85
  },
  {
    field: 'throws',
    headerName: 'Throws',
    width: 100
  },
  {
    field: 'team_name',
    headerName: 'Team',
    width: 150
  },
  {
    field: 'team_city',
    headerName: 'City',
    width: 145
  },
  {
    field: 'team_state',
    headerName: 'State',
    width: 160,
  },
];
export default function DataGridDemo() {
    const history = useHistory();
    const [hot, setHot] = useState(true);
    const [arr, setArr] = useState(false);
    const [tracked, setTracked] = useState("Tracking");
    const [width, setWidth] = useState(1000)

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
  useEffect(()=>{
    getWidth()
  })
  const getWidth = ()=>{
    const container = document.querySelector('.MuiDataGrid-main')
    if(container){
      setWidth(container.getBoundingClientRect().width)
      // console.log()
    }
  }
  return (
    <div style={{ minHeight: '75vh', width: '75vw'}}>
      {/* , fontSize: '1.8rem' */}
      <button id='tracker_button' onClick={handleTrack}>{tracked}</button>
      <input id='search_bar' type='text' placeholder='search...'onChange={filterResults}></input>
      <DataGrid autoPageSize rows={arr || newArrOfPlayers.filter(play=>play.hot_list===true)} rowHeight={80} columns={columns}
        // [{ field: '__check__', hide: true },{
        //   field: "first_name",  headerName: "First name",  width: 150,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>); }
        // },
        // {
        //   field: "last_name",  headerName: "Last name",  width:150 ,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "position",  headerName: "Position",  width:150 ,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "bats",  headerName: "Bats",  width: 100,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "throws",  headerName: "Throws",  width:100 ,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "team_name",  headerName: "Team",  width: 190,
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "team_city",  headerName: "City",  width: '160',
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // },
        // {
        //   field: "team_state",  headerName: "State",  width: '10em',
        //   renderCell: (cellValues) => { return (<div style={{ color: "black", fontSize: '1.3rem', width: "'0'", textAlign: "left" }}>{cellValues.value}</div>);
        //  }
        // }]} 
        pageSize={10} checkboxSelection  onSelectionChange={click} />
    </div>
  );
}