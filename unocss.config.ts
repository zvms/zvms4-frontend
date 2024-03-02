import {defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetUno({
            dark: 'class'
        }),
        presetIcons({
            cdn: 'https://esm.sh',
            scale: 1.2
        })
    ]
})