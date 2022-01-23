const infoStateKey = 'infoState'

type StoredInfoState = {
  infoWatched: boolean
}

export const saveInfoStateToLocalStorage = (infoState: StoredInfoState) => {
  localStorage.setItem(infoStateKey, JSON.stringify(infoState))
}

export const loadInfoStateFromLocalStorage = () => {
  const state = localStorage.getItem(infoStateKey)
  return state ? (JSON.parse(state) as StoredInfoState) : null
}

const todayWonState = 'todayWonState'


const getDate = () => {
  const d = new Date()

  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export const saveTodayWonToLocalStorage = () => {
  const today = getDate()
  localStorage.setItem(todayWonState, JSON.stringify({ [today]: true }))
}

export const getHadTodayWonFromLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem(todayWonState) || '{}') as Record<string, boolean>
  return !!state[getDate()]
}

const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'



export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}
