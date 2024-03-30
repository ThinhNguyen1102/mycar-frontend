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
import {Link} from 'react-router-dom'

function Login() {
  return (
    <HStack h="100vh" w="80vw">
      <VStack flex="1">
        <Heading>Poster</Heading>
      </VStack>
      <VStack flex="1" gap="30px">
        <Heading>Login</Heading>
        <VStack as="form" gap="15px">
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
          <Box alignSelf="flex-end">
            <Link to="/">
              <Text textDecoration="underline">Forgot password?</Text>
            </Link>
          </Box>
          <Button sx={styles.input}>Login</Button>
        </VStack>
        <Divider w="50%" />
        <HStack>
          <Text color="text.gray">Don't have an account?</Text>
          <Link to="/signup">
            <Text textDecoration="underline">Create an Account</Text>
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

export default Login
