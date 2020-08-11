import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import "firebase/firestore";

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const firebaseConfig = {
  apiKey: "AIzaSyCkVLXcjCwo7OwujFZfviLcmWkBk3aEztg",
  authDomain: "shopping-list-58e5d.firebaseapp.com",
  databaseURL: "https://shopping-list-58e5d.firebaseio.com",
  projectId: "shopping-list-58e5d",
  storageBucket: "shopping-list-58e5d.appspot.com",
  messagingSenderId: "290378122164",
  appId: "1:290378122164:web:f36247c0c51d016ba1a8e1",
  measurementId: "G-X8SDMPM8TT"
};

function App() {
  const[loading, setLoading] = useState(true);
  const[items, setItems] = useState([]);
  const[item, setItem] = useState("");
  const[count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      const data = await db.collection("item").get();
      const items = data.docs.map(doc => {
        return  { 
          name: doc.data().name, 
          count: doc.data().count, 
          id: doc.id 
        };
      });
      setItems(items);
      setLoading(false);
    }
    fetchData();
  },[]);

  const addItem = async () => {
    let newItem =  { name: item, count: count, id: '' };
    const db = firebase.firestore();
    let doc = await db.collection('items').add(newItem);
    newItem.id = doc.id;
    setItems( [...items,newItem]);
    setItem("");
    setCount(1);
  }

  const deleteItem = async (item) => {
    const db = firebase.firestore();
    db.collection('items').doc(item.id).delete();
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);  
  }

  if (loading) return (<p>Loading...</p>);

  const sh_items = items.map( (item, index) => {
    return (
      <Card key={index} style={{marginTop: "2%"}}>
        <Grid container spacing={0}>
          <Grid item xs={9} style={{textAlign: "left", paddingLeft: "5%", paddingTop: "1%"}}>
            <Typography variant="body1" component="p1" gutterBottom>
              {item.name}   x{item.count}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button size="small" onClick={() => deleteItem(item)}>x</Button>
          </Grid>
        </Grid>
      </Card>     
    );
  });

  return (
    <div className="App">
        <Grid container spacing={0} style={{marginTop: "2%", marginBottom: "4%"}}>
          <Grid item xs={7} style={{textAlign: "left"}}>
            <TextField id="standard-basic" label="Item" onChange={e => setItem(e.target.value)} />
          </Grid>
          <Grid item xs={2}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">n</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => setCount(e.target.value)}
                value={count}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={3} style={{marginTop: "3%"}}>
          <Button variant="contained" onClick={() => addItem()}>Add</Button>
          </Grid>
        </Grid>
      {sh_items}
    </div>
  );
}

export default App;
