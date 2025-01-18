export interface RGB {
  red: number
  green: number
  blue: number
}

export interface HSL {
  hue: number
  saturation: number
  lightness: number
}

export function hexToRGB(hex: string): RGB {
  const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!parsed) throw new Error('Invalid HEX color')
  return {
    red: parseInt(parsed[1], 16),
    green: parseInt(parsed[2], 16),
    blue: parseInt(parsed[3], 16)
  }
}

export function hslToRgb(hsl: HSL): RGB {
  const { hue, saturation, lightness } = hsl
  const a = saturation * Math.min(lightness, 1 - lightness)
  const f = (n: number) => {
    const k = (n + hue / 30) % 12
    const color = lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(color * 255)
  }
  return { red: f(0), green: f(8), blue: f(4) }
}

export function rgbToHex({ red, green, blue }: RGB): string {
  const toHex = (value: number) => value.toString(16).padStart(2, '0')
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}

export const rgbBlack: RGB = { red: 0, green: 0, blue: 0 }
export const rgbWhite: RGB = { red: 255, green: 255, blue: 255 }

export function genMixColor(base: string | RGB | HSL): {
  DEFAULT: string
  dark: Record<number, string>
  light: Record<number, string>
} {
  // Convert base color to RGB
  if (typeof base === 'string') {
    base = hexToRGB(base)
  } else if ('hue' in base) {
    base = hslToRgb(base)
  }

  // Function to generate mixed colors
  function generateMixedColors(
    base: RGB,
    mixColor: RGB,
    weights: number[]
  ): Record<number, string> {
    return weights.reduce(
      (acc, weight, index) => {
        acc[index + 1] = rgbToHex({
          red: base.red * (1 - weight) + mixColor.red * weight,
          green: base.green * (1 - weight) + mixColor.green * weight,
          blue: base.blue * (1 - weight) + mixColor.blue * weight
        })
        return acc
      },
      {} as Record<number, string>
    )
  }

  const weights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.78, 0.85]
  return {
    DEFAULT: rgbToHex(base),
    dark: generateMixedColors(base, rgbBlack, weights),
    light: generateMixedColors(base, rgbWhite, weights)
  }
}
