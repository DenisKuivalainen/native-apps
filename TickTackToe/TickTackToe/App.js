import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) { return;}
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    let resch = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i]!==null) {resch++;}
      if (resch === 9 && calculateWinner(squares)===null) 
        {window.location.reload()}
      if (i===squares.length-1) {resch = 0;}
    }    
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    })
  }


  renderSquare(i) {
    return (
      <Button onPress={() => this.handleClick(i)} title={this.state.squares[i] === null ? '  ' : this.state.squares[i]} />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = winner + ' wins!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return(
      <View style={styles.container}>
        <Text style={styles.topic}>{status}</Text>

        <View style={styles.buttonRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.buttonRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.buttonRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      <Button onPress={() => this.reset()} title="Reset" />
      </View>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    justifyContent: 'space-around',
    width: 160,
  },
});