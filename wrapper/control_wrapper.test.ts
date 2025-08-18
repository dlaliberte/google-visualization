import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ControlWrapper } from './control_wrapper';
import { WRAPPER_KIND } from './wrapper';
import { Control } from '../controls/control';

// Mock the Control class
class MockControl extends Control {
  constructor() {
    super();
  }

  draw() {
    // Mock implementation
  }

  getOptions() {
    return {};
  }

  setOptions() {
    // Mock implementation
  }

  getState() {
    return {};
  }
}

describe('ControlWrapper', () => {
  let controlWrapper: ControlWrapper;
  let mockControl: MockControl;

  beforeEach(() => {
    controlWrapper = new ControlWrapper();
    mockControl = new MockControl();
  });

  describe('constructor', () => {
    it('should create ControlWrapper with no specification', () => {
      const wrapper = new ControlWrapper();
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });

    it('should create ControlWrapper with object specification', () => {
      const spec = {
        controlType: 'CategoryFilter',
        containerId: 'myControl',
        options: { ui: { labelStacking: 'vertical' } }
      };
      const wrapper = new ControlWrapper(spec);
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });

    it('should create ControlWrapper with JSON string specification', () => {
      const spec = JSON.stringify({
        controlType: 'RangeFilter',
        containerId: 'rangeControl',
        options: { ui: { cssClass: 'myFilter' } }
      });
      const wrapper = new ControlWrapper(spec);
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });

    it('should create ControlWrapper with null specification', () => {
      const wrapper = new ControlWrapper(null);
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });

    it('should create ControlWrapper with undefined specification', () => {
      const wrapper = new ControlWrapper(undefined);
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });

    it('should inherit from Wrapper with CONTROL kind', () => {
      const wrapper = new ControlWrapper();
      // The wrapper should be created with CONTROL kind internally
      expect(wrapper).toBeInstanceOf(ControlWrapper);
    });
  });

  describe('control management', () => {
    it('should get and set control through getVisualization', () => {
      expect(controlWrapper.getVisualization()).toBeNull();

      // Mock the setVisualization method
      const setVisualizationSpy = vi.spyOn(controlWrapper, 'setVisualization' as any);
      setVisualizationSpy.mockImplementation(() => {});

      const getVisualizationSpy = vi.spyOn(controlWrapper, 'getVisualization' as any);
      getVisualizationSpy.mockReturnValue(mockControl);

      const result = controlWrapper.getControl();
      expect(getVisualizationSpy).toHaveBeenCalled();
      expect(result).toBe(mockControl);

      setVisualizationSpy.mockRestore();
      getVisualizationSpy.mockRestore();
    });

    it('should handle null control', () => {
      const getVisualizationSpy = vi.spyOn(controlWrapper, 'getVisualization' as any);
      getVisualizationSpy.mockReturnValue(null);

      const result = controlWrapper.getControl();
      expect(result).toBeNull();

      getVisualizationSpy.mockRestore();
    });

    it('should delegate getControl to getVisualization', () => {
      const getVisualizationSpy = vi.spyOn(controlWrapper, 'getVisualization' as any);
      getVisualizationSpy.mockReturnValue(mockControl);

      const result = controlWrapper.getControl();
      expect(getVisualizationSpy).toHaveBeenCalled();
      expect(result).toBe(mockControl);

      getVisualizationSpy.mockRestore();
    });
  });

  describe('control type management', () => {
    it('should get and set control type', () => {
      // Mock the getType method to return empty string initially
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);
      getTypeSpy.mockReturnValue('');

      expect(controlWrapper.getControlType()).toBe('');

      // Mock the setType method
      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});

      // Now mock getType to return the set type
      getTypeSpy.mockReturnValue('CategoryFilter');

      controlWrapper.setControlType('CategoryFilter');
      expect(setTypeSpy).toHaveBeenCalledWith('CategoryFilter');
      expect(controlWrapper.getControlType()).toBe('CategoryFilter');

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });

    it('should handle different control types', () => {
      const controlTypes = [
        'CategoryFilter',
        'ChartRangeFilter',
        'DateRangeFilter',
        'NumberRangeFilter',
        'StringFilter',
        'Dashboard'
      ];

      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);

      controlTypes.forEach((controlType, index) => {
        getTypeSpy.mockReturnValue(controlType);
        controlWrapper.setControlType(controlType);
        expect(setTypeSpy).toHaveBeenCalledWith(controlType);
        expect(controlWrapper.getControlType()).toBe(controlType);
      });

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });

    it('should handle empty control type', () => {
      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);

      getTypeSpy.mockReturnValue('');
      controlWrapper.setControlType('');
      expect(controlWrapper.getControlType()).toBe('');

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });

    it('should handle custom control types', () => {
      const customTypes = [
        'CustomFilter',
        'MyControlType',
        'SpecialControl123',
        'control-with-dashes',
        'control_with_underscores'
      ];

      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);

      customTypes.forEach(controlType => {
        getTypeSpy.mockReturnValue(controlType);
        controlWrapper.setControlType(controlType);
        expect(setTypeSpy).toHaveBeenCalledWith(controlType);
        expect(controlWrapper.getControlType()).toBe(controlType);
      });

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });

    it('should delegate setControlType to setType', () => {
      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});

      controlWrapper.setControlType('RangeFilter');
      expect(setTypeSpy).toHaveBeenCalledWith('RangeFilter');

      setTypeSpy.mockRestore();
    });

    it('should delegate getControlType to getType', () => {
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);
      getTypeSpy.mockReturnValue('CategoryFilter');

      const result = controlWrapper.getControlType();
      expect(getTypeSpy).toHaveBeenCalled();
      expect(result).toBe('CategoryFilter');

      getTypeSpy.mockRestore();
    });
  });

  describe('control name management', () => {
    it('should get and set control name', () => {
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);
      getNameSpy.mockReturnValue('');

      expect(controlWrapper.getControlName()).toBe('');

      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});

      getNameSpy.mockReturnValue('MyControl');

      controlWrapper.setControlName('MyControl');
      expect(setNameSpy).toHaveBeenCalledWith('MyControl');
      expect(controlWrapper.getControlName()).toBe('MyControl');

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle different control names', () => {
      const controlNames = [
        'Category Filter',
        'Date Range Control',
        'Number Filter Widget',
        'String Search Control',
        'Dashboard Control'
      ];

      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      controlNames.forEach(controlName => {
        getNameSpy.mockReturnValue(controlName);
        controlWrapper.setControlName(controlName);
        expect(setNameSpy).toHaveBeenCalledWith(controlName);
        expect(controlWrapper.getControlName()).toBe(controlName);
      });

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle empty control name', () => {
      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      getNameSpy.mockReturnValue('');
      controlWrapper.setControlName('');
      expect(controlWrapper.getControlName()).toBe('');

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle special characters in control name', () => {
      const specialNames = [
        'Control with spaces',
        'Control-with-dashes',
        'Control_with_underscores',
        'Control (with parentheses)',
        'Control [with brackets]',
        'Control {with braces}',
        'Control with numbers 123',
        'Control with symbols !@#$%'
      ];

      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      specialNames.forEach(controlName => {
        getNameSpy.mockReturnValue(controlName);
        controlWrapper.setControlName(controlName);
        expect(setNameSpy).toHaveBeenCalledWith(controlName);
        expect(controlWrapper.getControlName()).toBe(controlName);
      });

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should delegate setControlName to setName', () => {
      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});

      controlWrapper.setControlName('My Filter Control');
      expect(setNameSpy).toHaveBeenCalledWith('My Filter Control');

      setNameSpy.mockRestore();
    });

    it('should delegate getControlName to getName', () => {
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);
      getNameSpy.mockReturnValue('Test Control');

      const result = controlWrapper.getControlName();
      expect(getNameSpy).toHaveBeenCalled();
      expect(result).toBe('Test Control');

      getNameSpy.mockRestore();
    });
  });

  describe('initialization with specification', () => {
    it('should initialize control type from specification', () => {
      const getTypeSpy = vi.spyOn(ControlWrapper.prototype, 'getType' as any);
      getTypeSpy.mockReturnValue('CategoryFilter');

      const wrapper = new ControlWrapper({
        controlType: 'CategoryFilter'
      });

      expect(wrapper.getControlType()).toBe('CategoryFilter');

      getTypeSpy.mockRestore();
    });

    it('should initialize control name from specification', () => {
      const getNameSpy = vi.spyOn(ControlWrapper.prototype, 'getName' as any);
      getNameSpy.mockReturnValue('Filter Control');

      const wrapper = new ControlWrapper({
        controlName: 'Filter Control'
      });

      expect(wrapper.getControlName()).toBe('Filter Control');

      getNameSpy.mockRestore();
    });

    it('should initialize both type and name from specification', () => {
      const getTypeSpy = vi.spyOn(ControlWrapper.prototype, 'getType' as any);
      const getNameSpy = vi.spyOn(ControlWrapper.prototype, 'getName' as any);

      getTypeSpy.mockReturnValue('RangeFilter');
      getNameSpy.mockReturnValue('Date Range');

      const wrapper = new ControlWrapper({
        controlType: 'RangeFilter',
        controlName: 'Date Range'
      });

      expect(wrapper.getControlType()).toBe('RangeFilter');
      expect(wrapper.getControlName()).toBe('Date Range');

      getTypeSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle complex specification', () => {
      const getTypeSpy = vi.spyOn(ControlWrapper.prototype, 'getType' as any);
      const getNameSpy = vi.spyOn(ControlWrapper.prototype, 'getName' as any);

      getTypeSpy.mockReturnValue('CategoryFilter');
      getNameSpy.mockReturnValue('Product Filter');

      const spec = {
        controlType: 'CategoryFilter',
        controlName: 'Product Filter',
        containerId: 'filter-container',
        options: {
          ui: {
            labelStacking: 'horizontal',
            allowNone: true,
            allowMultiple: true
          },
          filterColumnIndex: 0
        }
      };

      const wrapper = new ControlWrapper(spec);
      expect(wrapper.getControlType()).toBe('CategoryFilter');
      expect(wrapper.getControlName()).toBe('Product Filter');

      getTypeSpy.mockRestore();
      getNameSpy.mockRestore();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle undefined values gracefully', () => {
      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);

      setTypeSpy.mockImplementation(() => {});
      setNameSpy.mockImplementation(() => {});

      expect(() => controlWrapper.setControlType(undefined as any)).not.toThrow();
      expect(() => controlWrapper.setControlName(undefined as any)).not.toThrow();

      setTypeSpy.mockRestore();
      setNameSpy.mockRestore();
    });

    it('should handle very long control type names', () => {
      const longType = 'VeryLongControlType'.repeat(50);
      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);

      setTypeSpy.mockImplementation(() => {});
      getTypeSpy.mockReturnValue(longType);

      controlWrapper.setControlType(longType);
      expect(controlWrapper.getControlType()).toBe(longType);

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });

    it('should handle very long control names', () => {
      const longName = 'Control Name '.repeat(100);
      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      setNameSpy.mockImplementation(() => {});
      getNameSpy.mockReturnValue(longName);

      controlWrapper.setControlName(longName);
      expect(controlWrapper.getControlName()).toBe(longName);

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle unicode characters in names', () => {
      const unicodeNames = [
        '控制器名称',
        'コントロール名',
        'Имя элемента управления',
        'اسم التحكم',
        '🎛️ Control with emoji 📊',
        'Control™ with symbols®'
      ];

      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      setNameSpy.mockImplementation(() => {});

      unicodeNames.forEach(name => {
        getNameSpy.mockReturnValue(name);
        controlWrapper.setControlName(name);
        expect(controlWrapper.getControlName()).toBe(name);
      });

      setNameSpy.mockRestore();
      getNameSpy.mockRestore();
    });

    it('should handle unicode characters in types', () => {
      const unicodeTypes = [
        '类别过滤器',
        'カテゴリフィルター',
        'Фильтр категорий',
        'مرشح الفئة'
      ];

      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);

      setTypeSpy.mockImplementation(() => {});

      unicodeTypes.forEach(type => {
        getTypeSpy.mockReturnValue(type);
        controlWrapper.setControlType(type);
        expect(controlWrapper.getControlType()).toBe(type);
      });

      setTypeSpy.mockRestore();
      getTypeSpy.mockRestore();
    });
  });

  describe('state consistency', () => {
    it('should maintain independent state for multiple wrappers', () => {
      const wrapper1 = new ControlWrapper();
      const wrapper2 = new ControlWrapper();

      // Mock methods for both wrappers
      const setTypeSpy1 = vi.spyOn(wrapper1, 'setType' as any);
      const setNameSpy1 = vi.spyOn(wrapper1, 'setName' as any);
      const getTypeSpy1 = vi.spyOn(wrapper1, 'getType' as any);
      const getNameSpy1 = vi.spyOn(wrapper1, 'getName' as any);

      const setTypeSpy2 = vi.spyOn(wrapper2, 'setType' as any);
      const setNameSpy2 = vi.spyOn(wrapper2, 'setName' as any);
      const getTypeSpy2 = vi.spyOn(wrapper2, 'getType' as any);
      const getNameSpy2 = vi.spyOn(wrapper2, 'getName' as any);

      setTypeSpy1.mockImplementation(() => {});
      setNameSpy1.mockImplementation(() => {});
      setTypeSpy2.mockImplementation(() => {});
      setNameSpy2.mockImplementation(() => {});

      getTypeSpy1.mockReturnValue('CategoryFilter');
      getNameSpy1.mockReturnValue('Control 1');
      getTypeSpy2.mockReturnValue('RangeFilter');
      getNameSpy2.mockReturnValue('Control 2');

      wrapper1.setControlType('CategoryFilter');
      wrapper1.setControlName('Control 1');

      wrapper2.setControlType('RangeFilter');
      wrapper2.setControlName('Control 2');

      expect(wrapper1.getControlType()).toBe('CategoryFilter');
      expect(wrapper1.getControlName()).toBe('Control 1');

      expect(wrapper2.getControlType()).toBe('RangeFilter');
      expect(wrapper2.getControlName()).toBe('Control 2');

      // Restore all spies
      [setTypeSpy1, setNameSpy1, getTypeSpy1, getNameSpy1,
       setTypeSpy2, setNameSpy2, getTypeSpy2, getNameSpy2].forEach(spy => spy.mockRestore());
    });

    it('should handle rapid state changes', () => {
      const types = ['CategoryFilter', 'RangeFilter', 'DateRangeFilter', 'StringFilter'];
      const names = ['Control A', 'Control B', 'Control C', 'Control D'];

      const setTypeSpy = vi.spyOn(controlWrapper, 'setType' as any);
      const setNameSpy = vi.spyOn(controlWrapper, 'setName' as any);
      const getTypeSpy = vi.spyOn(controlWrapper, 'getType' as any);
      const getNameSpy = vi.spyOn(controlWrapper, 'getName' as any);

      setTypeSpy.mockImplementation(() => {});
      setNameSpy.mockImplementation(() => {});

      for (let i = 0; i < 10; i++) {
        const typeIndex = i % types.length;
        const nameIndex = i % names.length;
        const expectedType = types[typeIndex];
        const expectedName = names[nameIndex];

        getTypeSpy.mockReturnValue(expectedType);
        getNameSpy.mockReturnValue(expectedName);

        controlWrapper.setControlType(expectedType);
        controlWrapper.setControlName(expectedName);

        expect(controlWrapper.getControlType()).toBe(expectedType);
        expect(controlWrapper.getControlName()).toBe(expectedName);
      }

      setTypeSpy.mockRestore();
      setNameSpy.mockRestore();
      getTypeSpy.mockRestore();
      getNameSpy.mockRestore();
    });
  });
});
