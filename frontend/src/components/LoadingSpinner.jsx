import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="300px"
      w="100%"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.500" fontSize="sm">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;

