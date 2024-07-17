import { checkWinnerFrom } from "./board"
import { TURNS } from "../constant"

export const calculateNextMove = (currentBoard) => {
    // Prior move to win
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        const newBoard = [...currentBoard]
        newBoard[i] = TURNS.o
        if (checkWinnerFrom(newBoard) === TURNS.o) {
          return i
        }
      }
    }

    // Prior move to avoid user win
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        const newBoard = [...currentBoard]
        newBoard[i] = TURNS.x
        if (checkWinnerFrom(newBoard) === TURNS.x) {
          return i
        }
      }
    }
  
    // Random empty box
    const emptyIndexes = currentBoard.reduce((acc, square, index) => {
      if (!square) acc.push(index)
      return acc
    }, [])
  
    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
  }