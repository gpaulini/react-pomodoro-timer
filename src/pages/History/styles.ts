import styled from 'styled-components'
import type { CycleStatus } from '../../@types/cycle'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']}
  }
`
export const HistoryList = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  max-height: 30rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${props => props.theme['gray-600']};
      color: ${props => props.theme['gray-100']};
      padding: 1rem;
      font-size: 0.875rem;
      text-align: left;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      width: 20%;
      cursor: default;

      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  finished: 'green-500',
  pending: 'yellow-500',
  aborted: 'red-500',
} as const // ts will read VALUES as constant

interface StatusProps {
  $status: CycleStatus
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme[STATUS_COLORS[props.$status]]};
  }

  &::after {
    content: '${props => props.$status}';
    text-transform: capitalize;
  }
`
