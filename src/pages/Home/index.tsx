import { useContext } from 'react'
import { FormProvider, useForm, type SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer } from './styles'
import { CountdownInput } from './components/CountdownInput'
import { CountdownDisplay } from './components/CountdownDisplay'
import { CountdownButton } from './components/CountdownButton'
import type { Cycle } from '../../@types/cycle'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Name your task'),
  minutesAmount: zod.coerce.number().min(1, 'min 1').max(60, 'max 60'),
})

// extracts the infered type of the schema
type CycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  const {
    cycles,
    setCycles,
    cycleState,
    cycleDispatch,
    originalDocTitle,
    getDisplayTimeFromSecondsRemaining,
  } = useContext(CyclesContext)

  const activeCycle = cycleState.activeCycle

  const newCycleForm =
      useForm<CycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
          task: `Task#${cycles.length + 1}`,
          minutesAmount: 1,
        },
      })

  const { handleSubmit, watch, reset } = newCycleForm

  const canStartCycle = !!watch('task')

  const handleInvalidSubmit: SubmitErrorHandler<CycleFormData> =
    (errors) => {
      console.log('form submit is invalid')
      console.log(errors)
    }

  const handleStartCycle = (data: CycleFormData) => {
    const newCycle: Cycle | undefined = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      status: 'pending',
    }

    cycleDispatch({
      type: 'start',
      payload: {
        cycle: newCycle
      }
    })

    setCycles(cycles => {
      const updated = [...cycles, newCycle]
      return updated
    })

    const displayTime =
      getDisplayTimeFromSecondsRemaining(data.minutesAmount * 60)
    const { min, sec } = displayTime
    document.title = `${min}:${sec} ${data.task}`
  }

  const handleAbortCycle = () => {
    cycleDispatch({
      type: 'abort'
    })

    setCycles(cycles => {
      const updated: Cycle[] = cycles.map(cyc => {
        return cyc.id === activeCycle!.id
          ? { ...cyc, status: 'aborted' }
          : cyc
      })

      return updated
    })
    document.title = originalDocTitle
    reset()
  }

  const handleConfirmFinished = () => {
    cycleDispatch({ type: 'confirm_finished' })
    document.title = originalDocTitle
    reset()
  }

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(handleStartCycle, handleInvalidSubmit)}
        action=""
      >
        <FormProvider {...newCycleForm}>
          <CountdownInput />
        </FormProvider>

        <CountdownDisplay />

        <CountdownButton
          onAbortCycle={handleAbortCycle}
          onConfirmFinished={handleConfirmFinished}
          canStartCycle={canStartCycle}
        />
      </form>
    </HomeContainer>
  )
}
