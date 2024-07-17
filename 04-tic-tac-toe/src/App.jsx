import { useState } from 'react'
import confetti from "canvas-confetti"

import { Board } from './components/Board'
import { TURNS } from './constant'
import { NextTurn } from './components/NexTurn'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'
import { calculateNextMove } from './logic/IA'

import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.x
  })
  const [winner, setWinner] = useState(null) // null not winner, false is tie

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    resetGameStorage()
  }

  const checkWinGame = (newBoard) => {
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      return
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const updateBoard = (index) => {
    // Avoid change square
    if(board[index] || winner) return 

    // Update board
    let newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Check if user win
    checkWinGame(newBoard)

    // IA turn
    const IAPlay = calculateNextMove(newBoard)
    newBoard[IAPlay] = TURNS.o
    setBoard(newBoard)

    // Check IA win
    checkWinGame(newBoard)

    // Set next user turn
    setTurn(TURNS.x)

    // Save game
    saveGameToStorage({
      board: newBoard, 
      turn: TURNS.x
    })
    
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      
      <Board board={board} updateBoard={updateBoard} />

      <NextTurn turn={turn} />

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
