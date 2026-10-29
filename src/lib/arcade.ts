// Pixel-icon choices shared by the home page, service cards and service pages.
import type { PixelIconName } from '@/components/ui/pixel-icons'
import type { ServiceId } from '@/lib/routes'

export const SERVICE_ICON: Record<ServiceId, PixelIconName> = {
  'fractional-cto': 'flag',
  ai: 'chip',
  advisory: 'clipboard',
}
