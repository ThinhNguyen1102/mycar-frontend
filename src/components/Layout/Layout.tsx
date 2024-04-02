import {Divider, VStack} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'
import Navigation from '../Navigation'
import Footer from '../Footer'

function Layout() {
  return (
    <VStack gap="0">
      <Navigation />
      <Outlet />
      <Divider w="100%" h="2px" bg="gray.300" />
      <Footer />
    </VStack>
  )
}

export default Layout
