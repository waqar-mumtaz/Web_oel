import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { useRef } from 'react';
import { productAPI, adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'clothing',
    stockQuantity: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: 'clothing',
      stockQuantity: 0,
    });
    setSelectedProduct(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    onOpen();
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stockQuantity: product.stockQuantity,
    });
    onOpen();
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    onDeleteOpen();
  };

  const handleSubmit = async () => {
    try {
      if (selectedProduct) {
        await adminAPI.updateProduct(selectedProduct._id, {
          ...formData,
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
        });
        toast({
          title: 'Product updated',
          status: 'success',
          duration: 2000,
        });
      } else {
        await adminAPI.createProduct({
          ...formData,
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
        });
        toast({
          title: 'Product created',
          status: 'success',
          duration: 2000,
        });
      }
      onClose();
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await adminAPI.deleteProduct(selectedProduct._id);
      toast({
        title: 'Product deleted',
        status: 'success',
        duration: 2000,
      });
      onDeleteClose();
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const categoryColors = {
    clothing: 'purple',
    books: 'blue',
    electronics: 'teal',
    pets: 'orange',
  };

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Box>
          <Heading size="lg" fontFamily="heading" color="gray.800">
            Products
          </Heading>
          <Text color="gray.500">{products.length} products in store</Text>
        </Box>
        <Button
          leftIcon={<HiOutlinePlus />}
          variant="solid"
          onClick={handleOpenCreate}
        >
          Add Product
        </Button>
      </HStack>

      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
        <Table>
          <Thead bg="gray.50">
            <Tr>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td>
                  <HStack spacing={3}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Text fontWeight="500" noOfLines={1} maxW="200px">
                      {product.name}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Badge
                    colorScheme={categoryColors[product.category]}
                    borderRadius="full"
                    px={2}
                    textTransform="capitalize"
                  >
                    {product.category}
                  </Badge>
                </Td>
                <Td isNumeric fontWeight="600">
                  ${product.price.toFixed(2)}
                </Td>
                <Td isNumeric>
                  <Text
                    color={product.stockQuantity <= 5 ? 'red.500' : 'gray.700'}
                    fontWeight={product.stockQuantity <= 5 ? '600' : '400'}
                  >
                    {product.stockQuantity}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<HiOutlinePencil />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handleOpenEdit(product)}
                      aria-label="Edit product"
                    />
                    <IconButton
                      icon={<HiOutlineTrash />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleOpenDelete(product)}
                      aria-label="Delete product"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </FormControl>

              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Price ($)</FormLabel>
                  <NumberInput
                    min={0}
                    precision={2}
                    value={formData.price}
                    onChange={(valueString) =>
                      setFormData({ ...formData, price: valueString })
                    }
                  >
                    <NumberInputField placeholder="0.00" />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Stock Quantity</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.stockQuantity}
                    onChange={(valueString) =>
                      setFormData({
                        ...formData,
                        stockQuantity: valueString,
                      })
                    }
                  >
                    <NumberInputField placeholder="0" />
                  </NumberInput>
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="electronics">Electronics</option>
                  <option value="pets">Pets</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" onClick={handleSubmit}>
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Product</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{selectedProduct?.name}"? This
              action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default AdminProductsPage;

