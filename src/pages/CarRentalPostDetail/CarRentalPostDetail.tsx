import {Grid, GridItem, HStack, VStack} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import PostDetailInfo from './components/PostDetailInfo'
import PostDetailCost from './components/PostDetailCost'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import {useEffect} from 'react'

function CarRentalPostDetail() {
  const {postId} = useParams()

  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)
  const post = carRentalPosts.find(post => post.id === Number(postId))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Grid
        w="80%"
        h="500px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={3} colSpan={4} bg="tomato" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="tomato" />
      </Grid>
      <HStack w="80%" gap="10px">
        <PostDetailInfo carRentalPost={post} />
        <PostDetailCost carRentalPost={post} />
      </HStack>
    </VStack>
  )
}

export default CarRentalPostDetail
