import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={36} />
        </NavLink>

        <NavLink to="/history" title="History">
          <Scroll size={36} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
