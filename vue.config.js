module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      "/api": {
        target: 'https://swp391.azurewebsites.net/',
        changeOrigin: true,
        secure: false
      }
    }

  }
}
