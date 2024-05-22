import {Button, HStack, Icon, Spinner, Text, useToast} from '@chakra-ui/react'
import {ethers} from 'ethers'
import {FaEthereum} from 'react-icons/fa'
import useContractStore, {ContractState} from '../../../hooks/contract.store'
import {useState} from 'react'

declare var window: any

function ConnectWallet() {
  const setWalletInfo = useContractStore((state: ContractState) => state.setWalletInfo)
  const toast = useToast()
  const address = useContractStore((state: ContractState) => state.address)
  const balance = useContractStore((state: ContractState) => state.balance)
  const [isLoaded, setIsLoaded] = useState(false)

  const onConnectMetamask = async () => {
    setIsLoaded(true)
    try {
      if (window?.ethereum) {
        if (address) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const newAddress = await signer.getAddress()
        const bigBalance = await signer.getBalance()
        const ethBalance = Number.parseFloat(ethers.utils.formatEther(bigBalance))

        setWalletInfo(newAddress, ethBalance, provider)
        setIsLoaded(false)
      } else {
        setIsLoaded(false)
        console.error('Please install MetaMask!')
        toast({
          title: 'Vui lòng cài đặt MetaMask!',
          status: 'warning',
          duration: 3000,
          position: 'top-right',
          isClosable: true
        })
      }
    } catch (err) {
      console.error(err)
      setIsLoaded(false)
      toast({
        title: 'Kết nối ví thất bại!',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })
    }
  }

  if (window?.ethereum) window.ethereum.on('accountsChanged', onConnectMetamask)

  return (
    <>
      {!address && (
        <Button minW="200px" onClick={onConnectMetamask}>
          {!isLoaded && (
            <Text fontSize="12px" fontWeight="bold">
              KẾT NỐI VÍ
            </Text>
          )}
          {isLoaded && <Spinner size="sm" color="white" />}
        </Button>
      )}
      {address && (
        <HStack
          justifyContent="center"
          minW="200px"
          border="2px"
          borderColor="text.gray"
          p="10px"
          borderRadius="10px"
        >
          <Text fontSize="12px" fontWeight="bold">
            {address.slice(0, 6)}...{address.slice(-4)}
          </Text>
          <Icon as={FaEthereum} />
          <Text fontSize="12px" fontWeight="bold">
            {balance?.toFixed(2)} ETH
          </Text>
        </HStack>
      )}
    </>
  )
}

export default ConnectWallet
