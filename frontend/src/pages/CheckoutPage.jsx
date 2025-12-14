import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Divider,
  Image,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { HiArrowLeft, HiOutlineLockClosed } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { orderAPI } from '../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        customerInfo: formData,
      };

      const response = await orderAPI.createOrder(orderData);
      
      dispatch(clearCart());
      
      toast({
        title: 'Order placed successfully!',
        description: 'Thank you for your purchase.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(`/order-confirmation/${response.data._id}`);
    } catch (error) {
      toast({
        title: 'Order failed',
        description: error.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Box py={{ base: 10, md: 20 }}>
        <Container maxW="container.md">
          <VStack spacing={6} textAlign="center">
            <Heading size="lg" fontFamily="heading" color="gray.700">
              Your cart is empty
            </Heading>
            <Text color="gray.500">
              Add some items to your cart before checking out.
            </Text>
            <Button as={RouterLink} to="/products" variant="solid" size="lg">
              Browse Products
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 6, md: 10 }}>
      <Container maxW="container.lg">
        <Button
          as={RouterLink}
          to="/cart"
          variant="ghost"
          leftIcon={<HiArrowLeft />}
          mb={6}
        >
          Back to Cart
        </Button>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Checkout Form */}
          <VStack spacing={6} align="stretch">
            <Heading size="lg" fontFamily="heading" color="gray.800">
              Checkout
            </Heading>

            <Box
              as="form"
              onSubmit={handleSubmit}
              bg="white"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
            >
              <VStack spacing={5}>
                <Heading size="sm" w="100%" color="gray.700">
                  Contact Information
                </Heading>

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <Divider my={2} />

                <Heading size="sm" w="100%" color="gray.700">
                  Shipping Address
                </Heading>

                <FormControl isInvalid={!!errors.address}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>

                <HStack w="100%" spacing={4}>
                  <FormControl isInvalid={!!errors.city}>
                    <FormLabel>City</FormLabel>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.postalCode}>
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                    <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
                  </FormControl>
                </HStack>

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  w="100%"
                  mt={4}
                  leftIcon={<HiOutlineLockClosed />}
                  isLoading={loading}
                  loadingText="Placing Order..."
                >
                  Place Order
                </Button>
              </VStack>
            </Box>

            <Alert status="info" borderRadius="lg">
              <AlertIcon />
              This is a demo checkout. No real payment is processed.
            </Alert>
          </VStack>

          {/* Order Summary */}
          <Box>
            <VStack spacing={6} align="stretch" position="sticky" top="100px">
              <Heading size="lg" fontFamily="heading" color="gray.800">
                Order Summary
              </Heading>

              <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
                <VStack spacing={4} align="stretch">
                  {items.map((item) => (
                    <HStack key={item._id} spacing={4}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="lg"
                      />
                      <VStack flex={1} align="start" spacing={0}>
                        <Text fontWeight="500" noOfLines={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Qty: {item.quantity}
                        </Text>
                      </VStack>
                      <Text fontWeight="600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                  ))}

                  <Divider />

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
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;

