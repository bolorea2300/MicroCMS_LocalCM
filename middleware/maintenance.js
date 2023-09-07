export default function ({ redirect }) {
  if (process.env.MAINTENANCE === 'true') {
    redirect('/maintenance')
  }
}
