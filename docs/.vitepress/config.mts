import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZVMS 4",
  description: "Documentation of ZVMS 4",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/usage/': [
        {
          text: 'Basic Usage',
          items: [
            {
              text: 'Overview',
              link: '/usage/'
            },
            {
              text: 'Account',
              link: '/usage/account'
            },
            {
              text: 'Activity',
              link: '/usage/activity'
            },
            {
              text: 'Notification',
              link: '/usage/notification'
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
