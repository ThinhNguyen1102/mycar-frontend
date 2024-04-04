import {Button, HStack, Icon, Text} from '@chakra-ui/react'
import {ethers} from 'ethers'
import {FaEthereum} from 'react-icons/fa'
import useContractStore, {ContractState} from '../../../hooks/contract.store'

declare var window: any

function ConnectWallet() {
  const setWalletInfo = useContractStore((state: ContractState) => state.setWalletInfo)
  const address = useContractStore((state: ContractState) => state.address)
  const balance = useContractStore((state: ContractState) => state.balance)

  const onConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        if (address) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const newAddress = await signer.getAddress()
        const bigBalance = await signer.getBalance()
        const ethBalance = Number.parseFloat(ethers.utils.formatEther(bigBalance))

        setWalletInfo(newAddress, ethBalance, provider)
      } else {
        console.error('Please install MetaMask!')
      }
    } catch (err) {
      console.error(err)
    }
  }

  window.ethereum.on('accountsChanged', onConnectMetamask)

  return (
    <>
      {!address && (
        <Button onClick={onConnectMetamask}>
          <Text minW="200px" fontSize="12px" fontWeight="bold">
            KẾT NỐI VÍ
          </Text>
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
