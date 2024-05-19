import {Box, HStack, Icon, Spacer, Text, VStack} from '@chakra-ui/react'
import React from 'react'
import {BsLuggage} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import {CarRentalPost} from '../../../../types/api-response.type'

interface MyCarRentalPostsProps {
  carRentalPosts: CarRentalPost[]
  currentEditPost: CarRentalPost | null
  setCurrentEditPost: React.Dispatch<React.SetStateAction<CarRentalPost | null>>
}

function MyCarRentalPosts({
  currentEditPost,
  carRentalPosts,
  setCurrentEditPost
}: MyCarRentalPostsProps) {
  return (
    <VStack h="100%" w="100%" justifyContent="flex-start">
      <Text mb="20px" fontWeight="500" fontSize="24px" alignSelf="flex-start">
        Xe của tôi
      </Text>
      <VStack w="100%">
        {carRentalPosts.map(carRentalPost => {
          return (
            <HStack
              key={carRentalPost.id}
              bg={carRentalPost.id === currentEditPost?.id ? 'background' : 'white'}
              as="button"
              w="100%"
              borderRadius="10px"
              border="1px"
              borderColor="gray.300"
              boxShadow={
                carRentalPost.id === currentEditPost?.id
                  ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'
                  : 'none'
              }
              p="10px"
              _hover={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}}
              onClick={() => {
                setCurrentEditPost(carRentalPost)
              }}
            >
              <Box h="120px" w="160px" borderRadius="10px" overflow="hidden">
                <img src={carRentalPost?.carImages[0]} alt="car" />
              </Box>
              <VStack h="100%" alignItems="flex-start" gap="0" p="10px">
                <Text
                  p="10px 0"
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="1"
                  pt="0"
                  textAlign="left"
                >
                  {carRentalPost?.model}
                </Text>
                <Text fontSize="12px" color="text.gray">
                  {carRentalPost?.brand}
                </Text>
                <Spacer />
                <HStack gap="15px">
                  <HStack>
                    <Icon as={FaRegStar} />
                    <Text color="text.gray" display="inline">
                      {carRentalPost?.seats}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={BsLuggage} />
                    <Text color="text.gray" display="inline">
                      4 chuyến
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
              <Spacer />
              <Text fontWeight="500" color="text.dark" alignSelf="flex-end" pb="10px">
                {carRentalPost?.price_per_day} ETH/ngày
              </Text>
            </HStack>
          )
        })}
      </VStack>
    </VStack>
  )
}

export default MyCarRentalPosts
