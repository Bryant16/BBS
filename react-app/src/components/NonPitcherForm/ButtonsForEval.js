import React from "react";
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
            setType(type - 5);

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
        }}
      >
        +
      </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonsForEval;
