import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi';
import { adminAPI } from '../../services/api';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminAPI.login(credentials);
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="sm">
        <Box bg="gray.800" borderRadius="2xl" p={8} boxShadow="2xl">
          <VStack spacing={6}>
            {/* Logo */}
            <VStack spacing={2}>
              <Box
                w={12}
                h={12}
                bg="brand.500"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold" fontSize="xl">
                  S
                </Text>
              </Box>
              <Heading size="lg" color="white" fontFamily="heading">
                Admin Panel
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Sign in to manage your store
              </Text>
            </VStack>

            {error && (
              <Alert status="error" borderRadius="lg">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Box as="form" onSubmit={handleSubmit} w="100%">
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel color="gray.300">Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <HiOutlineUser color="gray" />
                    </InputLeftElement>
                    <Input
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                      }
                      bg="gray.700"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{ ring: 2, ringColor: 'brand.500' }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <HiOutlineLockClosed color="gray" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                      }
                      bg="gray.700"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{ ring: 2, ringColor: 'brand.500' }}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  w="100%"
                  size="lg"
                  variant="solid"
                  isLoading={loading}
                  loadingText="Signing in..."
                  mt={2}
                >
                  Sign In
                </Button>
              </VStack>
            </Box>

            <Text color="gray.500" fontSize="xs">
              Demo: admin / admin123
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLoginPage;

