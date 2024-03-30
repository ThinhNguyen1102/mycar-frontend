import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: {
      primary: {
        500: '#1D1D1F'
      },
      text: {
        dark: '#1D1D1F',
        gray: '#6e6e73',
        light: '#ffffff'
      },
      background: '#F5F5F7'
    }
  },
  withDefaultColorScheme({colorScheme: 'primary'})
)
