import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';

class App extends React.Component {
  state = {}

 render() {
    return (
      <View style={styles.container}>
        <Movie name="Name1" adress="Adress1 adress1 adress1 123456" dt="06.08.2020 10:00"/>
        <Movie name="Name2" adress="Adress2 adress2 adress2 234567" dt="06.08.2020 12:00"/>
        <Movie name="Name3" adress="Adress3 adress3 adress3 345678" dt="06.08.2020 14:00"/>
      </View>
    )
  }
}

class Movie extends React.Component {
  state = {}

 render() {
    return (
      <View style={styles.bd}>
        <Text style={{fontWeight: 'bold'}}>{this.props.name}</Text>
        <Text>{this.props.adress}</Text>
        <Text>{this.props.dt}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#DDDDDD',
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  bd: {
    padding: '2px',
    margin: '1px',
    alignItems: 'left',
    borderWidth: '1px'
  }
});

export default App;
