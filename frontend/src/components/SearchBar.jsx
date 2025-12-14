import { useState } from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

const SearchBar = ({ onSearch, placeholder = 'Search products...' }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <HiOutlineSearch color="gray" size={20} />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          bg="white"
          borderRadius="xl"
          border="1px"
          borderColor="gray.200"
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
        />
        {value && (
          <InputRightElement>
            <IconButton
              icon={<HiX />}
              size="sm"
              variant="ghost"
              onClick={handleClear}
              aria-label="Clear search"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </form>
  );
};

export default SearchBar;

