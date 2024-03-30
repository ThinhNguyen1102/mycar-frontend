import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  SystemStyleObject,
  Text,
  VStack
} from '@chakra-ui/react'
import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
  return (
    <HStack h="100vh" w="80vw">
      <VStack flex="1">
        <Heading>Poster</Heading>
      </VStack>
      <VStack flex="1" gap="30px">
        <Heading>Sign up</Heading>
        <VStack as="form" gap="15px">
          <Box>
            <Text display="block" as="label" htmlFor="name" mb="5px">
              Name
            </Text>
            <Input id="name" name="name" sx={styles.input} />
          </Box>
          <Box>
            <Text display="block" as="label" htmlFor="phone" mb="5px">
              Phone number
            </Text>
            <Input id="phone" name="phone" sx={styles.input} />
          </Box>
          <Box>
            <Text display="block" as="label" htmlFor="email" mb="5px">
              Email
            </Text>
            <Input id="email" name="email" sx={styles.input} />
          </Box>
          <Box>
            <Text display="block" htmlFor="password" as="label" mb="5px">
              Password
            </Text>
            <Input id="password" name="password" type="password" sx={styles.input} />
          </Box>
          <Button mt="20px" sx={styles.input}>
            Sign up
          </Button>
        </VStack>
        <Divider w="50%" />
        <HStack>
          <Text color="text.gray">Don't have an account?</Text>
          <Link to="/login">
            <Text textDecoration="underline">Login</Text>
          </Link>
        </HStack>
      </VStack>
    </HStack>
  )
}

type Styles = {
  input: SystemStyleObject
}

const styles: Styles = {
  input: {
    w: {base: '300px', lg: '400px', xl: '500px'}
  }
}

export default Signup
