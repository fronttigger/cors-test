(function () {
  async function updateAPI(cateNo, period) {
    const response = await fetch(
      "https://cors-test-opal.vercel.app/api/categories/" + cateNo,
      {
        method: "PUT",
        body: JSON.stringify({
          shop_no: 1,
          request: {
            product_display_period: period,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      // location.reload();
    }
  }

  var urlParams = new URLSearchParams(window.location.search);
  var cateNo = urlParams.get("cate_no");
  var sortDay = urlParams.get("sort_day");

  var periodMap = {
    "1D": "1D",
    W: "W",
    "7D": "7D",
    "1M": "1M",
  };

  var newOptions = [
    { text: "실시간", value: "W" },
    { text: "일간", value: "1D" },
    { text: "주간", value: "7D" },
    { text: "월간", value: "1M" },
  ];

  $("#selArray").empty();
  $("#selArray").append('<option value="">-정렬방식-</option>');

  $.each(newOptions, function (_, option) {
    $("#selArray").append(
      '<option data-sort="' +
        option.value +
        '"value="?cate_no=' +
        cateNo +
        "&sort_day=" +
        option.value +
        '#Product_ListMenu">' +
        option.text +
        "</option>"
    );
  });

  if (sortDay && periodMap[sortDay]) {
    $("#selArray").val(
      "?cate_no=" + cateNo + "&sort_day=" + sortDay + "#Product_ListMenu"
    );

    updateAPI(cateNo, sortDay);
  }

  $("#selArray").on("change", function () {
    var selectedValue = $(this).find("option:selected");
    var period = selectedValue.data("sort");

    if (cateNo) {
      updateAPI(cateNo, period);
    }
  });
})();
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
