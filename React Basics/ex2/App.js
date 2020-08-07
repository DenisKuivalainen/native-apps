import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';

class App extends React.Component {
  state = {
    rand: [],
  }

  handleClick = () => {
    this.setState({rand: this.state.rand.concat(Math.random())});
  }

  getList() {
    return this.state.rand.map((val, k) => <Text key={k}>{val}</Text>);
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handleClick}>
          <Text>RANDOMIZE</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.getList()}
        </ScrollView>
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
