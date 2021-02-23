import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

// import { ComponentToPrint } from './ComponentToPrint';
class ComponentToPrint extends React.PureComponent {
    render() {
        
        return (
            <div >
                <h1>{this.props.name}</h1>
            </div>
      );
    }
}
const Example = ({load}) => {
  const componentRef = useRef();
  const {players} = useSelector(state=> state.players)
//   const [pdfs, setPdfs] = useState(players)
  const pdf = load.players.PDF
//   const pdf = players['PDF']
//   useEffect(()=>{
    //       try{
        //         const pdf = players['PDF']
        //         setPdfs(pdf)
        //         console.log(pdf)
        //       }catch(e){
            
            //       }
            //   },[pdfs])
useEffect(()=>{
    console.log(players)
    console.log(load.players.PDF)
    // setPdfs(players)
},[load])
  return (
    <div>
      <ReactToPrint
        trigger={() =>{
         return <Button type="button" size='small' variant="outlined">Create PDF</Button>}
        }    
        content={() =>componentRef.current }
      />
      <ComponentToPrint name={""||(pdf.singlePlayer.first_name)}ref={componentRef} />
    </div>
  );
};

{/* <Button type="button" size='small' variant="outlined" onClick={handlePrint}>Share</Button> */}
export default Example;