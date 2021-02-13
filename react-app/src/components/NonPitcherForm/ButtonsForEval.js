import React, { useEffect } from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const ButtonsForEval = ({setType, type, submitEv}) => {
  
  return (
    <>
    <ButtonGroup size='small' disableElevation variant="contained" color="primary">
      <Button
      style={{'backgroundColor':'gray',"marginLeft":'1.6em'}}
        type="Integer"
        onClick={(e) => {
          e.preventDefault();
          setTimeout(()=>{
            setType(type - 5);
            // submitEv(e)
          })
        }}
      >
        -
      </Button>
      <Button
      size='small'
        style={{'backgroundColor':'navyblue'}}
        onClick={(e) => {
          e.preventDefault();
          setType(type + 5)
          // submitEv(e);
        }}
      >
        +
      </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonsForEval;
