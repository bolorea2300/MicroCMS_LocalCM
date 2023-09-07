<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="bread_item">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="mb-50" v-html="contact.contents[0].content"></div>
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSd93EYpYuq6pJP-QJopc0uvESbwOG-Y_uOe6uWsMtk8lzJNww/viewform?embedded=true"
      width="640"
      height="755"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >読み込んでいます…</iframe
    >
  </v-container>
</template>

<script>
export default {
  middleware: 'maintenance',
  data: () => ({}),
  head() {
    return {
      title: 'お問い合わせ',
    }
  },
  async asyncData({ $microcms, error }) {
    const data = await $microcms
      .get({
        endpoint: 'setting',
        queries: { filters: 'url[equals]contact', limit: 1 },
      })
      .catch((res) =>
        error({
          title: 'エラーが発生しました',
          message:
            '何度リロードしても、アクセスできない場合は、<a href="https://forms.gle/JVHRdTxh7DoAyyGj9" target="_blank">Googleフォームのお問い合わせ</a>から報告してくださるとありがたいです。',
        })
      )

    if (data.totalCount === 0) {
      error({
        title: 'エラーが発生しました',
        message:
          '何度リロードしても、アクセスできない場合は、<a href="https://forms.gle/JVHRdTxh7DoAyyGj9" target="_blank">Googleフォームのお問い合わせ</a>から報告してくださるとありがたいです。',
      })
    }
    return { contact: data }
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
          text: 'お問い合わせ',
          disabled: true,
          to: '/contact',
          nuxt: true,
        },
      ]
    },
  },
}
</script>
