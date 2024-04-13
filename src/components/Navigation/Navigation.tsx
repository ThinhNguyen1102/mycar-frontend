import {Avatar, Box, Divider, HStack, Icon, Text} from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import ConnectWallet from './ConnectWallet'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'
import {useEffect} from 'react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import callApi from '../../utils/api'
import {CarRentalPost} from '../../types/api-response.type'
import {useShallow} from 'zustand/react/shallow'

function Navigation() {
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const navigate = useNavigate()
  const setToken = useUserLoginInfoStore(state => state.setToken)
  const setUserInfo = useUserLoginInfoStore(state => state.setUserInfo)
  const setCarRentalPost = useCarRentalPostStore(state => state.setCarRentalPosts)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    if (!accessToken && !refreshToken) {
      navigate('/login')
      return
    }

    const handleInitApp = async () => {
      const {data: profileRes} = await callApi<any>(`/api/v1/users/profile`, 'GET', null)
      const {data: carRentalPosts}: {data: CarRentalPost[]} = await callApi<any>(
        `/api/v1/car-rental-posts`,
        'GET',
        null
      )

      setCarRentalPost(carRentalPosts)
      setToken(accessToken ?? '', refreshToken ?? '')
      setUserInfo({
        id: profileRes.id,
        email: profileRes.email,
        username: profileRes.username,
        phone_number: profileRes.phone_number
      })
    }

    handleInitApp()
  }, [navigate, setCarRentalPost, setToken, setUserInfo])

  return (
    <HStack
      h="80px"
      padding="0 60px"
      w="100vw"
      justifyContent="space-between"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      position="fixed"
      bg="white"
      zIndex="10"
    >
      <Link to="/">
        <Text fontWeight="500">Logo</Text>
      </Link>

      <HStack gap="20px">
        <Link to="/owner">
          <Text fontWeight="500">Trở thành chủ xe</Text>
        </Link>
        <Link to="/mytrips">
          <Text fontWeight="500" ml="30px">
            Chuyến của tôi
          </Text>
        </Link>
        <Divider orientation="vertical" color="text.gray" w="1px" h="16px" />
        <Box as="button" fontSize="25px" pt="5px">
          <Icon as={IoMdNotificationsOutline} />
        </Box>
        <HStack as="button">
          <Avatar size="sm" />
          <Text fontWeight="500">{userInfo?.username}</Text>
          <Box fontSize="20px" pt="7px">
            <Icon as={MdOutlineKeyboardArrowDown} />
          </Box>
        </HStack>
        <ConnectWallet />
      </HStack>
    </HStack>
  )
}

export default Navigation
