import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'10px'
  },
  Brand:{
    backgroundColor:'66FCF1'
  },

  back:{
    backgroundColor:'aqua'

  },
  Comp:{
    color:'black'
  }
  
}));

export default function ComplaintCard(props) {
 

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion className={classes.Brand}>
   
        
        <AccordionDetails>
             <text className={classes.Box}><h6 className={classes.Comp}>{props.comp}</h6></text>

        </AccordionDetails>


   
      </Accordion>
    
    
    </div>
  );
}

