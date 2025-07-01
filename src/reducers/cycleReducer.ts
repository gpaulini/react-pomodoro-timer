import { differenceInSeconds } from 'date-fns'
import React from 'react'
import type { CycleAction, CycleState } from '../@types/cycle'

export const cycleReducer: React.Reducer<CycleState, CycleAction> =
  (state, action) => {
    switch (action.type) {
      case 'start': {
        const newCycle = action.payload.cycle
        return {
          activeCycle: newCycle,
          totalTimeInSeconds: newCycle.minutesAmount * 60,
          isZeroed: false,
          pastSeconds: 0,
        }
      }
      case 'countdown': {
        return {
          ...state,
          pastSeconds: differenceInSeconds(
            new Date(),
            state.activeCycle!.startDate,
          ),
        }
      }
      case 'abort': {
        return {
          activeCycle: null,
          totalTimeInSeconds: 0,
          isZeroed: false,
          pastSeconds: 0,
        }
      }
      case 'finish': {
        return {
          activeCycle: null,
          totalTimeInSeconds: 0,
          isZeroed: true,
          pastSeconds: 0,
        }
      }
      case 'confirm_finished': {
        return {
          ...state,
          isZeroed: false,
        }
      }
    }
  }
