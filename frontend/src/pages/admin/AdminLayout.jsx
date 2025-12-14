import { useEffect } from 'react';
import { Outlet, useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineLogout,
} from 'react-icons/hi';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HiOutlineViewGrid },
    { name: 'Products', path: '/admin/products', icon: HiOutlineCube },
    { name: 'Orders', path: '/admin/orders', icon: HiOutlineClipboardList },
  ];

  return (
    <Flex minH="100vh" bg="gray.100">
      {/* Sidebar */}
      <Box
        w="250px"
        bg="gray.900"
        color="white"
        py={6}
        display={{ base: 'none', md: 'block' }}
      >
        <VStack spacing={8} align="stretch">
          {/* Logo */}
          <HStack px={6} spacing={3}>
            <Box
              w={10}
              h={10}
              bg="brand.500"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontWeight="bold" fontSize="lg">
                S
              </Text>
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontWeight="600" fontSize="lg">
                ShopEase
              </Text>
              <Text fontSize="xs" color="gray.400">
                Admin Panel
              </Text>
            </VStack>
          </HStack>

          {/* Navigation */}
          <VStack spacing={1} px={3} align="stretch">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={item.icon} boxSize={5} />}
                  bg={isActive ? 'whiteAlpha.200' : 'transparent'}
                  color={isActive ? 'white' : 'gray.400'}
                  _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
                  borderRadius="lg"
                  px={4}
                  py={3}
                  h="auto"
                >
                  {item.name}
                </Button>
              );
            })}
          </VStack>

          {/* Logout */}
          <Box px={3} mt="auto" pt={8}>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Icon as={HiOutlineLogout} boxSize={5} />}
              color="gray.400"
              _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
              borderRadius="lg"
              px={4}
              py={3}
              h="auto"
              w="100%"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;

