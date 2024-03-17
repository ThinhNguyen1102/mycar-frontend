import {Box, ChakraProvider, Icon, Text, VStack} from '@chakra-ui/react'
import {theme} from './styles/theme'
import {FaAdjust} from 'react-icons/fa'

export const App = () => (
  <VStack>
    <Text color="primary.500" fontSize="64px">
      Hello
    </Text>
    <Icon as={FaAdjust} color="primary.500" fontSize="32px" />
  </VStack>
)
