import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {App} from './App'
import {theme} from './styles/theme'
import {BrowserRouter} from 'react-router-dom'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.Fragment>
    <ColorModeScript />
    <ChakraProvider resetCSS theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.Fragment>
)
