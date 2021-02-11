import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const ButtonsForEval = ({setType, type}) => {
  return (
    <>
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button
      style={{'background-color':'darkgreen',"margin-left":'.3em'}}
        type="Integer"
        onClick={(e) => {
          e.preventDefault();
          return setType(type + 5);
        }}
      >
        +
      </Button>
      <Button
        style={{'background-color':'red'}}
        onClick={(e) => {
          e.preventDefault();
          return setType(type - 5);
        }}
      >
        -
      </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonsForEval;
