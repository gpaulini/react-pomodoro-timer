import styled, { keyframes } from 'styled-components'

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.25;
  }
`

export const CountdownProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  background-color: ${props => props.theme['green-500']};
  height: 6px;
  width: 100%;
  transition:
    width linear 1.05s,
    background-color ease 300ms;

  &.half-time-left {
    background-color: ${props => props.theme['yellow-500']};
  }

  &.little-time-left {
    animation: ${blinkAnimation} .75s linear infinite;
    background-color: ${props => props.theme['red-500']};
  }
`
