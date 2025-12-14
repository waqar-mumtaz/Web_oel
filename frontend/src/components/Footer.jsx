import { Box, Container, Text, HStack, Link, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={10} mt="auto">
      <Container maxW="container.xl">
        <VStack spacing={6}>
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
            <Text fontSize="xl" fontWeight="600" fontFamily="heading">
              ShopEase
            </Text>
          </HStack>
          
          <HStack spacing={8} color="gray.400">
            <Link href="#" _hover={{ color: 'white' }}>About</Link>
            <Link href="#" _hover={{ color: 'white' }}>Contact</Link>
            <Link href="#" _hover={{ color: 'white' }}>Privacy</Link>
            <Link href="#" _hover={{ color: 'white' }}>Terms</Link>
          </HStack>
          
          <Text fontSize="sm" color="gray.500">
            © 2024 ShopEase. All rights reserved. A Mini E-Commerce Project.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;

