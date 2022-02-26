import {
  InformationCircleIcon,
  CogIcon,
  ChartBarIcon,
} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { Alert } from './components/alerts/Alert';
import { Grid } from './components/grid/Grid';
import { Keyboard } from './components/keyboard/Keyboard';
import { AboutModal } from './components/modals/AboutModal';
import { InfoModal } from './components/modals/InfoModal';
import { WinModal } from './components/modals/WinModal';
import { isWordInWordList, isWinningWord, solution } from './lib/words';
import { addStatsForCompletedGame, loadStats } from './lib/stats';
import {
  loadGameStateFromLocalStorage,
  loadInfoStateFromLocalStorage,
  loadSettingsFromLocalStorage,
  saveGameStateToLocalStorage,
  saveInfoStateToLocalStorage,
  saveSettingsToLocalStorage,
} from './lib/localStorage';
import { LostModal } from './components/modals/LostModal';
import { SettingsModal } from './components/modals/SettingsModal';
import './App.css';
import { StatsModal } from './components/modals/StatsModal';
import { UpdateChecker } from './components/utils/UpdateChecker';
import { HelpModal } from './components/modals/HelpModal';

function App() {
  const [useQwerty, setUseQwerty] = useState(() => {
    const settings = loadSettingsFromLocalStorage();
    return settings?.useQwerty ?? false;
  });
  const [useDarkMode, setUseDarkMode] = useState(() => {
    const settings = loadSettingsFromLocalStorage();
    const systemDark =
      window.matchMedia('(prefers-color-scheme: dark)').matches || false;

    return settings?.useDarkMode ?? systemDark;
  });
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isHelpUkraineModalOpen, setHelpUkraineModalOpen] = useState(false);
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();

    if (loaded?.solution !== solution) {
      return [];
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameWon(true);
    } else if (loaded.guesses.length === 6) {
      setIsGameLost(true);
    }

    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  useEffect(() => {
    if (isGameLost) {
      setIsLostModalOpen(true);
    }
  }, [isGameLost]);

  useEffect(() => {
    const loaded = loadInfoStateFromLocalStorage();

    const helpWatched = loaded?.helpInfoWatched;
    const infoWatched = loaded?.infoWatched;

    if (!helpWatched) {
      setHelpUkraineModalOpen(true);
    } else if (!infoWatched && isHelpUkraineModalOpen === false) {
      setIsInfoModalOpen(true);
    }
  }, [isHelpUkraineModalOpen]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true);
      return setTimeout(() => {
        setIsNotEnoughLetters(false);
      }, 2000);
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length));
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        return setIsGameLost(true);
      }
    }
  };

  const closeInfoModal = () => {
    saveInfoStateToLocalStorage({ infoWatched: true, helpInfoWatched: true });
    setIsInfoModalOpen(false);
  };

  const closeHelpUkraineModal = () => {
    const loaded = loadInfoStateFromLocalStorage();

    saveInfoStateToLocalStorage({
      infoWatched: !!loaded?.infoWatched,
      helpInfoWatched: true,
    });

    setHelpUkraineModalOpen(false);
  };

  const resetGame = () => {
    setIsLostModalOpen(false);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameWon(false);
    setIsGameLost(false);
  };

  const shownNewWordMessage = isGameWon || isGameLost;

  return (
    <>
      <UpdateChecker />
      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 dark:bg-black dark:text-gray-200">
        <Alert message="Málo písmen" isOpen={isNotEnoughLetters} />
        <Alert message="Slovo nenájdené" isOpen={isWordNotFoundAlertOpen} />
        <Alert
          message="Hra skopírovaná do clipboardu"
          isOpen={shareComplete}
          variant="success"
        />
        <div className="flex w-80 mx-auto items-center mb-4">
          <h1 className="text-xl grow font-bold">Wordle SK - Slovo dňa</h1>
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 ml-2 cursor-pointer"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
        {shownNewWordMessage && (
          <p className="text-sm text-gray-500 dark:text-white text-center mb-4">
            Nové slovo na hádanie bude dostupné zajtra.
          </p>
        )}
        <Grid guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          guesses={guesses}
          useQwerty={useQwerty}
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
        />
        <LostModal
          isOpen={isLostModalOpen}
          guesses={guesses}
          handleClose={() => setIsLostModalOpen(false)}
          handleShare={() => {
            setIsLostModalOpen(false);
            setShareComplete(true);
            return setTimeout(() => {
              setShareComplete(false);
            }, 2000);
          }}
          handleRetry={resetGame}
        />
        <WinModal
          isOpen={isWinModalOpen}
          handleClose={() => setIsWinModalOpen(false)}
          guesses={guesses}
          handleShare={() => {
            setIsWinModalOpen(false);
            setShareComplete(true);
            return setTimeout(() => {
              setShareComplete(false);
            }, 2000);
          }}
        />
        <InfoModal isOpen={isInfoModalOpen} handleClose={closeInfoModal} />
        <HelpModal
          isOpen={isHelpUkraineModalOpen}
          handleClose={closeHelpUkraineModal}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          gameStats={stats}
          handleClose={() => setIsStatsModalOpen(false)}
          handleShare={() => {
            setIsStatsModalOpen(false);
            setShareComplete(true);
            return setTimeout(() => {
              setShareComplete(false);
            }, 2000);
          }}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          useQwerty={useQwerty}
          useDarkMode={useDarkMode}
          handleClose={() => setIsSettingsModalOpen(false)}
          handleQwertyChange={() =>
            setUseQwerty((value) => {
              const newValue = !value;
              saveSettingsToLocalStorage({ useQwerty: newValue, useDarkMode });
              return newValue;
            })
          }
          handleDarkModeChange={() =>
            setUseDarkMode((value) => {
              const newValue = !value;
              if (newValue) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              saveSettingsToLocalStorage({ useDarkMode: newValue, useQwerty });
              return newValue;
            })
          }
        />
        <button
          type="button"
          className="mx-auto mt-6 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
          onClick={() => setHelpUkraineModalOpen(true)}
          style={{
            textShadow: '0 0 1px black',
            backgroundImage:
              'linear-gradient(180deg, #005bbb 0%, #005bbb 50%, #ffd500 50%, #ffd500 100%)',
            borderTop: '1px solid #005bbb',
            borderBottom: '1px solid #ffd500',
          }}
        >
          Pomôžme Ukrajine
        </button>
      </div>
    </>
  );
}

export default App;
