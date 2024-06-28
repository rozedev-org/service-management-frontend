import { useColorModeValue } from '@chakra-ui/react'

export const GlobalStyles = () => {
  const BG_COLOR_PRIMARY = '#0f0f0f'
  const BG_COLOR_PRIMARY_HOVER = '#1ABC9C'

  const BG_COLOR_SECONDARY = '#0f0f0f'

  const TEXT_COLOR_PRIMARY = 'white'
  const BOX_SHADOW = 'dark-lg'
  return {
    BG_COLOR_PRIMARY,
    BG_COLOR_PRIMARY_HOVER,
    BG_COLOR_SECONDARY,
    BOX_SHADOW,
    TEXT_COLOR_PRIMARY,
  }
}

// /* Color Theme Swatches in Hex */
// .Salesforce-CRM---SaaS-&-UX-UI-Design-1-hex { color: #5581D9; }
// .Salesforce-CRM---SaaS-&-UX-UI-Design-2-hex { color: #5E88BF; }
// .Salesforce-CRM---SaaS-&-UX-UI-Design-3-hex { color: #D7F205; }
// .Salesforce-CRM---SaaS-&-UX-UI-Design-4-hex { color: #F2E205; }
// .Salesforce-CRM---SaaS-&-UX-UI-Design-5-hex { color: #262626; }
