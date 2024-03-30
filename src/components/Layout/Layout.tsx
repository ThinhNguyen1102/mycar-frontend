import {VStack} from '@chakra-ui/react'
import Navigation from '../Navigation'
import {Route, Routes} from 'react-router-dom'
import Home from '../../pages/Home'

function Layout() {
  return (
    <VStack gap="0px">
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </VStack>
  )
}

export default Layout
