import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Badge,
  Container,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react';
import { HiOutlineShoppingBag, HiOutlineMenu } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px"
      borderColor="gray.100"
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(10px)"
      backgroundColor="rgba(255, 255, 255, 0.9)"
    >
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: 'none' }}
          >
            <HStack spacing={2}>
              <Box
                w={8}
                h={8}
                bg="brand.500"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  S
                </Text>
              </Box>
              <Text
                fontSize="xl"
                fontWeight="600"
                fontFamily="heading"
                color="gray.800"
              >
                ShopEase
              </Text>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                as={RouterLink}
                to={link.path}
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _hover={{ color: 'brand.500' }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Cart & Mobile Menu */}
          <HStack spacing={4}>
            <Link as={RouterLink} to="/cart" position="relative">
              <IconButton
                icon={<HiOutlineShoppingBag size={24} />}
                variant="ghost"
                aria-label="Shopping cart"
                color="gray.600"
                _hover={{ color: 'brand.500', bg: 'brand.50' }}
              />
              {totalItems > 0 && (
                <Badge
                  position="absolute"
                  top={-1}
                  right={-1}
                  colorScheme="orange"
                  borderRadius="full"
                  minW={5}
                  h={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  bg="accent.500"
                  color="white"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>

            <IconButton
              icon={<HiOutlineMenu size={24} />}
              variant="ghost"
              aria-label="Menu"
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              color="gray.600"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontFamily="heading">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  fontSize="lg"
                  fontWeight="500"
                  color="gray.700"
                  onClick={onClose}
                  _hover={{ color: 'brand.500' }}
                  py={2}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                as={RouterLink}
                to="/cart"
                fontSize="lg"
                fontWeight="500"
                color="gray.700"
                onClick={onClose}
                _hover={{ color: 'brand.500' }}
                py={2}
              >
                Cart ({totalItems})
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;

