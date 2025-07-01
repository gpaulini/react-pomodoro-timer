import { InputContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const CountdownInput = () => {
  const { register, getValues } = useFormContext()
  const { cycleState, cycles } = useContext(CyclesContext)

  const isCycleRunning = !!cycleState.activeCycle
  return (
    <InputContainer>
      <label htmlFor="inputTask">Working on</label>
      <TaskInput
        type="text"
        id="inputTask"
        placeholder="Name your task"
        list="taskSuggestions"
        readOnly={isCycleRunning}
        autoComplete='off'
        {...register('task')}
      />

      {
        cycles.length
        ? <datalist id="taskSuggestions">
          {cycles.map(cyc => {
            return <option value={cyc.task}></option>
          })}
        </datalist>
        : ''
      }

      <label htmlFor="inputMinutesAmount">during</label>
      <MinutesAmountInput
        type="number"
        id="inputMinutesAmount"
        placeholder="1"
        min={1}
        max={60}
        readOnly={isCycleRunning}
        {...register('minutesAmount')}
      />

      <span>minute{getValues().minutesAmount !== 1 && 's'}.
      </span>

    </InputContainer>
  )
}
