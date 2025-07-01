import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  nav {
    display: flex;
    gap: 1rem;

    a {
      display: block;
      text-align: center;
      color: ${props => props.theme['gray-100']};

      height: 3rem;
      width: 3rem;

      /* border-top will prevent icon layout shifting on hover */
      border-top: 3px solid transparent; 
      border-bottom: 3px solid transparent; 

      &:hover {
        border-bottom-color: ${props => props.theme['green-500']}
      }

      &.active {
        color: ${props => props.theme['green-500']}
      }
    }
  }
`