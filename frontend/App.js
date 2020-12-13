import './App.css';
import logo from './ftx-logo-static.png';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  Chart,
  LineSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  }
}));



const api = axios.create({
  baseURL: 'http://15.207.119.70:9000/',
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  crossdomain: true
})

const trand = [
  { day: 'Monday', quantity: 759 },
  { day: 'Tuesday', quantity: 294 },
  { day: 'Wednesday', quantity: 942 },
  { day: 'Thursday', quantity: 1265 },
  { day: 'Friday', quantity: 942 },
  { day: 'Saturday', quantity: 985 },
  { day: 'Sunday', quantity: 792 },
];

class App extends React.Component{
  
  state = {
    data:[],
    invested:0,
    return: 0,
    open: false,
    add:false,
    with: false,
    balance: 0,
    cc: trand
  };

  
  
  constructor(){
    super()
    api.get('/transactions').then((res)=>{
      this.setState({data: res.data.items, invested: res.data.total_invested, return: res.data.total_return, balance: res.data.balance})
    })
    
  }




  render(){
    const cc = this.state.cc;
    this.handleClickOpen = () => {
      this.setState({open: true})
    };
  
  this.handleClose = () => {
      this.setState({open:false})
    };
  
    
  this.handleChanges = () => {
      this.setState({open:false});
      api.post('/setting', {
        percent: document.getElementById('p').value,
        max: document.getElementById('ma').value
      })
    };

    this.handleClickOpenAdd = () => {
      this.setState({add: true})
    };
  
  this.handleCloseAdd = () => {
      this.setState({add:false})
    };
  
    
  this.handleChangesAdd = () => {
      this.setState({add:false});
      api.post('/add', {
        add: document.getElementById('a').value
      })
  
    };

    this.handleClickOpenwith = () => {
      this.setState({with: true})
    };
  
  this.handleClosewith = () => {
      this.setState({with:false})
    };
  
    
  this.handleChangesWith = () => {
      this.setState({with:false});
      api.post('/with', {
        with: document.getElementById('w').value
      })
  
    };
    const { classes } = this.props;
    console.log(this.state.data.id)
    return (
      <div className="App">
 <AppBar position="static">
          <Toolbar>
          <Grid
  container
  direction="row"
  justify="space-between"
  alignItems="center"
>
          <div className="logo">
          <img src={logo} width="100" height="30" />
        </div>
            <Typography variant="h6">
              InvestX
            </Typography>
        <div>
        <IconButton aria-label="setting" onClick={this.handleClickOpen} color="inherit">
  <SettingsIcon />
</IconButton>
          </div>    
            
        </Grid>
          </Toolbar>
        </AppBar>
        <Grid
  container
  direction="row"
  justify="space-around"
  alignItems="center"
>
        
<Card className={classes.root} style={{width:250, height: 130, margin: 20, background:'linear-gradient(135deg, #ce9ffc 0%,#9c80f5 100%)'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Total Transactions
        </Typography>
        <Typography variant="h4" component="h2">
          {Object.keys(this.state.data).length}
        </Typography>
        <Typography variant="h6">
        {Math.round(((Object.keys(this.state.data).length)*100/10))-100}%
        </Typography>
      </CardContent>
    </Card>

    <Card className={classes.root} style={{width:250, height: 130, margin: 20, background:'linear-gradient(135deg, #fcdf8a 0%,#f38c81 100%)'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Balance
        </Typography>
        <Typography variant="h4" component="h2">
          {this.state.balance}
        </Typography>
        <Typography variant="h6">
        {Math.round((this.state.balance/3225)*100)-100}%
        </Typography>
      </CardContent>
    </Card>

    <Card className={classes.root} style={{width:260, height: 130, margin: 20, background:'linear-gradient(135deg, #fad961 0%,#f8b047 100%)'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Liquid Investment
        </Typography>
        <Typography variant="h4" component="h2">
          {this.state.invested}
        </Typography>
        <Typography variant="h6">
        {Math.round((this.state.invested/1935)*100)-100}%
        </Typography>
      </CardContent>
    </Card>

        <Card className={classes.root} style={{width:250, height: 130, margin: 20, background:'linear-gradient(135deg, #c3ec52 0%,#0ba29d 100%)'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Returns
        </Typography>
        <Typography variant="h4" component="h2">
          {this.state.return}
        </Typography>
        <Typography variant="h6">
        {Math.round((122.28/this.state.invested)*100)}%
        </Typography>
      </CardContent>
    </Card>
    
    </Grid>
    <Grid
  container
  direction="row"
  justify="space-evenly"
  alignItems="center"
>
        <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
  style={{width: 600, height: 650}}
>
        <Paper  margin='30px' style={{width: 600, height: 550}}>
        <Chart
          style={{width: 600, height: 550}}
          data={cc}
        >
          <ArgumentAxis max={7} />
          <ValueAxis max={10} />

          <LineSeries
            valueField="quantity"
            argumentField="day"
            barWidth={5}
          />
          <Title text="Investment over time" />
          <Animation />
        </Chart>
      </Paper>
      
      <Grid
  container
  direction="row"
  justify="space-evenly"
  alignItems="center"
  style={{width: 400, height: 100}}
>    


<Button variant="contained" color="primary" onClick={this.handleClickOpenAdd}>
  ADD MORE FUNDS
</Button>
<Button variant="contained" color="secondary" onClick={this.handleClickOpenwith}>
  WITHDRAW FUNDS
</Button>


 </Grid>
      
      </Grid>
        <Box border={1} margin='30px'>
        <Typography varient='h1' style={{ paddingLeft:'00px', fontSize: 25}} >Transactions </Typography><Divider />
        <List className={classes.list} style={{width:300}}>
        {this.state.data.map(node =>{
      return (<div><ListItem>
            <AddSharpIcon style={{ color: green[500] }}/>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="left"
              padding="20px 0px"
              >
       <Typography varient='h2' style={{ paddingLeft:'00px', varient: 'h3'}}>Recieved: INR {node.amount}</Typography>
       <Typography variant="subtitle2" align='left' styles={{color: '#EEEEEE'}} >
       via:{node.method}
  </Typography>

        </Grid></ListItem><Divider /></div>
)})
      }
      </List>
      </Box>
      </Grid>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Investment Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the percentage of investment from each sale as well as the max amount of investment in a day.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="p"
            label="Investment Percentage"
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="ma"
            label="Max amount per day"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleChanges} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={this.state.add} onClose={this.handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Investment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter how much investment do you want to add
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="a"
            label="Investment"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleChangesAdd} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={this.state.with} onClose={this.handleClosewith} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Withdraw Money</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter amount you want to withdraw.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="w"
            label="Withdraw"
            type="number"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClosewith} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleChangesWith} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles) (App);
