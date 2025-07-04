import styled from 'styled-components'

export const LayoutContainer = styled.div`
  position: relative;
  max-width: 74rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2rem;

  background-color: ${props => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
