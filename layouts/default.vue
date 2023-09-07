<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group v-model="menu">
          <v-list-item to="/" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ホーム</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>地方</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(region_list, i) in region"
              :key="i"
              :to="'/region/' + region_list"
              nuxt
              link
            >
              <v-list-item-title v-text="region_list"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>都道府県</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(pref_list, i) in pref"
              :key="i"
              :to="'/pref/' + pref_list"
              nuxt
              link
            >
              <v-list-item-title v-text="pref_list"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item to="/about" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-laptop</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>このサイトについて</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/profile" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>プロフィール</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/policy" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ポリシー・規約</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/contact" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>お問い合わせ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ろ～こま!</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text icon @click="search_modal = !search_modal">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>ろ～こま!</strong>
      </v-col>
    </v-footer>

    <v-dialog v-model="search_modal" width="500">
      <v-card>
        <v-card-title>検索フォーム</v-card-title>
        <v-card-text>
          <form form @submit.prevent="search()">
            <v-text-field
              v-model="keyword"
              :counter="50"
              :label="'検索ワード(残り' + (50 - keyword.length) + '文字)'"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              depressed
              color="primary"
              block
              v-bind:disabled="check"
            >
              検索
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    menu: 1,
    items: [
      {
        icon: 'mdi-home',
        text: 'ホーム',
        to: '/',
      },
      {
        icon: 'mdi-email-outline',
        text: 'お問い合わせ',
        to: '/contact',
      },
    ],
    model: 1,
    search_modal: false,
    keyword: '',
    region: [
      '北海道地方',
      '東北地方',
      '関東地方',
      '中部地方',
      '近畿地方',
      '中国地方',
      '四国地方',
      '九州地方',
    ],
    pref: [
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
    ],
  }),
  computed: {
    check: function () {
      if (this.keyword) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    search: function () {
      if (this.keyword) {
        this.search_modal = false
        this.$router.push('/search?keyword=' + this.keyword)
      }
    },
  },
}
</script>
