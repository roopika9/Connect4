import React, { useEffect } from 'react';
import { 
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Switch,
  StyleSheet
} from 'react-native';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Board = ({ data, setData, turn, setTurn, disabled, setDisabled, ai, setAi }) => {

  /*
    Props
    data => 2D array of 6 rows and 7 columns representing the state of the Connect 4 game board
    setData => Method to update the data prop
    turn => Integer representing whose turn it is, i.e., player 1, player 2, or AI
    setTurn => Method to update the turn prop
    disabled => Boolean to enable or disable the Connect 4 game board. The board is disabled once the game is over
    setDisabled => Method to update the disabled prop
    ai => Boolean representing whether the AI is playing or not. If false, it means player 2 is playing
    setAi => Method to update the ai prop
  */

  useEffect(() => {
    // Write Task 11 code below this line
    if (ai == true && turn == 2) {
      const timer = setTimeout(() => {
        aiTurn();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [turn]);

  /*
    Parameters
    board => 2D array of 6 rows and 7 columns representing the Connect 4 game board
  */
  const checkAvailableColumns = (board) => {
    // Write Task 5 code below this line
    let availableColumns = [];
    for (let column = 0; column <= 6; column++) {
      for (let row = 5; row >= 0; row--) {
        if (board[row][column] == null) {
          availableColumns.push(column);
          break;
        }
      }
    }
    return availableColumns;
  }

  /*
    Parameters
    column => Integer between 0 and 6 (inclusive) representing the column index of the Connect 4 game board
    board => 2d array of 6 rows and 7 columns representing the Connect 4 game board
  */
  const getEmptyRow = (column, board) => {
    // Write Task 5 code below this line
    let row = 5;
    while (row >= 0) {
      if (board[row][column] == null)
        return row;
      row = row - 1;
    }
  }

  /*
    Parameters
    emptyRow => Integer representing row index having a value of null where the disc can be placed
    column => Integer between 0 and 6 (inclusive) representing the column index of the Connect 4 game board
    player => Integer representing 1 for player 1 and 2 for player 2 or AI
  */
  const placeDisc = (emptyRow, column, player) => {
    // Write Task 5 code below this line
    let dataCopy = [...data];
    dataCopy[emptyRow][column] = player;
    setData(dataCopy);
  }

  /*
    Parameters
    board => 2D array of 6 rows and 7 columns representing the Connect 4 game board.
    player => Integer representing 1 for player 1 and 2 for player 2 or AI
  */
  const checkWin = (board, player) => {
    // Write Task 6 code below this line
    for (let row = 0; row <= 5; row++) {
      for (let column = 0; column <= 6; column++) {
        // horizontal win
        if (column <= 3 && board[row][column] === player && board[row][column + 1] === player && board[row][column + 2] === player && board[row][column + 3] === player) {
          return true;
        }
        // vertical win
        if (row <= 2 && board[row][column] === player && board[row + 1][column] === player && board[row + 2][column] === player && board[row + 3][column] === player) {
          return true;
        }
        // positive diagonals win
        if (row >= 3 && column <= 3 && board[row][column] === player && board[row - 1][column + 1] === player && board[row - 2][column + 2] === player && board[row - 3][column + 3] === player) {
          return true;
        }
        // negative diagonals win
        if (row >= 3 && column >= 3 && board[row][column] === player && board[row - 1][column - 1] === player && board[row - 2][column - 2] === player && board[row - 3][column - 3] === player) {
          return true;
        }
      }
    }
    return false;
  }

  /*
    Parameters
    column => Integer between 0 and 6 (inclusive) representing the column index of the Connect 4 game board
  */
  const takeTurn = (column) => {
    // Write Task 7 code below this line
    const availableColumns = checkAvailableColumns(data);
    if (!availableColumns.includes(column)) {
      window.alert("This column is full! Select another one.");
      return;
    }
    const emptyRow = getEmptyRow(column, data);
    placeDisc(emptyRow, column, turn);
    if (checkWin(data, turn) == true) {
      setDisabled(true);
      return;
    }
    if (checkAvailableColumns(data).length == 0) {
      setTurn(0);
      setDisabled(true);
      return;
    }
    turn == 1? setTurn(2) : setTurn(1);
  }

  const restartGame = () => {
    // Write Task 8 code below this line
    const newData = Array(6).fill(null).map(() => Array(7).fill(null));
    setData(newData);
    setTurn(1);
    setDisabled(false);
  }

  /*
    Parameters
    window => An array of length 4 whose indices can have one of the following values: 1, 2, and null
  */
  const getWindowScore = (window) => {
    // Write Task 9 code below this line
    const humanPiece = 1;
    const aiPiece = 2;
    let score = 0;
    if ((window.filter(p => p == aiPiece).length == 3) && (window.filter(p => p == null).length == 1)) {
      score = score + 5;
    }
    else if ((window.filter(p => p == aiPiece).length == 2) && (window.filter(p => p == null).length == 2)) {
      score = score + 2;
    }
    if ((window.filter(p => p == humanPiece).length == 3) && (window.filter(p => p == null).length == 1)) {
      score = score - 4;
    }
    return score;
  }

  /*
    Parameters
    board => 2d array of 6 rows and 7 columns representing the Connect 4 game board
  */
  const evaluate = (board) => {
    // Write Task 9 code below this line
    const aiPiece = 2;
    let score = 0;
    // Center column score check
    const centerColumn = 3;
    let centerAiPieces = 0;
    for (let row = 0; row <= 5; row++) {
      if (board[row][centerColumn] == aiPiece)
        centerAiPieces++;
    }
    score += (centerAiPieces * 3);
    for (let row = 0; row <= 5; row++) {
      for (let column = 0; column <= 6; column++) {
        // Horizontal score check
        if (column <= 3) {
          const horizontalWindow = [board[row][column], board[row][column+1], board[row][column+2], board[row][column+3]];
          score += getWindowScore(horizontalWindow);
        }
        // Vertical score check
        if (row <= 2) {
          const verticalWindow = [board[row][column], board[row+1][column], board[row+2][column], board[row+3][column]];
          score += getWindowScore(verticalWindow);
        }
        // Positive diagonals score check
        if (row >= 3 && column <= 3) {
          const diagonalWindow = [board[row][column], board[row-1][column+1], board[row-2][column+2], board[row-3][column+3]];
          score += getWindowScore(diagonalWindow);
        }
        // Negative diagonals score check
        if (row >= 3 && column >= 3) {
          const diagonalWindow = [board[row][column], board[row-1][column-1], board[row-2][column-2], board[row-3][column-3]];
          score += getWindowScore(diagonalWindow);
        }
      }
    }
    return score;
  }

  /*
    Parameters
    board => 2d array of 6 rows and 7 columns representing the Connect 4 game board
    depth => Integer representing the recursion depth. Can have values 1 and greater than 1
    maximizingPlayer => Boolean value representing whether the player is maximizing or not
  */
  const minimax = (board, depth, maximizingPlayer) => {
    // Write Task 10 code below this line
    const humanPiece = 1;
    const aiPiece = 2;
    const availableColumns = checkAvailableColumns(board);
    // base recursion case. Stop if depth is 0, AI wins, human wins, or it is a draw
    if (depth == 0 || checkWin(board, aiPiece) || checkWin(board, humanPiece) || availableColumns.length == 0) {
      if (checkWin(board, aiPiece)) {
        return { score: 10000 - depth, column: null };
      }
      else if (checkWin(board, humanPiece)) {
        return { score: -10000 + depth, column: null };
      }
      else if (checkAvailableColumns(board).length == 0) {
        return { score: 0, column: null };
      }
      else {
        return evaluate(board); // how close is AI to winning or losing and return points accordingly
      }
    }
    // maximizing player
    if (maximizingPlayer) {
      let bestScore = -Infinity;
      let bestColumn = Math.floor(Math.random() * board.length);
      for (const column of availableColumns) {
        const emptyRow = getEmptyRow(column, board);
        let boardCopy = board.map(row => row.slice());
        boardCopy[emptyRow][column] = aiPiece;
        let currentScore = minimax(boardCopy, depth - 1, false).score;
        if (currentScore > bestScore) {
          bestScore = currentScore;
          bestColumn = column;
        }
      }
      return { score: bestScore, column: bestColumn };
    }
    // minimizing player
    else {
      let bestScore = Infinity;
      let bestColumn = Math.floor(Math.random() * board.length);
      for (const column of availableColumns) {
        const emptyRow = getEmptyRow(column, board);
        let boardCopy = board.map(row => row.slice());
        boardCopy[emptyRow][column] = humanPiece;
        let currentScore = minimax(boardCopy, depth - 1, true).score;
        if (currentScore < bestScore) {
          bestScore = currentScore;
          bestColumn = column;
        }
      }
      return { score: bestScore, column: bestColumn };
    }
  }

  const aiTurn = () => {
    // Write Task 11 code below this line
    let dataCopy = data.map(row => row.slice());
    const bestMove = minimax(dataCopy, 4, true).column;
    const emptyRow = getEmptyRow(bestMove, data);
    placeDisc(emptyRow, bestMove, turn);
    if (checkWin(data, turn) == true) {
      setDisabled(true);
      return;
    }
    if (checkAvailableColumns(data).length == 0) {
      setTurn(0);
      setDisabled(true);
      return;
    }
    setTurn(1);
  }

  const Disc = ({ value, columnIndex, disabled, onDiscPress }) => {
    let discStyle = styles.disc;
    if (value == 1) {
        discStyle = [styles.disc, { backgroundColor: '#ccb002' }];
    } else if (value == 2) {
        discStyle = [styles.disc, { backgroundColor: '#b11d22' }];
    }
    return (
        <TouchableWithoutFeedback disabled={disabled} onPress={() => onDiscPress(columnIndex)}>
          <View style={discStyle}></View>
        </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
        {item.map((value, columnIndex) => (
            <Disc key={columnIndex} value={value} columnIndex={columnIndex} disabled={disabled} onDiscPress={takeTurn} />
        ))}
    </View>
  );

  // Write Task 3 code below this line

  return (
    <View style={styles.boardView}>
      <View style={styles.board}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: wp(6), marginBottom: wp(6)}}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => restartGame()}
        >
          <View style={styles.button}>
              <Text style={styles.buttonText}> Restart </Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.aiText}> AI: </Text>
        <Switch
          style={styles.switch}
          value={ ai }
          trackColor={{ true: "red", false: "gray" }}
          thumbColor={ ai ? "blue" : "white" }
          onValueChange={() => {
            setAi(!ai)
            if (!ai) {
              restartGame();
              window.alert('AI enabled! Game restarted. Now AI will play as the opponent.');
            } 
            else {
              restartGame();
              window.alert('AI disabled! Game restarted. Now the human will play as the opponent.');
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardView: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: wp(90),
    height: hp(38.6),
    backgroundColor: "#1b2f78",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  disc: {
    width: wp(12),
    height: hp(6),
    borderRadius: wp(15),
    backgroundColor: 'white',
    margin: wp(0.4)
  },
  button: {
    width: wp(25),
    height: hp(5),
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#0164fe",
    borderRadius: wp(3),
    marginTop: wp(7)
  },
  buttonText: {
    color: 'white',
    fontSize: wp(5.2),
    fontFamily: 'notoserif',
    fontWeight: '300',
  },
  aiText: {
    color: 'black',
    fontSize: wp(8),
    fontFamily: 'notoserif',
    paddingTop: wp(5.8),
    paddingLeft: wp(5),
    marginLeft: wp(3),
  },
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    marginLeft: wp(5),
    marginTop: wp(6.7)
  },
});

export default Board;