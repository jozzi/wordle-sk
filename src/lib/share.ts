import { GameStats } from './localStorage'
import { getGuessStatuses } from './statuses'

export const shareStatus = (guesses: string[]) => {
  navigator.clipboard.writeText(
    'Wordle SK - Slovo dňa ' +
    ' ' +
    guesses.length +
    '/6\n\n' +
    generateEmojiGrid(guesses)
  )
}

const generateChart = (gameStats: GameStats) => {
  const { totalGames, successRate, currentStreak, bestStreak, winDistribution } = gameStats;

  const header = `Počet hier: ${totalGames}
Úspešnosť: ${successRate}%
Výhier v rade: ${currentStreak}
Najdlhšia výherná séria: ${bestStreak}`;

  const histogram = winDistribution.map((value, index) => {
    return `${index + 1}: ${new Array(value).fill('🟩').join('')} (${value}) `;
  });

  return header +
    '\n\n' +
    'Pokusy \n' +
    histogram.join('\n');
}

export const shareStats = (gameStats: GameStats) => {
  navigator.clipboard.writeText(
    'Wordle SK - Slovo dňa \n\n' +
    'Úspešnosť \n' +
    generateChart(gameStats)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n');
}
