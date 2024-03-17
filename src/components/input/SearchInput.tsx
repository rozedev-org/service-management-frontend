import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputGroupProps,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

interface SearchInputProps extends InputGroupProps {}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <InputGroup {...props}>
      <InputLeftElement>
        <Icon as={BiSearch} />
      </InputLeftElement>
      <Input type='text' placeholder='Search' />
    </InputGroup>
  )
}
