import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const ButtonsForEval = ({setType, type, submitEv}) => {
  
  return (
    <>
    <ButtonGroup size='large' disableElevation variant="contained" color="primary">
      <Button
      style={{'backgroundColor':'gray',"marginLeft":'1.6em',width:'5em',height:'4em'}}
        type="Integer"
        onClick={(e) => {
          e.preventDefault();
            setType(type - 5);

        }}
      >
        -
      </Button>
      <Button
      
        style={{'backgroundColor':'navyblue',width:'5em',height:'4em'}}
        onClick={(e) => {
          e.preventDefault();
          setType(type + 5)
        }}
      >
        +
      </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonsForEval;
