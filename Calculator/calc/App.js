import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';

export default function App() {
  const [number1, setNumber1] = React.useState('0');
  const [number2, setNumber2] = React.useState('0');
  const [result, setResult] = React.useState('0');

  const buttonPressed = (e,calc) => {
    // In case when we use only algebra, this will work
    setResult(eval(number1 + calc + number2) + '');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput onChangeText={text => setNumber1(text)} placeholder="0" style={{textAlign:'right'}} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput onChangeText={text => setNumber2(text)} placeholder="0" style={{textAlign:'right'}} />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button title="  +  " onPress={(e) => buttonPressed(e,'+')}/>
        <Button title="  -  " onPress={(e) => buttonPressed(e,'-')}/>
        <Button title="  *  " onPress={(e) => buttonPressed(e,'*')}/>
        <Button title="  /  " onPress={(e) => buttonPressed(e,'/')}/>
      </View>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="0" value={result} style={{textAlign:'right'}} editable={false} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculator: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  text: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    padding: 5,
    width:100,
  },
  textInput: {
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 100,
    marginLeft: 5,
  }, 
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 220
  }
});