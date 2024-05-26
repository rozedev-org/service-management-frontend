import { GlobalStyles } from '@/constants/Colors'
import { StyleFunctionProps, extendTheme } from '@chakra-ui/react'
export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-dm-sans)',
    body: 'var(--font-dm-sans)',
  },
  styles: {
    global: {
      body: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h1: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h2: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h3: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h4: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h5: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
      h6: {
        color: GlobalStyles().TEXT_COLOR_PRIMARY,
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: GlobalStyles().BG_COLOR_PRIMARY,
          color: GlobalStyles().TEXT_COLOR_PRIMARY,
          _hover: {
            bg: GlobalStyles().BG_COLOR_PRIMARY_HOVER,
          },
        },
        outline: {
          borderColor: GlobalStyles().BG_COLOR_PRIMARY,
          color: GlobalStyles().BG_COLOR_PRIMARY,
          _hover: {
            bg: GlobalStyles().BG_COLOR_PRIMARY_HOVER,
          },
        },
      },
    },
  },
})
