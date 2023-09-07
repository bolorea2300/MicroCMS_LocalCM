import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

const base = 'https://localcm.com'
const url = 'https://jkdjxkkoyw.microcms.io/api/v1/article'
const site_name = 'ろーこま!'

export default {
  head: {
    titleTemplate: '%s | ' + site_name,
    title: 'ローカルCM',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: site_name,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: '',
      },
      { hid: 'og:title', property: 'og:title', content: site_name },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'ローカルCMを集めるブログサイトです',
      },
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  env: {
    MAINTENANCE: process.env.MAINTENANCE || 'false',
    MAINTENANCE_TIME: process.env.MAINTENANCE_TIME || null,
  },

  css: ['~assets/css/style.css'],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/vuetify', 'nuxt-microcms-module'],

  modules: ['@nuxtjs/sitemap', '@nuxtjs/axios'],

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'all',
  },

  axios: {
    baseURL: '/',
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: base,
    exclude: ['/404', '/search'],
    routes(callback) {
      axios
        .get(url, {
          headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
        })
        .then((res) => {
          const routes = res.data.contents.map((list) => {
            return '/article/' + list.id
          })
          callback(null, routes)
        })
        .catch(callback)
    },
  },

  build: {},
}
