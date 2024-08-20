;(function () {
  var urlParams = new URLSearchParams(window.location.search)
  var cateNo = urlParams.get('cate_no')
  var sortDay = urlParams.get('sort_day')

  var periodMap = {
    '1D': '1D',
    W: 'W',
    '7D': '7D',
    '1M': '1M',
  }

  var newOptions = [
    { text: '실시간', value: 'W' },
    { text: '일간', value: '1D' },
    { text: '주간', value: '7D' },
    { text: '월간', value: '1M' },
  ]

  $('#selArray').empty()
  $('#selArray').append('<option value="">-정렬방식-</option>')

  $.each(newOptions, function (_, option) {
    $('#selArray').append(
      '<option value="' + option.value + '">' + option.text + '</option>'
    )
  })

  if (sortDay && periodMap[sortDay]) {
    $('#selArray').val(sortDay)
  }

  $('#selArray').on('change', function () {
    var selectedValue = $(this).val()

    if (cateNo) {
      var newUrl = `?cate_no=${cateNo}&sort_day=${selectedValue}#Product_ListMenu`

      history.replaceState(null, '', newUrl)

      $.ajax({
        url: 'https://cors-test-opal.vercel.app/api/category/' + cateNo,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
          shop_no: 1,
          request: {
            product_display_period: displayPeriod,
          },
        }),
        success: function (response) {
          console.log('API 호출 성공:', response)
        },
        error: function (xhr, status, error) {
          console.log('API 호출 실패:', error)
        },
      })
    }
  })
})()
// ;(function (CAFE24API) {
//   CAFE24API.get('/api/v2/products/3', function (err, res) {
//     if (err) {
//       // 오류 발생 시 Error 개체입니다.
//       // name, message 속성을 확인할 수 있습니다.
//       // res 개체를 통해 상세한 오류메세지 확인이 가능합니다.
//     } else {
//       // TODO
//     }
//   })
// })(
//   CAFE24API.init({
//     client_id: '2QWZnmrfYiZSL70c9jfMzL',
//     version: '2024-06-01',
//   })
// )
