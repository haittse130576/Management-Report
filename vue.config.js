module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      "/api": {
        target: 'https://report-management.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }

  }
}
