<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="list in data.contents"
        :key="data.contents.id"
      >
        <v-card :to="'/article/' + list.id" nuxt>
          <v-img height="250" :src="list.movie_image"></v-img>
          <v-card-title>{{ list.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <div class="clear"></div>

    <div class="text-center mt-50">
      <v-pagination
        v-model="page"
        :length="Math.ceil(data.totalCount / 12)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'index',
  watchQuery: ['page'],
  middleware: 'maintenance',
  head() {
    return {
      title: 'ろ～こま! | 全国のローカルCMをご紹介',
      titleTemplate: null,
    }
  },
  data() {
    return {
      page: 1,
    }
  },
  async asyncData({ $microcms, route, error }) {
    let number

    if (route.query.page) {
      number = route.query.page
    } else {
      number = 1
    }

    try {
      const data = await $microcms.get({
        endpoint: 'article',
        queries: {
          limit: 12,
          orders: '-createdAt',
          offset: (number - 1) * 12,
          fields:
            'id,title,region,pref,broadcaster,movie_image,movie_genre,createdAt',
        },
      })

      return { data: data }
    } catch (err) {
      error({
        title: 'エラーが発生しました',
        message:
          '何度リロードしても、アクセスできない場合は時間を置いて試してください。それでも改善の見込みがない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
      })
    }
  },
  watch: {
    page(from) {
      this.$router.push('?page=' + from)
    },
  },
}
</script>

<style>
.card-padding {
  padding: 10px;
}
</style>
