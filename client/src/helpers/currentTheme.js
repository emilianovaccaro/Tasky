import { theme } from '../app/theme'

export const currentTheme = (themes) => {

  if ( themes == 'dark') {
    return theme.dark
  }
  if ( themes == 'intermediate') {
    return theme.intermediate
  }
  if ( themes == 'light') {
    return theme.light
  }
  
}
