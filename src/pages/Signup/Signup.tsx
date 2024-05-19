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

type SignupInputs = {
  name: string
  phone: string
  email: string
  password: string
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<SignupInputs>()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignupInputs> = async data => {
    try {
      const {data: res} = await callApi<any>('/api/v1/auth/register', 'POST', {
        username: data.name,
        phone_number: data.phone,
        email: data.email,
        password: data.password
      })

      reset()
      if (res) navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <HStack h="100vh" w="80vw">
      <VStack flex="1" pb="100px">
        <Heading fontWeight="500" fontSize="42px">
          Xe của bạn
        </Heading>
        <Heading fontWeight="500" fontSize="42px">
          Hành trình của bạn!
        </Heading>
      </VStack>
      <VStack flex="1" gap="30px">
        <Heading fontWeight="500">Đăng ký tài khoản</Heading>
        <VStack as="form" gap="15px" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text display="block" as="label" htmlFor="name" mb="5px">
              Tên của hạn
            </Text>
            <Input
              id="name"
              sx={styles.input}
              {...register('name', {
                required: {
                  value: true,
                  message: 'Tên không được để trống.'
                },
                minLength: {
                  value: 3,
                  message: 'Tên phải có ít nhất 3 ký tự.'
                }
              })}
            />
            <Text minH="18px" mt="5px" fontWeight="500" fontSize="12px" color="text.error">
              {errors.name && errors.name.message}
            </Text>
          </Box>
          <Box>
            <Text display="block" as="label" htmlFor="phone" mb="5px">
              Số điện thoại
            </Text>
            <Input
              id="phone"
              sx={styles.input}
              {...register('phone', {
                required: {
                  value: true,
                  message: 'Số điện thoại không được để trống.'
                },
                pattern: {
                  value: /^0\d{9}$/g,
                  message: 'Số điện thoại không hợp lệ.'
                }
              })}
            />
            <Text minH="18px" mt="5px" fontWeight="500" fontSize="12px" color="text.error">
              {errors.phone && errors.phone.message}
            </Text>
          </Box>
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
              Mật khẩu
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
          <Button type="submit" mt="20px" sx={styles.input}>
            Đăng ký
          </Button>
        </VStack>
        <Divider w="50%" />
        <HStack>
          <Text color="text.gray">Bạn đã có tài khoản?</Text>
          <Link to="/login">
            <Text textDecoration="underline">Đăng nhập</Text>
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
