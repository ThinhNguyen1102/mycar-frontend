import {Box, Center, Grid, GridItem, HStack, VStack} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import PostDetailInfo from './components/PostDetailInfo'
import PostDetailCost from './components/PostDetailCost'
import {useEffect, useState} from 'react'
import {CarRentalPost} from '../../types/api-response.type'
import callApi from '../../utils/api'
import PageLoading from '../../components/PageLoading'
import GlobalLoading from '../../components/GlobalLoading'
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

function CarRentalPostDetail() {
  const {postId} = useParams()
  const [carRentalPost, setCarRentalPost] = useState<CarRentalPost | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (Number.isNaN(postId)) return

    const getCarRentalPosts = async () => {
      const {data: carRentalPosts} = await callApi<CarRentalPost>(
        `/api/v1/car-rental-posts/${postId}/detail`,
        'GET',
        null
      )
      setCarRentalPost(carRentalPosts)
    }

    getCarRentalPosts()
  }, [postId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      {carRentalPost && (
        <HStack w="80%" gap="10px">
          <PostDetailInfo carRentalPost={carRentalPost} />
          <PostDetailCost carRentalPost={carRentalPost} setIsLoaded={setIsLoaded} />
        </HStack>
      )}
      {!carRentalPost && (
        <Center pt="80px" w="100%">
          <PageLoading />
        </Center>
      )}
      {isLoaded && <GlobalLoading message="Đang tạo hợp đồng, vui lòng đợi trong giây lát!!!" />}
    </VStack>
  )
}

export default CarRentalPostDetail
