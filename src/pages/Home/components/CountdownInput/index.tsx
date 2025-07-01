import { InputContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const CountdownInput = () => {
  const { register, getValues } = useFormContext()
  const { cycleState } = useContext(CyclesContext)

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
        {...register('task')}
      />

      <datalist id="taskSuggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

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
