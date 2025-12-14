import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      toast({
        title: 'Status updated',
        status: 'success',
        duration: 2000,
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleOpenDelete = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      await adminAPI.deleteOrder(selectedOrder._id);
      toast({
        title: 'Order deleted',
        status: 'success',
        duration: 2000,
      });
      onClose();
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const statusColors = {
    pending: 'yellow',
    processing: 'blue',
    shipped: 'purple',
    delivered: 'green',
    cancelled: 'red',
  };

  if (loading) {
    return <LoadingSpinner message="Loading orders..." />;
  }

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="lg" fontFamily="heading" color="gray.800">
          Orders
        </Heading>
        <Text color="gray.500">{orders.length} orders received</Text>
      </Box>

      {orders.length === 0 ? (
        <Box bg="white" borderRadius="xl" p={10} textAlign="center">
          <Text color="gray.500">No orders yet</Text>
        </Box>
      ) : (
        <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
          <Table>
            <Thead bg="gray.50">
              <Tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Items</Th>
                <Th isNumeric>Total</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>
                    <Text fontFamily="mono" fontSize="sm" color="gray.600">
                      #{order._id.slice(-8).toUpperCase()}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="500">{order.customerInfo.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {order.customerInfo.email}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Accordion allowToggle>
                      <AccordionItem border="none">
                        <AccordionButton px={0} _hover={{ bg: 'transparent' }}>
                          <Text fontSize="sm" color="brand.500">
                            {order.items.length} item(s)
                          </Text>
                          <AccordionIcon ml={1} />
                        </AccordionButton>
                        <AccordionPanel px={0}>
                          <VStack align="start" spacing={2} mt={2}>
                            {order.items.map((item, index) => (
                              <HStack key={index} spacing={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  boxSize="30px"
                                  objectFit="cover"
                                  borderRadius="md"
                                />
                                <Text fontSize="sm" noOfLines={1}>
                                  {item.name} x{item.quantity}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Td>
                  <Td isNumeric fontWeight="600">
                    ${order.totalAmount.toFixed(2)}
                  </Td>
                  <Td>
                    <Select
                      size="sm"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      w="130px"
                      borderRadius="lg"
                      bg={`${statusColors[order.status]}.50`}
                      borderColor={`${statusColors[order.status]}.200`}
                      fontWeight="500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                  </Td>
                  <Td>
                    <IconButton
                      icon={<HiOutlineTrash />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleOpenDelete(order)}
                      aria-label="Delete order"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Order</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete order #
              {selectedOrder?._id.slice(-8).toUpperCase()}? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
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

export default AdminOrdersPage;

