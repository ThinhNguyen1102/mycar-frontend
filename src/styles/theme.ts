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
    },
    styles: {
      global: (props: any) => ({
        '::-webkit-scrollbar': {
          width: '10px'
        },
        '::-webkit-scrollbar-track': {
          background: 'white'
        },
        '::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '5px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555'
        },
        '.rdp': {
          '--rdp-background-color': '#F5F5F7',
          '--rdp-accent-color': '#6e6e73'
        }
      })
    }
  },
  withDefaultColorScheme({colorScheme: 'primary'})
)
