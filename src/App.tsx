import { InformationCircleIcon, RefreshIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  getHadTodayWonFromLocalStorage,
  loadGameStateFromLocalStorage,
  loadInfoStateFromLocalStorage,
  saveGameStateToLocalStorage,
  saveInfoStateToLocalStorage,
  saveTodayWonToLocalStorage,
} from './lib/localStorage'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWonToday] = useState(getHadTodayWonFromLocalStorage)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(() => {
    const loaded = loadInfoStateFromLocalStorage()
    if (loaded?.infoWatched) {
      return false
    }
    return true
  })
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    saveTodayWonToLocalStorage()

    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameWon(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        saveTodayWonToLocalStorage()
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  const closeInfoModal = () => {
    saveInfoStateToLocalStorage({ infoWatched: true })
    setIsInfoModalOpen(false)
  }

  const resetGame = () => {
    setGuesses([])
    setCurrentGuess('')
    setIsGameWon(false)
    setIsGameLost(false)
  }

  const shownNewWordMessage = isGameWonToday || isGameWon || isGameLost

  return (
    <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="Málo písmen" isOpen={isNotEnoughLetters} />
      <Alert message="Slovo nenájdené" isOpen={isWordNotFoundAlertOpen} />
      <Alert message={`Prehrali ste. Skúste opäť.`} isOpen={isGameLost} />
      <Alert
        message="Hra skopírovaná do clipboardu"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-4">
        <h1 className="text-xl grow font-bold">Wordle SK</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <RefreshIcon
          className="h-6 w-6 ml-2 cursor-pointer"
          onClick={resetGame}
        />
      </div>
      {shownNewWordMessage && (
        <p className="text-sm text-gray-500 text-center mb-4">
          Nové slovo na hádanie je dostupné zajtra.
        </p>
      )}
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />
      <InfoModal isOpen={isInfoModalOpen} handleClose={closeInfoModal} />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <button
        type="button"
        className="mx-auto mt-6 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        O hre
      </button>
    </div>
  )
}

export default App
