import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { HiArrowRight, HiOutlineShoppingBag } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { items, totalItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <Box py={{ base: 10, md: 20 }}>
        <Container maxW="container.md">
          <VStack spacing={6} textAlign="center">
            <Box
              w={24}
              h={24}
              bg="gray.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <HiOutlineShoppingBag size={48} color="gray" />
            </Box>
            <Heading size="lg" fontFamily="heading" color="gray.700">
              Your cart is empty
            </Heading>
            <Text color="gray.500">
              Looks like you haven't added any items to your cart yet.
            </Text>
            <Button
              as={RouterLink}
              to="/products"
              variant="solid"
              size="lg"
              rightIcon={<HiArrowRight />}
            >
              Start Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 6, md: 10 }}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="xl" fontFamily="heading" color="gray.800">
                Shopping Cart
              </Heading>
              <Text color="gray.500">
                {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
              </Text>
            </VStack>
            <Button
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </HStack>

          {/* Cart Items */}
          <VStack spacing={4} align="stretch">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </VStack>

          <Divider />

          {/* Cart Summary */}
          <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text color="gray.600">Subtotal</Text>
                <Text fontWeight="600">${totalAmount.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">Shipping</Text>
                <Text fontWeight="600" color="green.500">Free</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="600">Total</Text>
                <Text fontSize="2xl" fontWeight="700" color="brand.600">
                  ${totalAmount.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Actions */}
          <VStack spacing={4}>
            <Button
              as={RouterLink}
              to="/checkout"
              variant="solid"
              size="lg"
              w="100%"
              rightIcon={<HiArrowRight />}
            >
              Proceed to Checkout
            </Button>
            <Button
              as={RouterLink}
              to="/products"
              variant="outline"
              size="lg"
              w="100%"
            >
              Continue Shopping
            </Button>
          </VStack>

          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            Free shipping on all orders. No minimum purchase required!
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default CartPage;

