<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>

    <div>
      <v-card class="mb-3">
        <v-card-title>検索:{{ $route.query.keyword }}</v-card-title>
      </v-card>
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
    </div>

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
  name: 'Search',
  middleware: 'maintenance',
  watchQuery: ['keyword', 'page'],
  head() {
    return {
      title: '検索',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
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
          filters:
            'title[contains]' +
            route.query.keyword +
            '[or]content[contains]' +
            route.query.keyword,
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
  computed: {
    bread_item: function () {
      return [
        {
          text: 'ホーム',
          disabled: false,
          to: '/',
          nuxt: true,
        },
        {
          text: '検索',
          disabled: true,
          to: '/search',
          nuxt: true,
        },
        {
          text: this.$route.query.keyword,
          disabled: true,
          to: '/search?keyword=' + this.$route.query.keyword,
          nuxt: true,
        },
      ]
    },
  },
}
</script>
