import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetTypography,
  presetWebFonts
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class'
    }),
    presetIcons({
      cdn: 'https://esm.sh',
      scale: 1.2
    }),
    presetAttributify(),
    presetTypography(),
    presetWebFonts()
  ]
})
