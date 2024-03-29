import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputGroupProps,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

interface SearchInputProps extends InputGroupProps {
  onChangeHandler: (value: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <InputGroup {...props}>
      <InputLeftElement>
        <Icon as={BiSearch} />
      </InputLeftElement>
      <Input
        type='text'
        placeholder='Search'
        onChange={(e) => {
          props.onChangeHandler(e.target.value)
        }}
      />
    </InputGroup>
  )
}
