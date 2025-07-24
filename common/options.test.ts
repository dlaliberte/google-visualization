import { describe, it, expect } from 'vitest';
import { Options } from '../common/options';

describe('Options Class High-Level Functionality', () => {
  it('should create an instance of Options with default values', () => {
    const options = new Options([]);
    expect(options).toBeInstanceOf(Options);
  });

  it('should create a view with a specified path', () => {
    const options = new Options([]);
    const view = options.view('test.path');
    expect(view).toBeInstanceOf(Options);
  });

  it('should canonicalize paths correctly', () => {
    const options = new Options([]);
    const canonicalPath = options.canonicalizePaths('test.path');
    expect(canonicalPath).toEqual(['test.path']);
  });

  it('should combine paths correctly', () => {
    const combinedPath = Options.combinePaths('a', 'b');
    expect(combinedPath).toEqual(['a.b']);
  });

  it('should handle empty paths correctly in combinePaths', () => {
    const combinedPath = Options.combinePaths('', 'b');
    expect(combinedPath).toEqual(['b']);
  });

  it('should handle array paths correctly in combinePaths', () => {
    const combinedPath = Options.combinePaths(['a', 'b'], ['c', 'd']);
    expect(combinedPath).toEqual(['a.c', 'a.d', 'b.c', 'b.d']);
  });
});
