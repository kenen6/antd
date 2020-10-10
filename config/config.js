// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'self-selection',
              icon: 'star',
              component: './Welcome',
            },

            {
              path: '/app',
              name: 'app',
              icon: 'tags',
              hideChildrenInMenu: false,
              // component: './App',
              authority: ['admin'],
              routes: [
                {
                  path: '/app/add',
                  name: 'add',
                  component: './Welcome',
                  authority: ['admin'],
                },
                {
                  path: '/app/all',
                  name: 'all',
                  component: './Welcome',
                  authority: ['admin'],
                },
                {
                  path: '/app/del',
                  name: 'del',
                  component: './Welcome',
                  authority: ['admin'],
                },
                {
                  path: '/app/logs',
                  name: 'logs',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },

            {
              path: '/production',
              name: 'production',
              icon: 'crown',
              // component: './App',
              routes: [
                {
                  path: '/production/add',
                  name: 'add',
                  component: './Welcome',
                  authority: ['admin'],
                },
                {
                  path: '/production/all',
                  name: 'all',
                  component: './Welcome',
                  authority: ['admin'],
                },

              ],
            },

            {
              path: '/admin',
              name: 'admin',
              icon: 'setting',
              component: './Admin',
              authority: ['admin'],
              hideInMenu: false,
              hideChildrenInMenu: false,
              routes: [
                {
                  path: '/admin/user',
                  name: 'user',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                  hide: false,
                },
                {
                  path: '/admin/role',
                  name: 'role',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                  hide: false,
                },
              ],
            },
            
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
