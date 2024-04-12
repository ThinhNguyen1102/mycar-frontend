import {Box, Text} from '@chakra-ui/react'

interface DoneButtonProps {
  title: string
}

function DoneButton({title}: DoneButtonProps) {
  return (
    <Box w="100px" as="button" bg="#4cd137" p="10px" borderRadius="5px" pointerEvents="none">
      <Text fontSize="12px" color="white">
        {title}
      </Text>
    </Box>
  )
}

export default DoneButton
