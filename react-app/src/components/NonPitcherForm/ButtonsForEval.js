import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const ButtonsForEval = ({setType, type, submitEv}) => {
  return (
    <>
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button
      style={{'backgroundColor':'gray',"marginLeft":'1.6em'}}
        type="Integer"
        onClick={(e) => {
          e.preventDefault();
          setType(type - 5)
          submitEv(e)
        }}
      >
        -
      </Button>
      <Button
        style={{'backgroundColor':'navyblue',"marginRight":'1.7em'}}
        onClick={(e) => {
          e.preventDefault();
          setType(type + 5);
          submitEv(e)
        }}
      >
        +
      </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonsForEval;
