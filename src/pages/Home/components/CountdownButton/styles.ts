import styled, { keyframes } from 'styled-components'

const CountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  /* width: 100%; */
  font-size: 1.25rem;

  padding: 1rem 2rem;
  border: 0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(CountdownButton)`
  background-color: ${props => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${props => props.theme['green-700']};
  }
`

export const AbortCountdownButton = styled(CountdownButton)`
  background-color: ${props => props.theme['red-500']};

  &:hover {
    background-color: ${props => props.theme['red-700']};
  }
`

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.25;
  }
`

export const FinishCountdownButton = styled(CountdownButton)`
  background-color: ${props => props.theme['yellow-500']};
  animation: ${blinkAnimation} 500ms linear infinite;
`
