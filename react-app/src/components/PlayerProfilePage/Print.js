import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';

// import { ComponentToPrint } from './ComponentToPrint';
class ComponentToPrint extends React.PureComponent {
    render() {
        
        return (
            <div style={{'visibility':`${!this.props.hidden}`,'opacity':0, 'zIndex':-100,'position':'absolute'}}>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
                <p>{this.props.player}</p>
            </div>
      );
    }
}
const Example = ({player}) => {
  const componentRef = useRef();
  const [hide, setHide] = useState(false);
  console.log(player,'test')
  return (
    <div>
      <ReactToPrint
        trigger={() =>{
            setHide(true)
         return <Button type="button" size='small' variant="outlined" >Share</Button>}
        }    
        content={() =>componentRef.current }
      />
      <ComponentToPrint style={{'opacity':0}}player={player} hidden={hide} ref={componentRef} />
    </div>
  );
};

{/* <Button type="button" size='small' variant="outlined" onClick={handlePrint}>Share</Button> */}
export default Example;