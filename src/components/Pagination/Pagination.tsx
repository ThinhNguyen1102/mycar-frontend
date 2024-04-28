import {HStack, Icon, Text} from '@chakra-ui/react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

interface PaginationProps {
  numOfPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

function Pagination({numOfPages, currentPage, setCurrentPage}: PaginationProps) {
  let arr: number[] = Array.from(Array(numOfPages), (x, index) => index + 1)

  arr = arr.filter(val => {
    if (currentPage > 3 && currentPage < numOfPages - 2) {
      return val >= currentPage - 2 && val <= currentPage + 2
    } else if (currentPage >= numOfPages - 2) {
      return val >= numOfPages - 4
    } else {
      return val <= 5
    }
  })

  return (
    <HStack gap="15px" alignSelf="flex-end">
      <Icon
        cursor="pointer"
        fontSize="20px"
        as={IoIosArrowBack}
        color={currentPage === 1 ? 'gray.300' : 'text.primary'}
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1)
        }}
      />
      {!arr.includes(1) && (
        <Text
          cursor="pointer"
          fontWeight="500"
          onClick={() => {
            setCurrentPage(1)
          }}
          color={1 === currentPage ? 'text.primary' : 'gray.300'}
        >
          1
        </Text>
      )}
      {!arr.includes(1) && currentPage > 4 && (
        <Text
          cursor="pointer"
          fontWeight="500"
          onClick={() => {
            if (currentPage > 4) setCurrentPage(currentPage - 3)
          }}
        >
          ...
        </Text>
      )}
      {arr.map((val, index) => {
        return (
          <Text
            key={index}
            cursor="pointer"
            onClick={() => {
              setCurrentPage(val)
            }}
            fontWeight="500"
            color={val === currentPage ? 'text.primary' : 'gray.300'}
          >
            {val}
          </Text>
        )
      })}
      {!arr.includes(numOfPages) && currentPage < numOfPages - 3 && (
        <Text
          cursor="pointer"
          fontWeight="500"
          onClick={() => {
            if (currentPage < numOfPages - 3) setCurrentPage(currentPage + 3)
          }}
        >
          ...
        </Text>
      )}
      {!arr.includes(numOfPages) && (
        <Text
          cursor="pointer"
          onClick={() => {
            setCurrentPage(numOfPages)
          }}
          fontWeight="500"
          color={numOfPages === currentPage ? 'text.primary' : 'gray.300'}
        >
          {numOfPages}
        </Text>
      )}
      <Icon
        cursor="pointer"
        fontSize="20px"
        color={currentPage === numOfPages ? 'gray.300' : 'text.primary'}
        as={IoIosArrowForward}
        onClick={() => {
          if (currentPage < numOfPages) setCurrentPage(currentPage + 1)
        }}
      />
    </HStack>
  )
}

export default Pagination
