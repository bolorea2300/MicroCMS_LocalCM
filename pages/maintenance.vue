<template>
  <v-container>
    <h1>メンテナンス中です...</h1>

    <p v-if="time">メンテナンス時間:{{ time }}</p>
    <p v-if="error">メンテナンスの完了時間はまだ決まっていません。</p>
    <br />
    <p class="mt-40">
      すぐに質問したい場合は<a
        href="https://forms.gle/JVHRdTxh7DoAyyGj9"
        target="_blank"
        >こちら</a
      >からどうぞ。
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'Maintenance',
  layout: 'maintenance',
  head() {
    return {
      title: 'メンテナンス中',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      time: null,
      error: false,
    }
  },
  async asyncData({ redirect }) {
    const maintenance = process.env.MAINTENANCE

    if (maintenance === 'false') {
      redirect('/')
    } else {
      return { time: process.env.MAINTENANCE_TIME }
    }
  },
}
</script>
