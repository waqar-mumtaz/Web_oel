import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/api';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get filters from URL
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || 'all';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (categoryFilter && categoryFilter !== 'all') params.category = categoryFilter;

      const response = await productAPI.getProducts(params);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  return (
    <Box py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={2} align="start">
            <Heading size="xl" fontFamily="heading" color="gray.800">
              All Products
            </Heading>
            <Text color="gray.500">
              {loading
                ? 'Loading...'
                : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
            </Text>
          </VStack>

          {/* Search & Filters */}
          <VStack spacing={4} align="stretch">
            <Box maxW="lg">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by name or description..."
              />
            </Box>
            <CategoryFilter
              selectedCategory={categoryFilter}
              onCategoryChange={handleCategoryChange}
            />
          </VStack>

          {/* Active Filters */}
          {(searchQuery || (categoryFilter && categoryFilter !== 'all')) && (
            <HStack spacing={2} flexWrap="wrap">
              <Text fontSize="sm" color="gray.500">
                Active filters:
              </Text>
              {searchQuery && (
                <Box
                  bg="brand.50"
                  color="brand.700"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  Search: "{searchQuery}"
                </Box>
              )}
              {categoryFilter && categoryFilter !== 'all' && (
                <Box
                  bg="brand.50"
                  color="brand.700"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  Category: {categoryFilter}
                </Box>
              )}
            </HStack>
          )}

          {/* Products Grid */}
          {loading ? (
            <LoadingSpinner message="Loading products..." />
          ) : error ? (
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              {error}
            </Alert>
          ) : products.length === 0 ? (
            <Box textAlign="center" py={16}>
              <VStack spacing={4}>
                <Text fontSize="6xl">🔍</Text>
                <Heading size="md" color="gray.600">
                  No products found
                </Heading>
                <Text color="gray.500">
                  Try adjusting your search or filter criteria
                </Text>
              </VStack>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductsPage;

