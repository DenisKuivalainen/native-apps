import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Form, Item, Input} from 'native-base';
import MapView from 'react-native-maps';
import Dialog from 'react-native-dialog';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      region: {
        latitude: 61.6875,
        longitude: 27.27361,
        latitudeDelta: 0.05,
        longitudeDelta: 0.025,
      },
      markers: [],
      shown: false,
      lat: null,
      long: null,
      nm: null
    }
  }

  componentDidMount() {
    this.getCord();
    this.getMark();
    this.getLocationAsync();
  }

  getCord = async () => {
    let value1 = await AsyncStorage.getItem('lat');
    let value2 = await AsyncStorage.getItem('long');
    if(value1 !== null && value2 !== null) {
      this.setState({region: {
        latitude: parseInt(value1),
        longitude: parseInt(value2),
        latitudeDelta: 0.5,
        longitudeDelta: 0.25,
      }});
    }
  }

  getMark = async () => {
    let value = await AsyncStorage.getItem('mark');
    if(value !== null) {
      this.setState(JSON.parse(value));
    }
  }
    
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }
    
    let location = await Location.getCurrentPositionAsync({});

    this.setState({ 
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.25,
      }
    });
    AsyncStorage.setItem('lat', location.coords.latitude + '');
    AsyncStorage.setItem('long', location.coords.long + '');
  }; 

  addMarker = () => {
    this.setState({shown: true})
  }

  setLat = (t) => {
    this.setState({lat: parseInt(t, 10)});
  }

  setLong = (t) => {
    this.setState({long: parseInt(t, 10)});
  }

  setName = (t) => {
    this.setState({nm: t});
  }

  addM = () => {
    let arr = this.state.markers;
    let elem = {
      lat: this.state.lat,
      long: this.state.long,
      ttl: this.state.nm
    };
    arr.push(elem);
    this.setState({shown: arr, shown: false});
    AsyncStorage.setItem('mark', JSON.stringify(arr));
  }

  cancelM = () => {
    this.setState({shown: false})
  }
  
  render() {
    return (
      <>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            My placez         {this.state.region.latitude + "   " + this.state.region.longitude}
          </Text>
          <View style={styles.addButton}>
            <Button 
              onPress={this.addMarker}
              title="Add" 
            />
          </View>
        </View>

        {
          !this.state.shown && (
            <MapView        
              style={{flex: 9.5}}        
              region={this.state.region} 
              annotations={this.state.markers}      
              showsUserLocation={true}>
              {this.state.markers.length > 0 && (this.state.markers.map((m, i) => {
                return <MapView.Marker
                  key={i}
                  coordinate={{latitude: m.lat,
                  longitude: m.long}}
                  title={m.ttl}
                />
              }))}
            </MapView>
          )
        }

        <Dialog.Container visible={this.state.shown}>
        <Dialog.Title>Add a new marker</Dialog.Title>
        <Form>
          <Item>
            <Input onChangeText={ (text) => this.setName(text)} placeholder="Place name"/>
          </Item>
          <Item>
            <Input onChangeText={ (text) => this.setLat(text)} placeholder="Latitude"/>
          </Item>
          <Item>
            <Input onChangeText={ (text) => this.setLong(text)} placeholder="longitude"/>
          </Item>
        </Form>
        <Dialog.Button label="Cancel" onPress={this.cancelM} />
        <Dialog.Button label="Add" onPress={this.addM} />
      </Dialog.Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    marginBottom: 0,
    top: 30,
    height: "100%",
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
  },
  bannerText: {
    fontWeight: "bold",
    padding: 2,
    margin: 9,
    flex: 1,
  },
  addButton: {
    margin: 5,
  }
});