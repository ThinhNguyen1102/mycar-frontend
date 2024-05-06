import {Avatar, Box, Divider, HStack, Icon, Text} from '@chakra-ui/react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import ConnectWallet from './ConnectWallet'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'
import {useEffect, useState} from 'react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import callApi from '../../utils/api'
import {CarRentalPost, NotificationRes} from '../../types/api-response.type'
import {useShallow} from 'zustand/react/shallow'
import Notification from './Notification'
import {pusherClient} from '../../libs/pusher'
import {FaCar} from 'react-icons/fa'

function Navigation() {
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const navigate = useNavigate()
  const setToken = useUserLoginInfoStore(state => state.setToken)
  const setUserInfo = useUserLoginInfoStore(state => state.setUserInfo)
  const setCarRentalPost = useCarRentalPostStore(state => state.setCarRentalPosts)
  const [notifications, setNotifications] = useState<NotificationRes[]>([])

  const location = useLocation()

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
      const {data: notifications}: {data: NotificationRes[]} = await callApi<any>(
        `/api/v1/users/notifications`,
        'GET',
        null
      )

      setNotifications(notifications)
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

  useEffect(() => {
    if (!userInfo) return

    pusherClient.subscribe(`user-${userInfo.id}`)

    pusherClient.bind(
      'notification::new',
      ({newNotification}: {newNotification: NotificationRes}) => {
        setNotifications(prev => [newNotification, ...prev])
      }
    )

    return () => {
      pusherClient.unsubscribe(`user-${userInfo.id}`)
      pusherClient.unbind('notification::new')
    }
  }, [userInfo])

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
        <Icon fontSize="42px" as={FaCar} />
      </Link>

      <HStack gap="20px">
        <Link to="/owner">
          <Box
            bg={location.pathname === '/owner' ? 'background' : 'transparent'}
            borderRadius="5px"
            p="8px"
          >
            <Text fontWeight="500">Trở thành chủ xe</Text>
          </Box>
        </Link>
        <Link to="/mytrips">
          <Box
            bg={location.pathname === '/mytrips' ? 'background' : 'transparent'}
            borderRadius="5px"
            p="8px"
          >
            <Text fontWeight="500">Chuyến của tôi</Text>
          </Box>
        </Link>
        <Divider orientation="vertical" color="text.gray" w="1px" h="16px" />
        <Notification notifications={notifications} setNotifications={setNotifications} />
        <HStack as="button">
          <Avatar size="sm" />
          <Text fontWeight="500">{userInfo?.username}</Text>
        </HStack>
        <ConnectWallet />
      </HStack>
    </HStack>
  )
}

export default Navigation
