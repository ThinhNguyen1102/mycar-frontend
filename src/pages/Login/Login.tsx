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
import {SubmitHandler, useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import callApi from '../../utils/api'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'

type LoginInputs = {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<LoginInputs>()

  const navigate = useNavigate()

  const setToken = useUserLoginInfoStore(state => state.setToken)
  const setUserInfo = useUserLoginInfoStore(state => state.setUserInfo)

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      const {data: response} = await callApi<any>('/api/v1/auth/login', 'POST', data)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      localStorage.setItem('user_id', response.data.user.id)

      setToken(response.data.access_token, response.data.refresh_token)
      setUserInfo({
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.username,
        phone_number: response.data.user.phone_number
      })
    } catch (err) {
      console.log(err)
    }

    reset()
    navigate('/')
  }

  return (
    <HStack h="100vh" w="80vw">
      <VStack flex="1">
        <Heading>Poster</Heading>
      </VStack>
      <VStack flex="1" gap="30px">
        <Heading>Login</Heading>
        <VStack as="form" gap="0px" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text display="block" as="label" htmlFor="email" mb="5px">
              Email
            </Text>
            <Input
              id="email"
              sx={styles.input}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email không được để trống.'
                },
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Email không hợp lệ.'
                }
              })}
            />
            <Text minH="18px" mt="5px" fontWeight="500" fontSize="12px" color="text.error">
              {errors.email && errors.email.message}
            </Text>
          </Box>
          <Box>
            <Text display="block" htmlFor="password" as="label" mb="5px">
              Password
            </Text>
            <Input
              id="password"
              type="password"
              sx={styles.input}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Mật khẩu không được để trống.'
                },
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự.'
                }
              })}
            />
            <Text minH="18px" mt="5px" fontWeight="500" fontSize="12px" color="text.error">
              {errors.password && errors.password.message}
            </Text>
          </Box>
          <Box alignSelf="flex-end" mt="15px">
            <Link to="/">
              <Text textDecoration="underline">Forgot password?</Text>
            </Link>
          </Box>
          <Button sx={styles.input} type="submit" mt="15px">
            Login
          </Button>
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
