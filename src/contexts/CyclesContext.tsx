import
React,
{
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { CycleState, CycleDispatch, Cycle } from '../@types/cycle'
import { cycleReducer } from '../reducers/cycleReducer'
import alarmSound from '../assets/alarm.mp3'

type CyclesContextType = {
  cycles: Cycle[]
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
  cycleState: CycleState
  cycleDispatch: CycleDispatch
  originalDocTitle: string
  getDisplayTimeFromSecondsRemaining:
    (sr: number) => { min: string, sec: string },
  localStorageKeys: object
}

interface CyclesContextProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: CyclesContextProps) => {
  const localStorageKeys = {
    cycles: '@pomodoro-timer:cycles:v1.0.0',
    cycleState: '@pomodoro-timer:cycle-state:v1.0.0'
  }

  const [cycles, setCycles] = useState<Cycle[]>(() => {
    const stored = localStorage.getItem(localStorageKeys.cycles)
    return stored ? JSON.parse(stored) : []
  })

  const [cycleState, cycleDispatch] = useReducer(
    cycleReducer, 
    {
      activeCycle: null,
      totalTimeInSeconds: 0,
      isZeroed: false,
      pastSeconds: 0,
    },
    (initialState) => {
      const stored = localStorage.getItem(localStorageKeys.cycleState)
      return stored ? JSON.parse(stored) : initialState
    }
  )

  const originalDocTitle = useRef(document.title).current

  const [alarm] = useState(new Audio(alarmSound))

  const { activeCycle, totalTimeInSeconds, pastSeconds, isZeroed } = cycleState

  const getDisplayTimeFromSecondsRemaining =
    useCallback((secondsRemaining: number) => {
      return {
        min:
          String(Math.floor(Math.abs(secondsRemaining / 60))).padStart(2, '0'),
        sec:
          String(Math.abs(secondsRemaining % 60)).padStart(2, '0'),
      }
      // eg.: {min: 08, sec: 59}
    }, [])

  // LocalStorage
  useEffect(() => {
    localStorage.setItem(localStorageKeys.cycles, JSON.stringify(cycles))
    localStorage.setItem(localStorageKeys.cycleState, JSON.stringify(cycleState))
  }, [cycles, cycleState])
  // end LS


  // countdowning
  useEffect(() => {
    let timeoutId: number
    if (activeCycle) {
      timeoutId = setTimeout(() => {
        const secondsRemaining = totalTimeInSeconds - pastSeconds - 1
        const displayTime = getDisplayTimeFromSecondsRemaining(secondsRemaining)
        const { min, sec } = displayTime
        document.title = `${min}:${sec} ${activeCycle.task || ''}`

        cycleDispatch({
          type: 'countdown'
        })

        if (pastSeconds >= totalTimeInSeconds) {
          cycleDispatch({
            type: 'finish'
          })

          setCycles(cycles => {
            const updated: Cycle[] = cycles.map(cyc => {
              return cyc.id === activeCycle!.id
                ? { ...cyc, status: 'finished' }
                : cyc
            })

            return updated
          })
        }
      }, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [
    activeCycle,
    totalTimeInSeconds,
    pastSeconds,
    getDisplayTimeFromSecondsRemaining,
  ])

  //alarm on finished
  useEffect(() => {
    isZeroed ? alarm.play() : alarm.pause()
  }, [isZeroed])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        setCycles,
        cycleState,
        cycleDispatch,
        originalDocTitle,
        getDisplayTimeFromSecondsRemaining,
        localStorageKeys
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
