import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// adds new types to the module/library
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { why?: null }
}
