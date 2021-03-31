import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Tooltip } from "@chakra-ui/react"
import Typography from '@material-ui/core/Typography';

const ButtonsForEval = ({setType, type, submitEv}) => {
let score = 'Rating Key\n80-Outstanding\n70-Very Good\n60-Above Average\n50-Average\n40-Below Average\n30-Well Below Average\n20-Poor';

  return (
    <>
    <ButtonGroup size='large' disableElevation variant="contained" color="primary">
      <Button
      style={{'backgroundColor':'gray',"marginLeft":'1.6em',width:'5em',height:'4em',cursor:'pointer'}}
        type="Integer"
        title={score}
        onClick={(e) => {
          e.preventDefault();
            setType(type - 5);

        }}
      >
        -
      </Button>
      <Button
        style={{'backgroundColor':'navyblue',width:'5em',height:'4em',cursor:'pointer'}}
        title={score}
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
