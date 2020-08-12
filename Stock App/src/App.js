import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// import for Material-UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState([]);

  const handleChange = event => {
    setSymbol(event.target.value);
    loadStock(event.target.value);
  }

  const loadStock = (symbol) => {
    // const URL_PATH = 'http://localhost:3000/json/';
    // const url = URL_PATH + symbol + '.json';
    // console.log(url)
  
    fetch("/stock?symbol=" + symbol)
    .then((resp) => {
      return resp.json();
    })
    .then((res) => {
      var data = [];
      var countMAX = 10;
      var count = 0;
      Object.keys(res["Time Series (Daily)"]).forEach(function(key) {
        count++;
        if (count < countMAX) {

          data.push(
            {
              'date': key,
              'open': res["Time Series (Daily)"][key]["1. open"],
              'high': res["Time Series (Daily)"][key]["2. high"],
              'low': res["Time Series (Daily)"][key]["3. low"],
              'close': res["Time Series (Daily)"][key]["4. close"],
              'volume': res["Time Series (Daily)"][key]["5. volume"],
            }
          );
        }
      });
      setData(data);
      console.log("!")
    });
  }

  return (
    <div className="App">
      <h1>Stock - Time Series</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={symbol}
          onChange={handleChange}
        >
          <MenuItem value='AAPL'>Apple</MenuItem>
          <MenuItem value='AMZN'>Amazon</MenuItem>
          <MenuItem value='NOK'>Nokia</MenuItem>
          <MenuItem value='TSLA'>Tesla</MenuItem>
        </Select>
      </FormControl>
      <div style={{width: '100%', height: '400px'}}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin', 'dataMax']}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;