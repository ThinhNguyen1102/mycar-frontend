import {Center, Portal, Spinner, Text, VStack} from '@chakra-ui/react'

interface GlobalLoadingProps {
  message: string
}

function GlobalLoading({message}: GlobalLoadingProps) {
  return (
    <Portal>
      <Center position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(255, 255, 255, 0.8)">
        <VStack gap="20px">
          <Spinner thickness="5px" speed="1s" emptyColor="gray.200" color="primary.500" size="xl" />
          <Text fontWeight="bold">{message}</Text>
        </VStack>
      </Center>
    </Portal>
  )
}

export default GlobalLoading
