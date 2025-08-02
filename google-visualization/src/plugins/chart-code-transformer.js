const visit = require('unist-util-visit');

// Plugin to transform code blocks with language "google-chart" into interactive components
function chartCodeTransformer() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'google-chart') {
        // Transform the code block into an MDX component
        const chartCode = node.value;

        // Create a unique ID for this chart
        const chartId = `chart_${Math.random().toString(36).substr(2, 9)}`;

        // Replace the code block with an MDX component
        const mdxComponent = {
          type: 'mdxJsxFlowElement',
          name: 'GoogleChartCode',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'code',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify(chartCode),
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'Literal',
                          value: chartCode,
                          raw: JSON.stringify(chartCode),
                        },
                      },
                    ],
                    sourceType: 'module',
                  },
                },
              },
            },
          ],
          children: [],
        };

        parent.children[index] = mdxComponent;
      }
    });
  };
}

module.exports = chartCodeTransformer;
