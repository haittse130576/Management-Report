module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      "/api": {
        target: 'https://localhost:7250',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}
