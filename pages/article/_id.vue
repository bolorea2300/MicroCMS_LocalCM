<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <h1>{{ data.title }}</h1>
    <v-img height="250" :src="data.movie_image"></v-img>

    <v-card class="mt-50">
      <v-card-text>
        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false"
            >Tweet</a
          >
        </div>
        <div>
          <span>地方:</span>
          <v-chip
            class="ma-2"
            color="primary"
            v-for="(region, id) in data.region"
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
            v-for="(pref, id) in data.pref"
            :key="id"
            :to="'/pref/' + pref"
            nuxt
          >
            {{ pref }}
          </v-chip>
        </div>
        <div>
          <span>企業等:</span>
          <v-chip
            class="ma-2"
            color="green"
            v-for="(broadcaster, id) in data.broadcaster"
            :key="id"
            :to="'/broadcast/' + broadcaster.id"
            nuxt
          >
            {{ broadcaster.title }}
          </v-chip>
        </div>
      </v-card-text>
      <v-card-text>
        <ul>
          <li>CREATE:{{ time(data.createdAt) }}</li>
          <li>UPDATE:{{ time(data.updatedAt) }}</li>
        </ul>
      </v-card-text>
      <v-card-text class="article" v-html="data.content"></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: 'article',
  middleware: 'maintenance',
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: this.data.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$route.params.id,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.data.movie_image,
        },
      ],
      script: [
        {
          src: 'https://platform.twitter.com/widgets.js',
        },
      ],
    }
  },
  async asyncData({ $microcms, route, error }) {
    const data = await $microcms
      .get({
        endpoint: 'article',
        contentId: route.params.id,
        queries: {
          fields:
            'id,title,region,pref,broadcaster,movie_image,movie_genre,movie_url,content,createdAt',
        },
      })
      .catch((res) =>
        error({
          title: 'ページが見つかりません',
          message: '別のURLにアクセスしてください。',
        })
      )
    return { data: data }
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
          text: this.data.title,
          disabled: true,
          to: '/article/' + this.$route.params.id,
          nuxt: true,
        },
      ]
    },
  },
  methods: {
    time: function (data) {
      return dayjs.utc(data).tz('Asia/Tokyo').format('YYYY-MM-DD')
    },
  },
}
</script>
