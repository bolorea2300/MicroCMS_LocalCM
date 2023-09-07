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
      title: this.$route.params.id,
    }
  },
  data() {
    return {
      page: 1,
      region: '',
      hokkaido: ['北海道'],
      tohoku: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
      kanto: [
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
      ],
      chubu: [
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
      ],
      kinki: [
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '三重県',
      ],
      chugoku: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
      shikoku: ['香川県', '徳島県', '愛媛県', '高知県'],
      kyuushu: [
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
      ],
    }
  },
  async asyncData({ $microcms, route, error }) {
    let number

    const prefs = [
      '北海道',
      '青森県',
      '岩手県',
      '宮城県',
      '秋田県',
      '山形県',
      '福島県',
      '茨城県',
      '栃木県',
      '群馬県',
      '埼玉県',
      '千葉県',
      '東京都',
      '神奈川県',
      '新潟県',
      '富山県',
      '石川県',
      '福井県',
      '山梨県',
      '長野県',
      '岐阜県',
      '静岡県',
      '愛知県',
      '三重県',
      '滋賀県',
      '京都府',
      '大阪府',
      '兵庫県',
      '奈良県',
      '和歌山県',
      '鳥取県',
      '島根県',
      '岡山県',
      '広島県',
      '山口県',
      '徳島県',
      '香川県',
      '愛媛県',
      '高知県',
      '福岡県',
      '佐賀県',
      '長崎県',
      '熊本県',
      '大分県',
      '宮崎県',
      '鹿児島県',
      '沖縄県',
    ]

    if (!prefs.includes(route.params.id)) {
      error({
        title: route.params.id + 'は存在しない県です',
        message: '存在している県を指定してください。',
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
          filters: 'pref[contains]' + route.params.id,
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
    bread_item: function () {
      if (this.hokkaido.includes(this.$route.params.id)) {
        this.region = '北海道地方'
      } else if (this.tohoku.includes(this.$route.params.id)) {
        this.region = '東北地方'
      } else if (this.kanto.includes(this.$route.params.id)) {
        this.region = '関東地方'
      } else if (this.chubu.includes(this.$route.params.id)) {
        this.region = '中部地方'
      } else if (this.kinki.includes(this.$route.params.id)) {
        this.region = '近畿地方'
      } else if (this.chugoku.includes(this.$route.params.id)) {
        this.region = '中国地方'
      } else if (this.shikoku.includes(this.$route.params.id)) {
        this.region = '四国地方'
      } else if (this.kyuushu.includes(this.$route.params.id)) {
        this.region = '九州地方'
      }

      return [
        {
          text: 'ホーム',
          disabled: false,
          to: '/',
          nuxt: true,
        },
        {
          text: this.region,
          disabled: false,
          to: '/region/' + this.region,
          nuxt: true,
        },
        {
          text: this.$route.params.id,
          disabled: true,
          to: '/pref/' + this.$route.params.id,
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
