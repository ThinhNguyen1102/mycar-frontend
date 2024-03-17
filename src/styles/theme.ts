import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: {
      primary: {
        500: '#22b8cf'
      }
    }
  },
  withDefaultColorScheme({colorScheme: 'primary'})
)
