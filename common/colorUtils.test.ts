/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { blendColors, parseToRgb, rgbToHex } from './colorUtils';

describe('parseToRgb', () => {
  it('should parse a hex color string to RGB', () => {
    expect(parseToRgb('#ff0000')).toEqual([255, 0, 0]);
    expect(parseToRgb('#00ff00')).toEqual([0, 255, 0]);
    expect(parseToRgb('#0000ff')).toEqual([0, 0, 255]);
    expect(parseToRgb('#ffffff')).toEqual([255, 255, 255]);
    expect(parseToRgb('#000000')).toEqual([0, 0, 0]);
  });

  it('should throw an error for an invalid color format', () => {
    expect(() => parseToRgb('ff0000')).toThrow('Invalid color format: ff0000');
  });
});

describe('rgbToHex', () => {
  it('should convert RGB values to a hex color string', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
  });
});

describe('blendColors', () => {
  it('should blend two colors', () => {
    const color1 = '#ff0000';
    const color2 = '#0000ff';
    const factor = 0.5;
    const blendedColor = blendColors(color1, color2, factor);
    expect(blendedColor).toBe('#800080');
  });

  it('should return color1 when factor is 1', () => {
    const color1 = '#ff0000';
    const color2 = '#0000ff';
    const factor = 1;
    const blendedColor = blendColors(color1, color2, factor);
    expect(blendedColor).toBe(color1);
  });

  it('should return color2 when factor is 0', () => {
    const color1 = '#ff0000';
    const color2 = '#0000ff';
    const factor = 0;
    const blendedColor = blendColors(color1, color2, factor);
    expect(blendedColor).toBe(color2);
  });
});
