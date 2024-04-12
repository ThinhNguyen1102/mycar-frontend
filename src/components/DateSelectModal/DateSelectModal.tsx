import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import React from 'react'
import {DateRange, DayPicker, Matcher} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import {format} from 'date-fns'
import {vi} from 'date-fns/locale'

interface DateSelectModalProps {
  isOpen: boolean
  onClose: () => void
  range?: DateRange | undefined
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  disabledDays?: Matcher[]
}

export type DisableDateRange = {
  from?: Date
  to?: Date
}

function DateSelectModal({isOpen, onClose, range, setRange, disabledDays}: DateSelectModalProps) {
  let footer = 'Please pick the first day.'
  if (range?.from) {
    if (!range.to) {
      footer = `${format(range.from, 'EEEE', {locale: vi})}, ${format(range.from, 'P', {locale: vi})}`
    } else if (range.to) {
      footer = `${format(range.from, 'EEEE', {locale: vi})}, ${format(range.from, 'P', {locale: vi})} – ${format(range.to, 'EEEE', {locale: vi})}, ${format(range.to, 'P', {locale: vi})}`
    }
  }

  disabledDays?.push({before: new Date()})

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thời gian</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} w="100%">
          <Box>
            <DayPicker
              disabled={disabledDays ?? {before: new Date()}}
              id="select-date"
              numberOfMonths={2}
              mode="range"
              min={2}
              selected={range}
              onSelect={setRange}
              fromMonth={new Date()}
            />
          </Box>
        </ModalBody>

        <ModalFooter p="0">
          <HStack
            w="100%"
            justify="space-between"
            boxShadow="0px -5px 10px rgba(0, 0, 0, 0.1)"
            p="24px 24px 24px 24px"
          >
            <Text fontWeight="500">{footer}</Text>
            <Button onClick={onClose}>Tiếp tục</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DateSelectModal
