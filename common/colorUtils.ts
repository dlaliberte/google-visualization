// Utility functions for color manipulation

/**
 * Parses a color string into an RGB array.
 * @param color The color string to parse.
 * @returns An array representing the RGB values.
 */
export function parseToRgb(color: string): number[] {
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    // Handle 3-character hex colors like #fff
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  // Handle RGB color strings like rgb(255, 0, 255)
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  }

  throw new Error(`Invalid color format: ${color}`);
}

/**
 * Converts RGB values to a hex color string.
 * @param r Red value.
 * @param g Green value.
 * @param b Blue value.
 * @returns The hex color string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Blends two colors together using a specified factor.
 * @param color1 First color as hex string.
 * @param color2 Second color as hex string.
 * @param factor The weight to be given to color1 over color2 (0 = all color2, 1 = all color1).
 * @returns The blended color as a hex string.
 */
export function blendColors(color1: string, color2: string, factor: number): string {
  const rgb1 = parseToRgb(color1);
  const rgb2 = parseToRgb(color2);
  const r = Math.round(rgb1[0] * factor + rgb2[0] * (1 - factor));
  const g = Math.round(rgb1[1] * factor + rgb2[1] * (1 - factor));
  const b = Math.round(rgb1[2] * factor + rgb2[2] * (1 - factor));
  return rgbToHex(r, g, b);
}
