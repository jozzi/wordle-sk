import { WORDS } from '../constants/wordlist'


// allow free guesses to make game easier in slovak version
export const isWordInWordList = (word: string) => {
  return true;
}

export const isWinningWord = (word: string) => {
  return solution === word;
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);

  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
  }
}

export const { solution, solutionIndex } = getWordOfDay();
