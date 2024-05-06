import {
  Avatar,
  Box,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack
} from '@chakra-ui/react'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {GoDotFill} from 'react-icons/go'
import {NotificationRes} from '../../../types/api-response.type'
import {format} from 'date-fns'
import {MdOutlineMarkChatRead} from 'react-icons/md'
import callApi from '../../../utils/api'
import {useNavigate} from 'react-router-dom'

interface NotificationProps {
  notifications: NotificationRes[]
  setNotifications: (notifications: NotificationRes[]) => void
}

function Notification({notifications, setNotifications}: NotificationProps) {
  const numOfNotiIsNotRead = notifications.filter(noti => !noti.is_read).length

  const navigate = useNavigate()

  return (
    <Popover>
      {({isOpen, onClose}) => (
        <>
          <PopoverTrigger>
            <Box as="button" fontSize="25px" pt="5px" position="relative">
              <Icon as={IoMdNotificationsOutline} />
              {numOfNotiIsNotRead > 0 && (
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                  position="absolute"
                  top="5px"
                  right="-4px"
                  bg="common.error"
                  w="16px"
                  h="16px"
                  borderRadius="50%"
                  border="1px"
                  borderColor="white"
                >
                  {numOfNotiIsNotRead}
                </Text>
              )}
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent minW="400px">
              <PopoverArrow />
              <PopoverHeader>
                <HStack>
                  <Text fontWeight="500">Thông báo</Text>
                  <Icon
                    _hover={{
                      cursor: 'pointer'
                    }}
                    as={MdOutlineMarkChatRead}
                    onClick={async () => {
                      const response = await callApi<any>(
                        '/api/v1/users/notifications/read',
                        'POST',
                        {}
                      )

                      if (response.data.success) {
                        setNotifications(
                          notifications.map(notification => {
                            return {
                              ...notification,
                              is_read: true
                            }
                          })
                        )
                      }
                    }}
                  />
                </HStack>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody p="0">
                <VStack w="100%" maxH="500px" overflowY="auto">
                  {notifications.map((notification, index) => (
                    <HStack
                      w="100%"
                      key={index}
                      _hover={{
                        bg: 'gray.200',
                        cursor: 'pointer'
                      }}
                      p="5px 10px"
                      onClick={async () => {
                        await callApi<any>(
                          `/api/v1/users/notifications/${notification.id}/read`,
                          'POST',
                          {}
                        )

                        navigate(`/mytrips/${notification.contract_id}`, {
                          replace: true
                        })

                        onClose()
                      }}
                      borderLeft="5px"
                      borderLeftColor={`common.${notification.type}`}
                      borderLeftStyle="solid"
                    >
                      <VStack alignItems="flex-start" flex="1">
                        <Text fontWeight="500" mt="2px">
                          {notification.title}
                        </Text>
                        <Text>{notification.content}</Text>
                        <Text fontWeight="500" fontSize="12px" color="text.gray">
                          {format(new Date(notification.created_at), 'dd/MM/yyyy HH:mm')}
                        </Text>
                      </VStack>
                      {!notification.is_read && (
                        <Icon mt="7px" alignSelf="flex-start" as={GoDotFill} />
                      )}
                    </HStack>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

export default Notification
