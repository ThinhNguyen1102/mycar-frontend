import {HStack, Skeleton, VStack} from '@chakra-ui/react'

function PageLoading() {
  return (
    <VStack mt="10px" w="80%">
      <Skeleton
        w="100%"
        startColor="gray.200"
        endColor="gray.100"
        borderRadius="10px"
        height="140px"
      />
      <HStack w="100%" flex="1">
        <VStack flex="2" alignSelf="stretch" justifyContent="space-between">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton
              key={index}
              startColor="gray.200"
              endColor="gray.100"
              borderRadius="10px"
              height="67px"
              w="100%"
            />
          ))}
        </VStack>
        <Skeleton
          startColor="gray.200"
          endColor="gray.100"
          borderRadius="10px"
          height="300px"
          flex="1"
        />
      </HStack>
    </VStack>
  )
}

export default PageLoading
