import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { gridData } from './utilities/gridData';
import Title from './components/Title';
import Board from './components/Board';
import Turn from './components/Turn';

const App = () => {

  const [data, setData] = useState(gridData); // 2d array of 6 rows and 7 columns representing the state of the connect4 game board
  const [turn, setTurn] = useState(1); // Integer representing whose turn it is, i.e., player 1, player 2, or AI
  const [disabled, setDisabled] = useState(false); // Boolean to enable or disable the connect4 game board. Board is disabled once the game is over
  const [ai, setAi] = useState(false); // Boolean representing whether the AI is playing or not. If false, it means player 2 is playing

  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <Board 
        data={data}
        setData={setData}
        turn={turn}
        setTurn={setTurn}
        disabled={disabled}
        setDisabled={setDisabled}
        ai={ai}
        setAi={setAi}
      />
      <Turn 
        turn={turn}
        disabled={disabled}
        ai={ai}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default App;