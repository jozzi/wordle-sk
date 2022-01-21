import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Ľ" onClick={onClick} status={charStatuses['Ľ']} />
        <Key value="Š" onClick={onClick} status={charStatuses['Š']} />
        <Key value="Č" onClick={onClick} status={charStatuses['Č']} />
        <Key value="Ť" onClick={onClick} status={charStatuses['Ť']} />
        <Key value="Ž" onClick={onClick} status={charStatuses['Ž']} />
        <Key value="Ď" onClick={onClick} status={charStatuses['Ď']} />
        <Key value="Ý" onClick={onClick} status={charStatuses['Ý']} />
        <Key value="Á" onClick={onClick} status={charStatuses['Á']} />
        <Key value="Í" onClick={onClick} status={charStatuses['Í']} />
        <Key value="É" onClick={onClick} status={charStatuses['É']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses['Q']} />
        <Key value="W" onClick={onClick} status={charStatuses['W']} />
        <Key value="E" onClick={onClick} status={charStatuses['E']} />
        <Key value="R" onClick={onClick} status={charStatuses['R']} />
        <Key value="T" onClick={onClick} status={charStatuses['T']} />
        <Key value="Z" onClick={onClick} status={charStatuses['Z']} />
        <Key value="U" onClick={onClick} status={charStatuses['U']} />
        <Key value="I" onClick={onClick} status={charStatuses['I']} />
        <Key value="O" onClick={onClick} status={charStatuses['O']} />
        <Key value="P" onClick={onClick} status={charStatuses['P']} />
        <Key value="Ú" onClick={onClick} status={charStatuses['Ú']} />
        <Key value="Ä" onClick={onClick} status={charStatuses['Ä']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses['A']} />
        <Key value="S" onClick={onClick} status={charStatuses['S']} />
        <Key value="D" onClick={onClick} status={charStatuses['D']} />
        <Key value="F" onClick={onClick} status={charStatuses['F']} />
        <Key value="G" onClick={onClick} status={charStatuses['G']} />
        <Key value="H" onClick={onClick} status={charStatuses['H']} />
        <Key value="J" onClick={onClick} status={charStatuses['J']} />
        <Key value="K" onClick={onClick} status={charStatuses['K']} />
        <Key value="L" onClick={onClick} status={charStatuses['L']} />
        <Key value="Ô" onClick={onClick} status={charStatuses['Ô']} />
        <Key value="Ň" onClick={onClick} status={charStatuses['Ň']} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        <Key value="Y" onClick={onClick} status={charStatuses['Y']} />
        <Key value="X" onClick={onClick} status={charStatuses['X']} />
        <Key value="C" onClick={onClick} status={charStatuses['C']} />
        <Key value="V" onClick={onClick} status={charStatuses['V']} />
        <Key value="B" onClick={onClick} status={charStatuses['B']} />
        <Key value="N" onClick={onClick} status={charStatuses['N']} />
        <Key value="M" onClick={onClick} status={charStatuses['M']} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </Key>
      </div>
    </div>
  )
}
