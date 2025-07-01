import type { Dispatch } from 'react'

export type CycleStatus = 'pending' | 'aborted' | 'finished'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  status: CycleStatus
}

export type CycleState = {
  activeCycle: Cycle | null
  totalTimeInSeconds: number
  isZeroed: boolean
  pastSeconds: number
}

export type CycleAction =
  | { type: 'start'; payload: { cycle: Cycle } }
  | { type: 'countdown' }
  | { type: 'abort' }
  | { type: 'finish' }
  | { type: 'confirm_finished' }

export type CycleDispatch = Dispatch<CycleAction>
