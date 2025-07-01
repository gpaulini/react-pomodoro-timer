import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  height: 12rem;
  font-size: 10rem;
  line-height: 8rem;
  font-family: 'Roboto Mono', monospace;
  color: ${props => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background-color: ${props => props.theme['gray-700']};
  }
`

export const CountdownSeparator = styled.div`
  padding: 2rem 0;
  color: ${props => props.theme['green-500']};

  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
