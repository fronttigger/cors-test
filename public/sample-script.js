CAFE24API.init('2QWZnmrfYiZSL70c9jfMzL')

CAFE24API.get('/api/v2/products/10', function (err, res) {
  if (err) {
    console.log('오류 발생', err)
  } else {
    console.log('응답!', res)
  }
})
