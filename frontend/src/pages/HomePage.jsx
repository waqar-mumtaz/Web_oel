import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineDesktopComputer,
  HiOutlineHeart,
  HiArrowRight,
} from 'react-icons/hi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productAPI.getProducts({ inStock: 'true' });
        // Get first 4 products as featured
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      id: 'clothing',
      name: 'Clothing',
      icon: HiOutlineSparkles,
      color: 'purple.500',
      bg: 'purple.50',
    },
    {
      id: 'books',
      name: 'Books',
      icon: HiOutlineBookOpen,
      color: 'blue.500',
      bg: 'blue.50',
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: HiOutlineDesktopComputer,
      color: 'teal.500',
      bg: 'teal.50',
    },
    {
      id: 'pets',
      name: 'Pets',
      icon: HiOutlineHeart,
      color: 'orange.500',
      bg: 'orange.50',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #f0f9f4 0%, #d8f0e3 50%, #fff8f1 100%)"
        pt={{ base: 12, md: 20 }}
        pb={{ base: 16, md: 24 }}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
            <Heading
              as="h1"
              size={{ base: 'xl', md: '2xl' }}
              fontFamily="heading"
              color="gray.800"
              lineHeight="shorter"
            >
              Discover Products{' '}
              <Text as="span" color="brand.500">
                You'll Love
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="lg">
              Shop our curated collection of clothing, books, electronics, and pet supplies.
              Quality products at great prices.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/products"
                size="lg"
                variant="solid"
                rightIcon={<HiArrowRight />}
              >
                Shop Now
              </Button>
              <Button
                as={RouterLink}
                to="/products"
                size="lg"
                variant="outline"
              >
                Browse All
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
        <VStack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Heading size="lg" fontFamily="heading" color="gray.800">
              Shop by Category
            </Heading>
            <Text color="gray.500">Find exactly what you're looking for</Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="100%">
            {categories.map((category) => (
              <Box
                key={category.id}
                as={RouterLink}
                to={`/products?category=${category.id}`}
                bg="white"
                borderRadius="2xl"
                p={6}
                textAlign="center"
                boxShadow="sm"
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: 'lg',
                  transform: 'translateY(-4px)',
                }}
              >
                <VStack spacing={4}>
                  <Box
                    w={16}
                    h={16}
                    bg={category.bg}
                    borderRadius="2xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={category.icon} boxSize={8} color={category.color} />
                  </Box>
                  <Text fontWeight="600" color="gray.700">
                    {category.name}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Featured Products Section */}
      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <HStack justify="space-between" w="100%">
              <VStack align="start" spacing={1}>
                <Heading size="lg" fontFamily="heading" color="gray.800">
                  Featured Products
                </Heading>
                <Text color="gray.500">Our top picks for you</Text>
              </VStack>
              <Button
                as={RouterLink}
                to="/products"
                variant="ghost"
                rightIcon={<HiArrowRight />}
                color="brand.500"
              >
                View All
              </Button>
            </HStack>

            {loading ? (
              <LoadingSpinner message="Loading products..." />
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} w="100%">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </SimpleGrid>
            )}
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bg="brand.500"
        py={{ base: 12, md: 16 }}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="lg" fontFamily="heading" color="white">
              Ready to Start Shopping?
            </Heading>
            <Text color="whiteAlpha.900" maxW="lg">
              Browse our complete collection and find everything you need.
            </Text>
            <Button
              as={RouterLink}
              to="/products"
              size="lg"
              bg="white"
              color="brand.500"
              _hover={{ bg: 'gray.100' }}
              rightIcon={<HiArrowRight />}
            >
              Explore Products
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

