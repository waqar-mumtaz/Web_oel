import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (valueString) => {
    const value = parseInt(valueString) || 0;
    dispatch(updateQuantity({ productId: item._id, quantity: value }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={4}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      <HStack spacing={4} align="start">
        {/* Product Image */}
        <Image
          src={item.image}
          alt={item.name}
          boxSize="100px"
          objectFit="cover"
          borderRadius="lg"
        />

        {/* Product Details */}
        <VStack flex={1} align="start" spacing={2}>
          <Text fontWeight="600" fontSize="md" noOfLines={2}>
            {item.name}
          </Text>
          <Text color="brand.600" fontWeight="700" fontSize="lg">
            ${item.price.toFixed(2)}
          </Text>
          
          {/* Quantity Control */}
          <HStack spacing={4}>
            <NumberInput
              size="sm"
              maxW={24}
              min={1}
              max={item.stockQuantity}
              value={item.quantity}
              onChange={handleQuantityChange}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            
            <IconButton
              icon={<HiOutlineTrash size={18} />}
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={handleRemove}
              aria-label="Remove item"
            />
          </HStack>
        </VStack>

        {/* Subtotal */}
        <VStack align="end" spacing={1}>
          <Text fontSize="sm" color="gray.500">
            Subtotal
          </Text>
          <Text fontWeight="700" fontSize="lg" color="gray.800">
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CartItem;

