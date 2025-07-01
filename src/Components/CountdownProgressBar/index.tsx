import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { CountdownProgressBarContainer } from './style'

export const CountdownProgressBar = () => {
  const { cycleState } = useContext(CyclesContext)

  const { activeCycle, pastSeconds } = cycleState

  const totalTimeInSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0
  const value = 100 - (pastSeconds / totalTimeInSeconds * 100)
  const halfTimeLeft = value < 50
  const littleTimeLeft = value < 25
  const classNameTimeLeft = 
    (littleTimeLeft && 'little-time-left') //this must come first
    || (halfTimeLeft && 'half-time-left')
    || ''

  return (
    activeCycle &&
      <CountdownProgressBarContainer
        style={{ width: value + '%' }}
        className={classNameTimeLeft}
      />
  )
}
