<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div v-html="profile.contents[0].content"></div>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: 'Profile',
  middleware: 'maintenance',
  head() {
    return {
      title: 'プロフィール',
    }
  },
  async asyncData({ $microcms, error }) {
    const data = await $microcms
      .get({
        endpoint: 'setting',
        queries: { filters: 'url[equals]profile', limit: 1 },
      })
      .catch((res) =>
        error({
          title: 'エラーが発生しました',
          message:
            '時間を置いてもアクセスできない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
        })
      )

    if (data.totalCount === 0) {
      error({
        title: 'エラーが発生しました',
        message:
          '時間を置いてもアクセスできない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
      })
    }

    return { profile: data }
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
          text: 'プロフィール',
          disabled: true,
          to: '/profile',
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
