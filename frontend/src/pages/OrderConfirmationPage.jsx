import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Divider,
  Badge,
  Image,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';
import { orderAPI } from '../services/api';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details.');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <Container maxW="container.md" py={20}>
        <LoadingSpinner message="Loading order details..." />
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxW="container.md" py={20}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          {error || 'Order not found'}
        </Alert>
        <Button as={RouterLink} to="/" mt={4} variant="solid">
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Box py={{ base: 10, md: 20 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          {/* Success Header */}
          <VStack spacing={4} textAlign="center">
            <Box
              w={20}
              h={20}
              bg="green.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={HiOutlineCheckCircle} boxSize={12} color="green.500" />
            </Box>
            <Heading size="xl" fontFamily="heading" color="gray.800">
              Order Confirmed!
            </Heading>
            <Text color="gray.500" maxW="md">
              Thank you for your purchase. We've received your order and will begin processing it right away.
            </Text>
          </VStack>

          {/* Order Details */}
          <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontWeight="600" color="gray.700">Order ID</Text>
                <Text fontFamily="mono" color="brand.600">
                  #{order._id.slice(-8).toUpperCase()}
                </Text>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontWeight="600" color="gray.700">Status</Text>
                <Badge colorScheme="green" borderRadius="full" px={3} py={1}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontWeight="600" color="gray.700">Date</Text>
                <Text color="gray.600">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </HStack>

              <Divider my={2} />

              <Text fontWeight="600" color="gray.700">Items</Text>
              
              <VStack spacing={3} align="stretch">
                {order.items.map((item, index) => (
                  <HStack key={index} spacing={4}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack flex={1} align="start" spacing={0}>
                      <Text fontWeight="500" fontSize="sm" noOfLines={1}>
                        {item.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </Text>
                    </VStack>
                    <Text fontWeight="600" fontSize="sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              <Divider my={2} />

              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="600">Total</Text>
                <Text fontSize="xl" fontWeight="700" color="brand.600">
                  ${order.totalAmount.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Shipping Info */}
          <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
            <VStack spacing={3} align="start">
              <Text fontWeight="600" color="gray.700">Shipping Address</Text>
              <Box color="gray.600">
                <Text>{order.customerInfo.name}</Text>
                <Text>{order.customerInfo.email}</Text>
                <Text>{order.customerInfo.address}</Text>
                <Text>{order.customerInfo.city}, {order.customerInfo.postalCode}</Text>
              </Box>
            </VStack>
          </Box>

          {/* Actions */}
          <VStack spacing={4}>
            <Button
              as={RouterLink}
              to="/products"
              variant="solid"
              size="lg"
              w="100%"
              rightIcon={<HiArrowRight />}
            >
              Continue Shopping
            </Button>
            <Button
              as={RouterLink}
              to="/"
              variant="outline"
              size="lg"
              w="100%"
            >
              Back to Home
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderConfirmationPage;

