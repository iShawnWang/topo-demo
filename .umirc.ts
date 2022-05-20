import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ component: '@/pages/index' }],
  fastRefresh: {},
  antd: {},
  hash: true,
});
