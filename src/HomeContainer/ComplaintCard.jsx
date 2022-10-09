import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

    width: '50%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'10px',
    
  },

  Comp:{
    color:'black'
  },

  Brand:{
    backgroundColor:"hsla(0, 100%, 90%, 0.3)"
  },

  time:{
    opacity:"0.5",
    fontSize:"1rem",
    paddingRight:"0.5rem"
  }
  ,
  cardBody: {
    width: "90%",

  },
  homeCard: {
    width: "80%",
    margin: "1rem",
    height: "fit-content",
    background: "linear-gradient(107deg, rgba(43,41,44,1) 0%, rgba(135,155,177,1) 0%, rgba(240,242,244,1) 100%, rgba(82,111,143,0) 100%)",
    fontStyle: "bold"
  }
}));

export default function ComplaintCard(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Accordion className={classes.Brand}>
        <AccordionDetails>
            <text className={classes.time}>{props.time}</text>

            <text className={classes.Box}><h6 className={classes.Comp}>{props.comp}</h6></text>
        </AccordionDetails>

      </Accordion> */}
    
      <Card sx={{ maxWidth: 345 }} className={classes.homeCard} >
          <CardHeader
            title={props.comp}
            subheader={props.time}
          />
      </Card>
    </div>
  );
}

