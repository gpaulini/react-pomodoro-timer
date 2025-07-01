import { useContext } from 'react'
import { CountdownContainer, CountdownSeparator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const CountdownDisplay = () => {
  const {
    cycleState,
    getDisplayTimeFromSecondsRemaining,
  } = useContext(CyclesContext)

  const { activeCycle } = cycleState

  const totalTimeInSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0

  const secondsRemaining = activeCycle
    ? totalTimeInSeconds - cycleState.pastSeconds
    : 0

  const displayTime = getDisplayTimeFromSecondsRemaining(secondsRemaining)

  return (
    <CountdownContainer>
      <span>{displayTime.min[0]}</span>
      <span>{displayTime.min[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{displayTime.sec[0]}</span>
      <span>{displayTime.sec[1]}</span>
    </CountdownContainer>
  )
}
