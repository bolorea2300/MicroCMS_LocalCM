<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="policy" v-html="about.contents[0].content"></div>
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
      title: 'サイトポリシー',
    }
  },
  async asyncData({ $microcms, error }) {
    const data = await $microcms
      .get({
        endpoint: 'setting',
        queries: { filters: 'url[equals]policy', limit: 1 },
      })
      .catch((res) =>
        error({
          title: 'エラーが発生しました',
          message:
            '時間を置いてもアクセスできない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。また、ポリシー(利用規約)を読めない状態で、生じた損失については<span class="red--text">一切の責任を負いかねます</span>。',
        })
      )

    if (data.totalCount === 0) {
      error({
        title: 'エラーが発生しました',
        message:
          '時間を置いてもアクセスできない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。また、ポリシー(利用規約)を読めない状態で、生じた損失については<span class="red--text">一切の責任を負いかねます</span>。',
      })
    }

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
          text: 'プライバシーポリシー・規約',
          disabled: true,
          to: '/policy',
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
