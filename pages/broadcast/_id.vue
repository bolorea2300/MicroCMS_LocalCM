<template>
  <v-container>
    <v-card class="mb-3">
      <v-card-title>{{ broadcaster.title }}</v-card-title>
      <v-card-text>
        <p>
          公式サイト:<a :href="broadcaster.official_site" target="_blank">{{
            broadcaster.official_site
          }}</a>
        </p>
        <div>
          <span>地方:</span>
          <v-chip
            class="ma-2"
            color="primary"
            v-for="(region, id) in broadcaster.region"
            :key="id"
            :to="'/region/' + region"
            nuxt
          >
            {{ region }}
          </v-chip>
        </div>
        <div>
          <span>都道府県:</span>
          <v-chip
            class="ma-2"
            color="cyan"
            v-for="(pref, id) in broadcaster.pref"
            :key="id"
            :to="'/pref/' + pref"
            nuxt
          >
            {{ pref }}
          </v-chip>
        </div>
      </v-card-text>
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
  name: 'Broadcast',
  middleware: 'maintenance',
  watchQuery: ['page'],
  head() {
    return {
      title: this.broadcaster.title,
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
      const broadcaster = await $microcms.get({
        endpoint: 'broadcaster',
        contentId: route.params.id,
        queries: {
          fields: 'id,title,region,pref,official_site',
        },
      })

      const data = await $microcms.get({
        endpoint: 'article',
        queries: {
          limit: 12,
          orders: '-createdAt',
          filters: 'broadcaster[contains]' + route.params.id,
          offset: (number - 1) * 12,
          fields:
            'id,title,region,pref,broadcaster,movie_image,movie_genre,createdAt',
        },
      })

      return { broadcaster: broadcaster, data: data }
    } catch (err) {
      error({
        title: '一覧を取得できませんでした',
        message:
          '時間を置いてもアクセスできない場合はエラーの可能性があるので、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
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
