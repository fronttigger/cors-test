const { adminClient } = require("../app/lib/cafe24Api");

(function () {
  console.log("카페24 플러그인이 로드되었습니다.");

  if (window.location.pathname.includes("/")) {
    const button = document.createElement("button");
    button.textContent = "커스텀 기능";
    button.onclick = function () {
      alert("커스텀 기능이 실행되었습니다!");
    };
    document.body.appendChild(button);
  }

  const test = adminClient.createAutoLayoutForSelectedProductCategory({
    period: "7",
  });

  console.log("테스트", test);
})();
