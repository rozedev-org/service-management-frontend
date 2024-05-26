import { useColorModeValue } from '@chakra-ui/react'

export const GlobalStyles = () => {
  const BG_COLOR_PRIMARY = '#16A085'
  const BG_COLOR_PRIMARY_HOVER = '#1ABC9C'

  const BG_COLOR_SECONDARY = '#2C3D50'

  const TEXT_COLOR_PRIMARY = '#ECF0F1'
  const BOX_SHADOW = 'dark-lg'
  return {
    BG_COLOR_PRIMARY,
    BG_COLOR_PRIMARY_HOVER,
    BG_COLOR_SECONDARY,
    BOX_SHADOW,
    TEXT_COLOR_PRIMARY,
  }
}
