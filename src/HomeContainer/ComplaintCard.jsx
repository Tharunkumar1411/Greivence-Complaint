import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import { CardBody } from 'reactstrap';

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
    height: "fit-content",
    background: "linear-gradient(107deg, rgba(43,41,44,1) 0%, rgba(135,155,177,1) 0%, rgba(240,242,244,1) 100%, rgba(82,111,143,0) 100%)",
    fontStyle: "bold",
    margin: '0.5rem',
  }
}));

export default function ComplaintCard(props) {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  return (
    <div>
    <Card className={classes.homeCard} onClick={handleClickOpen}>
          <CardHeader
            title={props.comp}
            subheader={props.time}
          />
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        fullWidth="true"
        >
        <DialogTitle style={{ cursor: 'move', textAlign:"center" }} id="draggable-dialog-title"> 
            Grievence Status
        </DialogTitle>

        <DialogContent>
            <div>
              <ul>
                <li>Grievence : {props.comp}</li>
                <li>Grievence Status: {props.status}</li>
                <li>Comitte Response : NILL</li>
              </ul>
            </div>
        </DialogContent>

        </Dialog>
    </div>

  );
}

