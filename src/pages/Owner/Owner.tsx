import {Heading, HStack, VStack} from '@chakra-ui/react'
import MyCarRentalPosts from './components/MyCarRentalPosts'
import CarRentalPostForm from './components/CarRentalPostForm'
import {useEffect, useState} from 'react'
import {CarRentalPost} from '../../types/api-response.type'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'

function Owner() {
  const [currentEditPost, setCurrentEditPost] = useState<CarRentalPost | null>(null)
  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)
  const userInfo = useUserLoginInfoStore(state => state.userInfo)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Đăng ký xe</Heading>
      <HStack w="80%" gap="20px" p="20px" bg="white" borderRadius="10px">
        <CarRentalPostForm
          currentEditPost={currentEditPost}
          setCurrentEditPost={setCurrentEditPost}
        />
        <VStack alignSelf="stretch" flex="1" justifyContent="flex-start">
          <MyCarRentalPosts
            carRentalPosts={carRentalPosts.filter(post => post.owner.id === userInfo?.id)}
            setCurrentEditPost={setCurrentEditPost}
            currentEditPost={currentEditPost}
          />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default Owner
