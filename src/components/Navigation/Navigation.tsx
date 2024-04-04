import {Avatar, Box, Divider, HStack, Icon, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import ConnectWallet from './ConnectWallet'

function Navigation() {
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
          <Text fontWeight="500">Thịnh nguyễn</Text>
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
