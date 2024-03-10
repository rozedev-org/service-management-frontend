import { InputGroup, InputLeftElement, Icon, Input } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

export const SearchInput = () => {
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={BiSearch} />
      </InputLeftElement>
      <Input type='text' placeholder='Search' />
    </InputGroup>
  )
}
