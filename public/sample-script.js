;(function (CAFE24API) {
  CAFE24API.getCustomerIDInfo(function (err, res) {
    if (err) {
      // 오류 발생시 Error 개체입니다.
      // name, message 속성을 확인할 수 있습니다.
      // res 개체를 통해 상세한 오류메세지 확인이 가능합니다.
      console.log('에러 error', err)
    } else {
      // res 개체를 통해 응답 메세지를 확인할 수 있습니다.
      console.log('아니 왜', res)
    }
  })
})(
  CAFE24API.init({
    client_id: '2QWZnmrfYiZSL70c9jfMzL',
    version: '2024-06-01',
  })
)
