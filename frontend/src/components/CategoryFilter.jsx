import { HStack, Button, Box, Text } from '@chakra-ui/react';
import {
  HiOutlineViewGrid,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineDesktopComputer,
  HiOutlineHeart,
} from 'react-icons/hi';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All', icon: HiOutlineViewGrid },
    { id: 'clothing', name: 'Clothing', icon: HiOutlineSparkles },
    { id: 'books', name: 'Books', icon: HiOutlineBookOpen },
    { id: 'electronics', name: 'Electronics', icon: HiOutlineDesktopComputer },
    { id: 'pets', name: 'Pets', icon: HiOutlineHeart },
  ];

  return (
    <Box overflowX="auto" pb={2}>
      <HStack spacing={3} minW="max-content">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? 'solid' : 'outline'}
              size="md"
              leftIcon={<Icon size={18} />}
              onClick={() => onCategoryChange(category.id)}
              borderRadius="full"
              px={5}
              bg={isSelected ? 'brand.500' : 'white'}
              color={isSelected ? 'white' : 'gray.600'}
              borderColor={isSelected ? 'brand.500' : 'gray.200'}
              _hover={{
                bg: isSelected ? 'brand.600' : 'gray.50',
              }}
              transition="all 0.2s"
            >
              <Text fontSize="sm" fontWeight="500">
                {category.name}
              </Text>
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};

export default CategoryFilter;

