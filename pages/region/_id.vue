<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <v-card class="mb-3">
      <v-card-title>{{ $route.params.id }}</v-card-title>
      <v-card-text>
        <div>
          <v-chip
            class="ma-2"
            color="cyan"
            v-for="(list, id) in pref"
            :key="id"
            :to="'/pref/' + list"
            nuxt
          >
            {{ list }}
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
  </v-container>
</template>

<script>
export default {
  name: 'Broadcast',
  middleware: 'maintenance',
  watchQuery: ['page'],
  head() {
    return {
      title: this.$route.params.id,
    }
  },
  data() {
    return {
      page: 1,
    }
  },
  async asyncData({ $microcms, route, error }) {
    let number

    const regions = [
      '北海道地方',
      '東北地方',
      '関東地方',
      '中部地方',
      '近畿地方',
      '中国地方',
      '中国地方',
      '九州地方',
    ]

    if (!regions.includes(route.params.id)) {
      error({
        title: route.params.id + 'は存在しない地方です',
        message: '存在している地方を指定してください。',
      })
    }

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
          filters: 'region[contains]' + route.params.id,
          offset: (number - 1) * 12,
          fields:
            'id,title,region,pref,broadcaster,movie_image,movie_genre,createdAt',
        },
      })

      return { data: data }
    } catch (err) {
      error({
        title: '一覧を取得できませんでした',
        message:
          '何度リロードしても、アクセスできない場合は時間を置いて試してください。それでも改善の見込みがない場合は、<a href="/contact">お問い合わせ</a>から報告してくださるとありがたいです。',
      })
    }
  },
  computed: {
    pref: function () {
      if (this.$route.params.id === '北海道地方') {
        return ['北海道']
      } else if (this.$route.params.id === '東北地方') {
        return ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県']
      } else if (this.$route.params.id === '関東地方') {
        return [
          '茨城県',
          '栃木県',
          '群馬県',
          '埼玉県',
          '千葉県',
          '東京都',
          '神奈川県',
        ]
      } else if (this.$route.params.id === '中部地方') {
        return [
          '新潟県',
          '富山県',
          '石川県',
          '福井県',
          '山梨県',
          '長野県',
          '岐阜県',
          '静岡県',
          '愛知県',
        ]
      } else if (this.$route.params.id === '近畿地方') {
        return [
          '滋賀県',
          '京都府',
          '大阪府',
          '兵庫県',
          '奈良県',
          '和歌山県',
          '三重県',
        ]
      } else if (this.$route.params.id === '中国地方') {
        return ['鳥取県', '島根県', '岡山県', '広島県', '山口県']
      } else if (this.$route.params.id === '四国地方') {
        return ['香川県', '徳島県', '愛媛県', '高知県']
      } else if (this.$route.params.id === '九州地方') {
        return [
          '福岡県',
          '佐賀県',
          '長崎県',
          '熊本県',
          '大分県',
          '宮崎県',
          '鹿児島県',
        ]
      } else {
        return []
      }
    },
    bread_item: function () {
      return [
        {
          text: 'ホーム',
          disabled: false,
          to: '/',
          nuxt: true,
        },
        {
          text: this.$route.params.id,
          disabled: true,
          to: '/' + this.$route.params.id,
          nuxt: true,
        },
      ]
    },
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
