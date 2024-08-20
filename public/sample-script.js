;(function () {
  async function fetchData() {
    try {
      // const response = await fetch(
      //   'https://cors-test-opal.vercel.app/api/category',
      //   {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     credentials: 'include',
      //   }
      // )
      const response = await fetch(
        'https://cors-test-opal.vercel.app/api/token',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('뭘까', data)
      return data
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error)
    }
  }

  if (window.location.pathname.includes('/')) {
    const button = document.createElement('button')
    button.textContent = '커스텀 기능'
    button.onclick = async function () {
      const result = await fetchData()
      console.log('result', result)
    }
    document.body.appendChild(button)
  }

  const element = document.getElementById('selArray')
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
