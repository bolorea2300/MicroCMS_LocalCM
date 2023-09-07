<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div v-html="about.contents[0].content"></div>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: 'About',
  middleware: 'maintenance',
  head() {
    return {
      title: 'このサイトについて',
    }
  },
  async asyncData({ $microcms, error }) {
    const data = await $microcms
      .get({
        endpoint: 'setting',
        queries: { filters: 'url[equals]about', limit: 1 },
      })
      .catch((res) =>
        error({
          title: 'エラーが発生しました',
          message:
            '何度リロードしても、アクセスできない場合は時間を置いて試してください。それでも改善の見込みがない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
        })
      )
    return { about: data }
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
          text: 'このサイトについて',
          disabled: true,
          to: '/about',
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
