import Dialog from 'react-native-dialog';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Thumbnail, Card, CardItem, Form, Title, Header, Left, Body, Item, Input, Text, Button, Right, Content } from 'native-base';
import {ScrollView} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); 
  const [sureDelete, setDelete] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);
  const [settedId, setId] = useState({});
  
  const openDialog = () => {
    setModalVisible(true);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const addCity = () => {
    let a = cities.length === 0 ? 0 : cities[cities.length - 1].id + 1
    setCities( [...cities,{id:a, name:cityName}]);
    setModalVisible(false);
  }

  const deleteCity = (arr) => {
    setId(arr);
    setDelete(true);
  }

  const delNo = () => {
    setDelete(false);
  }

  const delYes = () => {
    setCities(cities.filter(city => city.id !== settedId.i));
    setDelete(false);
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log("Cities saving error!");
    }
  } 

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }

  useEffect(() => {
    getData();
  },[]); 

  useEffect(() => {
    storeData();
  },[cities]);

  return (
    <Container>
      <Header>
        <Left/>
        <Body>
          <Title>Forecastz</Title>
        </Body>
        <Right>
          <Button>
            <Text onPress={openDialog}>Add</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <ScrollView>
          {!modalVisible && !sureDelete && cities.map(function(city,index){
            return (
              <WeatherForecast 
                key={index} 
                city={city.name} 
                id={city.id} 
                deleteCity={deleteCity} />
              )
            })
          }
        </ScrollView>
      </Content>

      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <Form>
          <Item>
            <Input onChangeText={ (text) => setCityName(text)} placeholder="cityname"/>
          </Item>
        </Form>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>

      <Dialog.Container visible={sureDelete}>
        <Dialog.Title>{"Do you realy want to delete " + settedId.n + " from list?"}</Dialog.Title>
        <Dialog.Button label="No" onPress={delNo} />
        <Dialog.Button label="Yes" onPress={delYes} />
      </Dialog.Container>
    </Container>
  );
}

class WeatherForecast extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: null, load: false };
  } 

  componentDidMount() {
    this.getRes();
  }

  getRes() {
    this.setState({load: true});
    let city = this.props.city;
    let API_KEY = '73a9f8452d111220659b5c8ce5d9bdc4';
    let URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    fetch(URL+city+'&appid='+API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({data: data, load: false});
    });
  }

  refresh = () => {
    this.getRes();
  }

  deleteCity = () => {
    this.props.deleteCity({i: this.props.id, n: this.props.city});
  }

  render() {
    let data = this.state.data;
    let d = new Date();
    let date = d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+"  "+d.getHours()+":"+ d.getMinutes()
    if(this.state.load) {
      return(
        <Card>
          <CardItem>
            <Body>
              <Text>
                Loading...
              </Text>
            </Body>
          </CardItem>
        </Card>
      )
    }
    if(this.state.data === null || this.state.data.cod !== 200) {
      let errorData = data === null ? "" : data.message;
      return(
        <Card>
          <CardItem>
            <Body>
              <Text >
                {errorData}
              </Text>
            </Body>
            <Right>
              <Text onPress={this.deleteCity}>delete</Text>
            </Right>
          </CardItem>
          {/* <CardItem footer bordered>
            <Text onPress={this.deleteCity}>delete</Text> 
          </CardItem> */}
        </Card>
      )  
    }
    let urlImg = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    return (
      <Card>
        <CardItem header bordered>
          <Text>{data.name}</Text>
          <Right>
            <Text style={{textAlign: "right", color: "gray"}}>{date}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{Math.floor((data.main.temp - 273.15)*100)/100} °C</Text>
            <Text>{data.weather[0].main}</Text>
          </Body>
          <Right>
            <Thumbnail square small source={{uri: urlImg}} />
          </Right>
        </CardItem>
        <CardItem footer bordered>
          <Left>
            <Text onPress={this.deleteCity}>delete</Text>
          </Left>
          <Text onPress={this.refresh}>refresh</Text>  
        </CardItem>
      </Card>
    )
  }
}
