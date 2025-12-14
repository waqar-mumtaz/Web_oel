import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stockQuantity <= 0) {
      toast({
        title: 'Out of stock',
        description: 'This product is currently unavailable.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    dispatch(addToCart(product));
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const categoryColors = {
    clothing: 'purple',
    books: 'blue',
    electronics: 'teal',
    pets: 'orange',
  };

  return (
    <Box
      as={RouterLink}
      to={`/products/${product._id}`}
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-4px)',
      }}
      display="block"
    >
      {/* Image Container */}
      <Box position="relative" overflow="hidden" h="200px">
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }}
        />
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme={categoryColors[product.category] || 'gray'}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          textTransform="capitalize"
        >
          {product.category}
        </Badge>
        {product.stockQuantity <= 0 && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            colorScheme="red"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
          >
            Out of Stock
          </Badge>
        )}
      </Box>

      {/* Content */}
      <VStack p={4} align="stretch" spacing={3}>
        <Text
          fontWeight="600"
          fontSize="md"
          noOfLines={1}
          color="gray.800"
        >
          {product.name}
        </Text>
        
        <Text fontSize="sm" color="gray.500" noOfLines={2}>
          {product.description}
        </Text>

        <HStack justify="space-between" align="center" pt={2}>
          <Text fontSize="xl" fontWeight="700" color="brand.600">
            ${product.price.toFixed(2)}
          </Text>
          <Button
            size="sm"
            variant="solid"
            leftIcon={<HiOutlineShoppingCart />}
            onClick={handleAddToCart}
            isDisabled={product.stockQuantity <= 0}
          >
            Add
          </Button>
        </HStack>

        {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
          <Text fontSize="xs" color="orange.500" fontWeight="500">
            Only {product.stockQuantity} left in stock!
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default ProductCard;

