import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Turn = ({ turn, disabled, ai }) => {

  /*
    Props
    turn => Integer representing whose turn it is, i.e., player 1, player 2, or AI
    disabled => Boolean to enable or disable the connect4 game board. Board is disabled once the game is over
    ai => Boolean representing whether the AI is playing or not. If false, it means player 2 is playing
  */

  // Write Task 4 code below this line
  const renderTurnInfo = () => {
    if(disabled) {
      if(turn == 0) {
        return <Text style={styles.turn}>It is a draw!</Text>;
      }
      else {
        if(ai) {
          if(turn == 1){
            return(
              <>
                <Text style={styles.turn}>Player {turn}</Text>
                <View style={[styles.turnDisc, {marginRight:wp(3)}]}></View>
                <Text style={styles.turn}>won!</Text>
              </>
            );
          }
          else{
            return(
              <>
                <Text style={styles.turn}>AI {turn}</Text>
                <View style={[styles.turnDisc, {backgroundColor:'#b11d22', marginRight:wp(3)}]}></View>
                <Text style={styles.turn}>won!</Text>
              </>
            );
          }
        }
        else{
          return(
            <>
             <Text style={styles.turn}>Player {turn} </Text>
              {turn == 1 ? (
                <View style={styles.turnDisc}></View>
              ) : (
                <View style={[styles.turnDisc, { backgroundColor: '#b11d22' }]}></View>
              )}
              <Text style={styles.turn}>won!</Text>
            </>
          );
        }
      }
    }
    else{
      eturn (
        <>
          <Text style={styles.turn}>
            {/* if ai is enabled and turn is 2, we display ai turn. otherwise we display player turn */}
            {ai && turn == 2 ? 'Turn: AI ' : `Turn: Player ${turn} `}
          </Text>
          {/* we render disc colors based on the turn value */}
          {turn == 1 ? (
            <View style={styles.turnDisc}></View>
          ) : (
            <View style={[styles.turnDisc, { backgroundColor: '#b11d22' }]}></View>
          )}
        </>
      );
    }
  };
  return (
    <View style={styles.infoView}>
      { renderTurnInfo() }
      </View>
  );
};

const styles = StyleSheet.create({
  infoView: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: wp(6),
  },
  turn: {
    color: 'black',
    fontSize: wp(12),
    fontFamily: 'notoserif',
    fontWeight: '300',
  },
  turnDisc: {
    width: wp(12),
    height: hp(6),
    borderRadius: wp(15),
    backgroundColor: '#ccb002',
    marginTop: wp(2.5),
    marginRight: wp(5)
  },
});

export default Turn;