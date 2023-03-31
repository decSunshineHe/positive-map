const path = require('path');

module.exports = function () {
  return {
    name: 'alias-docusaurus-plugin',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            'positive-ui/lib': path.resolve(__dirname, '../../packages/components/src'),
            'positive-ui': path.resolve(__dirname, '../../packages/components/src'),
            $components: path.resolve(__dirname, '../../packages/components/src'), // 用于缩短文档路径
            $demo: path.resolve(__dirname, '../demo'), // 用于缩短文档路径
          },
        },
      };
    },
  };
};