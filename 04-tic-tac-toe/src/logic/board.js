import { WINNER_COMBOS } from "../constant"

export const checkWinnerFrom = (boardToCheck) => {
    // check all win combinations
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // if not winner
    return null
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
}