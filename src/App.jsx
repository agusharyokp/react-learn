
import { useState } from "react"

import Players from "./components/Players"
import GameBoard from "./components/GameBoard"
import Logs from "./components/Logs"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver"

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState([
    {name: 'Player 1', symbol: 'X', isActive: true},
    {name: 'Player 2', symbol: 'O', isActive: false},
  ])


  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])]
  for (const turn of gameTurns) {
      const {square, player} = turn
      const {row, col} = square
      gameBoard[row][col] = player
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns)

      const updatedGameTurns = [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        },
        ...prevGameTurns,
      ]

      return updatedGameTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(playerName, symbol) {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.symbol === symbol) {
          return {...player, name: playerName}
        }
        return player
      })
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Players initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
      </div>

      {(winner || hasDraw) && (
        <GameOver winner={winner} onRestart={handleRestart}/>
      )}
      <Logs turns={gameTurns}/>
    </main>
  )
}

export default App
