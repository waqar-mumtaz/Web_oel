import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react';
import {
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineCurrencyDollar,
  HiArrowRight,
} from 'react-icons/hi';
import { productAPI, adminAPI } from '../../services/api';

const StatCard = ({ title, value, icon, color, bg }) => (
  <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
    <HStack spacing={4}>
      <Box
        w={14}
        h={14}
        bg={bg}
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={icon} boxSize={7} color={color} />
      </Box>
      <VStack align="start" spacing={0}>
        <Text color="gray.500" fontSize="sm">
          {title}
        </Text>
        <Text fontSize="2xl" fontWeight="700" color="gray.800">
          {value}
        </Text>
      </VStack>
    </HStack>
  </Box>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productAPI.getProducts(),
          adminAPI.getAllOrders(),
        ]);

        const totalRevenue = ordersRes.data.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setStats({
          totalProducts: productsRes.count,
          totalOrders: ordersRes.count,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="lg" fontFamily="heading" color="gray.800">
          Dashboard
        </Heading>
        <Text color="gray.500">Welcome back, Admin!</Text>
      </Box>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <StatCard
          title="Total Products"
          value={loading ? '...' : stats.totalProducts}
          icon={HiOutlineCube}
          color="purple.500"
          bg="purple.50"
        />
        <StatCard
          title="Total Orders"
          value={loading ? '...' : stats.totalOrders}
          icon={HiOutlineClipboardList}
          color="blue.500"
          bg="blue.50"
        />
        <StatCard
          title="Total Revenue"
          value={loading ? '...' : `$${stats.totalRevenue.toFixed(2)}`}
          icon={HiOutlineCurrencyDollar}
          color="green.500"
          bg="green.50"
        />
      </SimpleGrid>

      {/* Quick Actions */}
      <Box bg="white" borderRadius="xl" p={6} boxShadow="sm">
        <Heading size="md" mb={4} color="gray.800">
          Quick Actions
        </Heading>
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/admin/products"
            variant="solid"
            rightIcon={<HiArrowRight />}
          >
            Manage Products
          </Button>
          <Button
            as={RouterLink}
            to="/admin/orders"
            variant="outline"
            rightIcon={<HiArrowRight />}
          >
            View Orders
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AdminDashboardPage;

