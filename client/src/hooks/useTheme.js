import{ useState, useEffect } from 'react'
import { theme } from '../app/theme'

const useTheme = () => {
  const [ userTheme, setUserTheme ] = useState(theme.dark)
  const [ actualTheme, setActualTheme ] = useState(localStorage.getItem('theme'))

  useEffect(() => {
    if ( actualTheme == 'dark') {
      return setUserTheme(theme.dark)
    }
    if ( actualTheme == 'intermediate') {
      return setUserTheme(theme.intermediate)
    }
    if ( actualTheme == 'light') {
      return setUserTheme(theme.light)
    }
  }, [ userTheme, actualTheme ])

  return { userTheme, setActualTheme }
}

export default useTheme