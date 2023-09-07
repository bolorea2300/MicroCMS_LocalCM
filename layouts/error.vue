<template>
  <v-app dark>
    <v-container>
      <h1>{{ error.title }}</h1>
      <div v-html="error.message"></div>
      <p><nuxt-link to="/">ホーム</nuxt-link>に戻る</p>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  head() {
    return {
      title: 'エラー',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
