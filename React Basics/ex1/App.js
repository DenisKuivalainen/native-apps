import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import AssetExample from './components/AssetExample';


class App extends React.Component {
  state = {
    val: 0
  }

  handleIncr = () => {
    this.setState({val: this.state.val + 1});
  }

  handleDecr = () => {
    this.setState({val: this.state.val - 1});
  }

  getInf() {
    let a = this.state.val;
    return a < -10 ? 'The value is so low, that it is impossible to see it :(' : (
      a > 10 ? 'The value is so great, that it is beyond your perception!' : ('Value is ' + a)
    );
  }

 render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            {this.getInf()}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleIncr}>
          <Text>INCREASE VALUE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handleDecr}>
          <Text>DECREASE VALUE</Text>
        </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
