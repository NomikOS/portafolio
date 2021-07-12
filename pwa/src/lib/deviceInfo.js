import * as info from 'mobile-device-detect'

export function deviceInfo() {
  return info
}

export const isMobile = info.isMobile
