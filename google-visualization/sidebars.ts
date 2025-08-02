import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // But we can create a sidebar manually
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'generated-index',
        title: 'Guides',
        description: 'Learn how to use the Google Visualization API, from basic setup to advanced techniques.',
        slug: '/guides',
      },
      items: [
        'getting-started',
        {
          type: 'category',
          label: 'Data Handling',
          items: [
            'datatable-overview',
            'datatable-creation',
            'datatable-data-types',
            'dataview',
            'advanced-data-manipulation',
            'data-import-export',
          ],
        },
        {
          type: 'category',
          label: 'Charts',
          items: [
            'chart-types',
            'chart-integration',
            'chartwrapper',
            'chart-events',
            'chart-customization',
          ],
        },
        {
          type: 'category',
          label: 'Interactive Features',
          items: [
            'controls',
            'dashboard-creation',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Topics',
          items: [
            'advanced-formatting',
            'performance-best-practices',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          items: [
            'api-reference',
            'troubleshooting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Chart Gallery',
      link: {
        type: 'generated-index',
        title: 'Chart Gallery',
        description: 'Explore the wide variety of charts available in the Google Visualization API.',
        slug: '/chart-gallery',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Development',
      link: {
        type: 'generated-index',
        title: 'Development',
        description: 'Information for developers contributing to the Google Visualization API.',
        slug: '/development',
      },
      items: ['documentation-plan', 'development-modernization'],
    },
  ],
};

export default sidebars;
