import {Route, Routes} from 'react-router-dom'

import Login from './pages/Login'
import {VStack} from '@chakra-ui/react'
import NoMatch from './components/NoMatch'
import Signup from './pages/Signup'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import MyTrip from './pages/MyTrip'
import Owner from './pages/Owner'

export const App = () => (
  <VStack gap="0px">
    <Routes>
      <Route element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="mytrips" element={<MyTrip />} />
        <Route path="owner" element={<Owner />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </VStack>
)
