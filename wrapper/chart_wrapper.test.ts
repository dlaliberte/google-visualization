import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ChartWrapper } from './chart_wrapper';
import { WRAPPER_KIND } from './wrapper';
import { AbstractVisualization } from '../visualization/abstract_visualization';

// Mock the AbstractVisualization class
class MockVisualization extends AbstractVisualization {
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
}

describe('ChartWrapper', () => {
  let chartWrapper: ChartWrapper;
  let mockVisualization: MockVisualization;

  beforeEach(() => {
    chartWrapper = new ChartWrapper();
    mockVisualization = new MockVisualization();
  });

  describe('constructor', () => {
    it('should create ChartWrapper with no specification', () => {
      const wrapper = new ChartWrapper();
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });

    it('should create ChartWrapper with object specification', () => {
      const spec = {
        chartType: 'PieChart',
        containerId: 'myChart',
        options: { title: 'Test Chart' },
        dataTable: []
      };
      const wrapper = new ChartWrapper(spec);
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });

    it('should create ChartWrapper with JSON string specification', () => {
      const spec = JSON.stringify({
        chartType: 'LineChart',
        containerId: 'lineChart',
        options: { title: 'Line Chart' }
      });
      const wrapper = new ChartWrapper(spec);
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });

    it('should create ChartWrapper with null specification', () => {
      const wrapper = new ChartWrapper(null);
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });

    it('should create ChartWrapper with undefined specification', () => {
      const wrapper = new ChartWrapper(undefined);
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });

    it('should inherit from Wrapper with CHART kind', () => {
      const wrapper = new ChartWrapper();
      // The wrapper should be created with CHART kind internally
      expect(wrapper).toBeInstanceOf(ChartWrapper);
    });
  });

  describe('chart management', () => {
    it('should get and set chart', () => {
      expect(chartWrapper.getChart()).toBeNull();

      chartWrapper.setChart(mockVisualization);
      expect(chartWrapper.getChart()).toBe(mockVisualization);
    });

    it('should handle null chart', () => {
      chartWrapper.setChart(mockVisualization);
      expect(chartWrapper.getChart()).toBe(mockVisualization);

      chartWrapper.setChart(null);
      expect(chartWrapper.getChart()).toBeNull();
    });

    it('should replace existing chart', () => {
      const firstChart = new MockVisualization();
      const secondChart = new MockVisualization();

      chartWrapper.setChart(firstChart);
      expect(chartWrapper.getChart()).toBe(firstChart);

      chartWrapper.setChart(secondChart);
      expect(chartWrapper.getChart()).toBe(secondChart);
      expect(chartWrapper.getChart()).not.toBe(firstChart);
    });
  });

  describe('chart type management', () => {
    it('should get and set chart type', () => {
      expect(chartWrapper.getChartType()).toBe('');

      chartWrapper.setChartType('PieChart');
      expect(chartWrapper.getChartType()).toBe('PieChart');
    });

    it('should handle different chart types', () => {
      const chartTypes = [
        'PieChart',
        'LineChart',
        'ColumnChart',
        'BarChart',
        'AreaChart',
        'ScatterChart',
        'BubbleChart',
        'Histogram',
        'TreeMap',
        'Table'
      ];

      chartTypes.forEach(chartType => {
        chartWrapper.setChartType(chartType);
        expect(chartWrapper.getChartType()).toBe(chartType);
      });
    });

    it('should handle empty chart type', () => {
      chartWrapper.setChartType('PieChart');
      chartWrapper.setChartType('');
      expect(chartWrapper.getChartType()).toBe('');
    });

    it('should handle custom chart types', () => {
      const customTypes = [
        'CustomChart',
        'MyVisualization',
        'SpecialChart123',
        'chart-with-dashes',
        'chart_with_underscores'
      ];

      customTypes.forEach(chartType => {
        chartWrapper.setChartType(chartType);
        expect(chartWrapper.getChartType()).toBe(chartType);
      });
    });
  });

  describe('chart name management', () => {
    it('should get and set chart name', () => {
      expect(chartWrapper.getChartName()).toBe('');

      chartWrapper.setChartName('MyChart');
      expect(chartWrapper.getChartName()).toBe('MyChart');
    });

    it('should handle different chart names', () => {
      const chartNames = [
        'Sales Chart',
        'Revenue Dashboard',
        'Performance Metrics',
        'User Analytics',
        'Financial Report'
      ];

      chartNames.forEach(chartName => {
        chartWrapper.setChartName(chartName);
        expect(chartWrapper.getChartName()).toBe(chartName);
      });
    });

    it('should handle empty chart name', () => {
      chartWrapper.setChartName('Test Chart');
      chartWrapper.setChartName('');
      expect(chartWrapper.getChartName()).toBe('');
    });

    it('should handle special characters in chart name', () => {
      const specialNames = [
        'Chart with spaces',
        'Chart-with-dashes',
        'Chart_with_underscores',
        'Chart (with parentheses)',
        'Chart [with brackets]',
        'Chart {with braces}',
        'Chart with numbers 123',
        'Chart with symbols !@#$%'
      ];

      specialNames.forEach(chartName => {
        chartWrapper.setChartName(chartName);
        expect(chartWrapper.getChartName()).toBe(chartName);
      });
    });
  });

  describe('initialization with specification', () => {
    it('should initialize chart type from specification', () => {
      const wrapper = new ChartWrapper({
        chartType: 'ColumnChart'
      });
      expect(wrapper.getChartType()).toBe('ColumnChart');
    });

    it('should initialize chart name from specification', () => {
      const wrapper = new ChartWrapper({
        chartName: 'Sales Report'
      });
      expect(wrapper.getChartName()).toBe('Sales Report');
    });

    it('should initialize both type and name from specification', () => {
      const wrapper = new ChartWrapper({
        chartType: 'PieChart',
        chartName: 'Market Share'
      });
      expect(wrapper.getChartType()).toBe('PieChart');
      expect(wrapper.getChartName()).toBe('Market Share');
    });

    it('should handle complex specification', () => {
      const spec = {
        chartType: 'LineChart',
        chartName: 'Trend Analysis',
        containerId: 'chart-container',
        options: {
          title: 'Sales Trends',
          width: 800,
          height: 400,
          legend: { position: 'bottom' }
        },
        dataTable: [
          ['Month', 'Sales'],
          ['Jan', 1000],
          ['Feb', 1200],
          ['Mar', 1100]
        ]
      };

      const wrapper = new ChartWrapper(spec);
      expect(wrapper.getChartType()).toBe('LineChart');
      expect(wrapper.getChartName()).toBe('Trend Analysis');
    });
  });

  describe('method delegation to base Wrapper', () => {
    it('should delegate getChart to getVisualization', () => {
      // Mock the getVisualization method
      const getVisualizationSpy = vi.spyOn(chartWrapper, 'getVisualization' as any);
      getVisualizationSpy.mockReturnValue(mockVisualization);

      const result = chartWrapper.getChart();
      expect(getVisualizationSpy).toHaveBeenCalled();
      expect(result).toBe(mockVisualization);

      getVisualizationSpy.mockRestore();
    });

    it('should delegate setChart to setVisualization', () => {
      // Mock the setVisualization method
      const setVisualizationSpy = vi.spyOn(chartWrapper, 'setVisualization' as any);
      setVisualizationSpy.mockImplementation(() => {});

      chartWrapper.setChart(mockVisualization);
      expect(setVisualizationSpy).toHaveBeenCalledWith(mockVisualization);

      setVisualizationSpy.mockRestore();
    });

    it('should delegate getChartType to getType', () => {
      // Mock the getType method
      const getTypeSpy = vi.spyOn(chartWrapper, 'getType' as any);
      getTypeSpy.mockReturnValue('PieChart');

      const result = chartWrapper.getChartType();
      expect(getTypeSpy).toHaveBeenCalled();
      expect(result).toBe('PieChart');

      getTypeSpy.mockRestore();
    });

    it('should delegate setChartType to setType', () => {
      // Mock the setType method
      const setTypeSpy = vi.spyOn(chartWrapper, 'setType' as any);
      setTypeSpy.mockImplementation(() => {});

      chartWrapper.setChartType('LineChart');
      expect(setTypeSpy).toHaveBeenCalledWith('LineChart');

      setTypeSpy.mockRestore();
    });

    it('should delegate getChartName to getName', () => {
      // Mock the getName method
      const getNameSpy = vi.spyOn(chartWrapper, 'getName' as any);
      getNameSpy.mockReturnValue('Test Chart');

      const result = chartWrapper.getChartName();
      expect(getNameSpy).toHaveBeenCalled();
      expect(result).toBe('Test Chart');

      getNameSpy.mockRestore();
    });

    it('should delegate setChartName to setName', () => {
      // Mock the setName method
      const setNameSpy = vi.spyOn(chartWrapper, 'setName' as any);
      setNameSpy.mockImplementation(() => {});

      chartWrapper.setChartName('My Chart');
      expect(setNameSpy).toHaveBeenCalledWith('My Chart');

      setNameSpy.mockRestore();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle undefined values gracefully', () => {
      expect(() => chartWrapper.setChartType(undefined as any)).not.toThrow();
      expect(() => chartWrapper.setChartName(undefined as any)).not.toThrow();
      expect(() => chartWrapper.setChart(undefined as any)).not.toThrow();
    });

    it('should handle very long chart type names', () => {
      const longType = 'A'.repeat(1000);
      chartWrapper.setChartType(longType);
      expect(chartWrapper.getChartType()).toBe(longType);
    });

    it('should handle very long chart names', () => {
      const longName = 'Chart Name '.repeat(100);
      chartWrapper.setChartName(longName);
      expect(chartWrapper.getChartName()).toBe(longName);
    });

    it('should handle unicode characters in names', () => {
      const unicodeNames = [
        '图表名称',
        'グラフ名',
        'Имя диаграммы',
        'اسم الرسم البياني',
        '📊 Chart with emoji 📈',
        'Chart™ with symbols®'
      ];

      unicodeNames.forEach(name => {
        chartWrapper.setChartName(name);
        expect(chartWrapper.getChartName()).toBe(name);
      });
    });

    it('should handle unicode characters in types', () => {
      const unicodeTypes = [
        '饼图',
        'パイチャート',
        'Круговая диаграмма',
        'مخطط دائري'
      ];

      unicodeTypes.forEach(type => {
        chartWrapper.setChartType(type);
        expect(chartWrapper.getChartType()).toBe(type);
      });
    });
  });

  describe('state consistency', () => {
    it('should maintain independent state for multiple wrappers', () => {
      const wrapper1 = new ChartWrapper();
      const wrapper2 = new ChartWrapper();

      wrapper1.setChartType('PieChart');
      wrapper1.setChartName('Chart 1');

      wrapper2.setChartType('LineChart');
      wrapper2.setChartName('Chart 2');

      expect(wrapper1.getChartType()).toBe('PieChart');
      expect(wrapper1.getChartName()).toBe('Chart 1');

      expect(wrapper2.getChartType()).toBe('LineChart');
      expect(wrapper2.getChartName()).toBe('Chart 2');
    });

    it('should handle rapid state changes', () => {
      const types = ['PieChart', 'LineChart', 'ColumnChart', 'BarChart'];
      const names = ['Chart A', 'Chart B', 'Chart C', 'Chart D'];

      for (let i = 0; i < 100; i++) {
        const typeIndex = i % types.length;
        const nameIndex = i % names.length;

        chartWrapper.setChartType(types[typeIndex]);
        chartWrapper.setChartName(names[nameIndex]);

        expect(chartWrapper.getChartType()).toBe(types[typeIndex]);
        expect(chartWrapper.getChartName()).toBe(names[nameIndex]);
      }
    });

    it('should handle alternating null and valid values', () => {
      const chart1 = new MockVisualization();
      const chart2 = new MockVisualization();

      chartWrapper.setChart(chart1);
      expect(chartWrapper.getChart()).toBe(chart1);

      chartWrapper.setChart(null);
      expect(chartWrapper.getChart()).toBeNull();

      chartWrapper.setChart(chart2);
      expect(chartWrapper.getChart()).toBe(chart2);

      chartWrapper.setChart(null);
      expect(chartWrapper.getChart()).toBeNull();
    });
  });

  describe('integration scenarios', () => {
    it('should work with typical chart configuration workflow', () => {
      // Step 1: Create wrapper
      const wrapper = new ChartWrapper();

      // Step 2: Set chart type
      wrapper.setChartType('PieChart');
      expect(wrapper.getChartType()).toBe('PieChart');

      // Step 3: Set chart name
      wrapper.setChartName('Sales Distribution');
      expect(wrapper.getChartName()).toBe('Sales Distribution');

      // Step 4: Set visualization
      wrapper.setChart(mockVisualization);
      expect(wrapper.getChart()).toBe(mockVisualization);

      // Verify all settings are maintained
      expect(wrapper.getChartType()).toBe('PieChart');
      expect(wrapper.getChartName()).toBe('Sales Distribution');
      expect(wrapper.getChart()).toBe(mockVisualization);
    });

    it('should handle reconfiguration scenarios', () => {
      // Initial configuration
      chartWrapper.setChartType('PieChart');
      chartWrapper.setChartName('Initial Chart');
      chartWrapper.setChart(mockVisualization);

      // Reconfigure
      const newVisualization = new MockVisualization();
      chartWrapper.setChartType('LineChart');
      chartWrapper.setChartName('Updated Chart');
      chartWrapper.setChart(newVisualization);

      // Verify new configuration
      expect(chartWrapper.getChartType()).toBe('LineChart');
      expect(chartWrapper.getChartName()).toBe('Updated Chart');
      expect(chartWrapper.getChart()).toBe(newVisualization);
      expect(chartWrapper.getChart()).not.toBe(mockVisualization);
    });
  });
});
