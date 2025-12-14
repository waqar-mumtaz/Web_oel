import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Divider,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  HiOutlineShoppingCart,
  HiChevronRight,
  HiOutlineCheck,
  HiOutlineX,
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productAPI.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found or failed to load.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stockQuantity <= 0) {
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
      title: 'Added to cart!',
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

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <LoadingSpinner message="Loading product details..." />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxW="container.xl" py={10}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          {error || 'Product not found'}
        </Alert>
        <Button as={RouterLink} to="/products" mt={4} variant="outline">
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Box py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        {/* Breadcrumb */}
        <Breadcrumb
          spacing={2}
          separator={<HiChevronRight color="gray.500" />}
          mb={8}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/" color="gray.500">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/products" color="gray.500">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.800" fontWeight="500">
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Product Details */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Product Image */}
          <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="sm"
          >
            <Image
              src={product.image}
              alt={product.name}
              w="100%"
              h={{ base: '300px', md: '500px' }}
              objectFit="cover"
            />
          </Box>

          {/* Product Info */}
          <VStack align="stretch" spacing={6}>
            <VStack align="start" spacing={3}>
              <Badge
                colorScheme={categoryColors[product.category] || 'gray'}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="sm"
                textTransform="capitalize"
              >
                {product.category}
              </Badge>
              <Heading
                size="xl"
                fontFamily="heading"
                color="gray.800"
                lineHeight="shorter"
              >
                {product.name}
              </Heading>
              <Text fontSize="3xl" fontWeight="700" color="brand.600">
                ${product.price.toFixed(2)}
              </Text>
            </VStack>

            <Divider />

            <VStack align="start" spacing={4}>
              <Text fontWeight="600" color="gray.700">
                Description
              </Text>
              <Text color="gray.600" lineHeight="tall">
                {product.description}
              </Text>
            </VStack>

            <Divider />

            {/* Stock Status */}
            <HStack spacing={2}>
              {product.stockQuantity > 0 ? (
                <>
                  <HiOutlineCheck color="green" size={20} />
                  <Text color="green.600" fontWeight="500">
                    In Stock ({product.stockQuantity} available)
                  </Text>
                </>
              ) : (
                <>
                  <HiOutlineX color="red" size={20} />
                  <Text color="red.500" fontWeight="500">
                    Out of Stock
                  </Text>
                </>
              )}
            </HStack>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              variant="solid"
              leftIcon={<HiOutlineShoppingCart size={20} />}
              onClick={handleAddToCart}
              isDisabled={product.stockQuantity <= 0}
              w={{ base: '100%', md: 'auto' }}
              px={10}
            >
              Add to Cart
            </Button>

            {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
              <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                Only {product.stockQuantity} left in stock - order soon!
              </Alert>
            )}
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;

