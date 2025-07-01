import { Outlet } from 'react-router-dom'
import { Header } from '../../../Components/Header'
import { LayoutContainer } from './styles'
import { CountdownProgressBar } from '../../../Components/CountdownProgressBar'

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <CountdownProgressBar />
    </LayoutContainer>
  )
}
