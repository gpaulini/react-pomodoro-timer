import { HandPalm, Play, ThumbsUp } from 'phosphor-react'
import {
  AbortCountdownButton,
  FinishCountdownButton,
  StartCountdownButton,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

type CountdownButtonProps = {
  onAbortCycle: () => void
  onConfirmFinished: () => void
  canStartCycle: boolean
}

export const CountdownButton = ({
  onAbortCycle,
  onConfirmFinished,
  canStartCycle,
}: CountdownButtonProps) => {
  const { cycleState } = useContext(CyclesContext)

  const { isZeroed } = cycleState
  const isCycleRunning = !!cycleState.activeCycle

  return (
    isZeroed
      ? (
        <FinishCountdownButton
          type="button"
          onClick={onConfirmFinished}
        >
          <ThumbsUp size={24} weight="fill" />
          Finished
        </FinishCountdownButton>)
      : (
          isCycleRunning
            ? (
              <AbortCountdownButton
                type="button"
                onClick={onAbortCycle}
              >
                <HandPalm size={24} weight="fill" />
                Abort
              </AbortCountdownButton>
              )
            : (
              <StartCountdownButton
                type="submit"
                disabled={!canStartCycle}
              >
                <Play size={24} weight="fill" />
                Start
              </StartCountdownButton>
              )
        )
  )
}
