import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'DM Sans', sans-serif`,
  },
  colors: {
    brand: {
      50: '#f0f9f4',
      100: '#d8f0e3',
      200: '#b3e0c9',
      300: '#82c9a7',
      400: '#52ab81',
      500: '#338f65',
      600: '#257350',
      700: '#1f5c42',
      800: '#1b4a36',
      900: '#173d2e',
    },
    accent: {
      50: '#fff8f1',
      100: '#feead6',
      200: '#fcd2ac',
      300: '#f9b277',
      400: '#f58840',
      500: '#f26a1b',
      600: '#e35011',
      700: '#bc3b10',
      800: '#952f15',
      900: '#792914',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#fafaf9',
        color: '#1a1a1a',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          },
          transition: 'all 0.2s',
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        accent: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          overflow: 'hidden',
          boxShadow: 'sm',
          transition: 'all 0.3s ease',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            borderColor: 'gray.200',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
  },
});

export default theme;

