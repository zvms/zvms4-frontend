import { defineStore } from 'pinia'
import { genMixColor } from './../themes/shared/color-calculator'

type Theme = Partial<{
  primary: string
  secondary: string
  success: string
  warning: string
  danger: string
  info: string
}>

// Helper function to set a CSS variable
function setStyleProperty(propName: string, value: string) {
  document.documentElement.style.setProperty(propName, value)
}

// Update theme color variables
function updateThemeColorVar(colors: Theme) {
  Object.entries(colors).forEach(([brand, color]) => {
    updateBrandExtendColorsVar(color as string, brand)
  })
}

// Update CSS variables for a specific color brand
function updateBrandExtendColorsVar(color: string, name: string) {
  const { DEFAULT, dark, light } = genMixColor(color)

  // Define mappings for CSS variable updates
  const variableMappings = {
    [`--${name}-lighter-color`]: light[5],
    [`--${name}-light-color`]: light[3],
    [`--${name}-color`]: DEFAULT,
    [`--${name}-deep-color`]: dark[2],
    [`--${name}-deeper-color`]: dark[4],

    // Element Plus theme color updates
    [`--el-color-${name}`]: DEFAULT,
    [`--el-color-${name}-dark-2`]: dark[2],
    [`--el-color-${name}-light-3`]: light[3],
    [`--el-color-${name}-light-5`]: light[5],
    [`--el-color-${name}-light-7`]: light[7],
    [`--el-color-${name}-light-8`]: light[8],
    [`--el-color-${name}-light-9`]: light[9]
  }

  // Set all CSS variables
  Object.entries(variableMappings).forEach(([prop, value]) => {
    setStyleProperty(prop, value)
  })
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
    highContrast: false,
    colors: {
      primary: '#409EFF',
      secondary: '#9B85B6',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399'
    } as Theme,
    gallery: {
      default: {
        text: 'Default Theme',
        short: 'Default',
        primary: '#409EFF',
        secondary: '#9B85B6',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399'
      },
      zhzx: {
        text: 'Zhenhai High School of Zhejiang',
        short: 'ZHZX',
        primary: '#911B1A'
      },
      jcsy: {
        text: 'Jiaochuan Academy of Ningbo',
        short: 'JCSY',
        primary: '#1F4A39'
      },
      mit: {
        text: 'Massachusetts Institute of Technology',
        short: 'MIT',
        primary: '#A31F34'
      },
      harvard: {
        text: 'Harvard University',
        short: 'Harvard',
        primary: '#A31F36'
      },
      stanford: {
        text: 'Stanford University',
        short: 'Stanford',
        primary: '#8C1515'
      },
      princeton: {
        text: 'Princeton University',
        short: 'Princeton',
        primary: '#FF6000'
      },
      caltech: {
        text: 'California Institute of Technology',
        short: 'Caltech',
        primary: '#FF6C0C'
      },
      columbia: {
        text: 'Columbia University in the City of New York',
        short: 'Columbia',
        primary: '#B9D9EB'
      },
      cmu: {
        text: 'Carnegie Mellon University',
        short: 'CMU',
        primary: '#CC002B'
      },
      tsinghua: {
        text: 'Tsinghua University',
        short: 'THU',
        primary: '#800080'
      },
      peking: {
        text: 'Peking University',
        short: 'PKU',
        primary: '#94070A'
      },
      sjtu: {
        text: 'Shanghai Jiao Tong University',
        short: 'SJTU',
        primary: '#B22237'
      },
      fdu: {
        text: 'Fudan University',
        short: 'FDU',
        primary: '#1649A3'
      },
      zju: {
        text: 'Zhejiang University',
        short: 'ZJU',
        primary: '#1456A9'
      }
    } as Record<
      string,
      Theme & {
        text: string
        short: string
      }
    >
  }),
  actions: {
    setTheme(theme: Theme) {
      this.colors = theme || this.gallery.default
      updateThemeColorVar(this.colors)
    }
  }
})
