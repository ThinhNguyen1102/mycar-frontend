import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import {VStack} from '@chakra-ui/react'
import NoMatch from './components/NoMatch'
import Layout from './components/Layout'
import Signup from './pages/Signup'

export const App = () => (
  <VStack gap="0px">
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </VStack>
)
