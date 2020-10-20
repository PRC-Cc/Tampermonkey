// ==UserScript==
// @name         Tapd 故事墙打开任务详情
// @namespace    https://github.com/PRC-Cc/Tampermonkey.git
// @version      0.2
// @description  在tapd故事墙单项标题后添加详情按钮，用于打开任务详情
// @author       Cache
// @match        https://www.tapd.cn/*/storywalls*
// ==/UserScript==

(function () {
  function insertAfter(newEl, targetEl) {
    var parentEl = targetEl.parentNode;
    if (parentEl.lastChild == targetEl) {
      parentEl.appendChild(newEl);
    } else {
      parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
  }

  window.onload = function () {
    document
      .querySelectorAll("#resource_table > tbody > tr")
      .forEach(function (tr) {
        var stories = tr.querySelectorAll("li[story_id]");
        stories.forEach(function (li) {
          var storyId = li.getAttribute("story_id");
          var title = li.querySelector(".note_head");
          title.style.display = "flex";
          title.style["justify-content"] = "space-between";

          var containerEle = document.createElement("div");

          var svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          var path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          svg.style.width = "17px";
          svg.style.padding = "0 2px";
          svg.style.cursor = "pointer";

          svg.setAttribute("viewBox", "0 0 1024 1024");
          svg.setAttribute("version", "1.1");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          path.setAttribute(
            "d",
            "M896 469.333333l-298.666667-298.666667 0 170.666667C298.666667 384 170.666667 597.333333 128 810.666667c106.666667-149.333333 256-217.6 469.333333-217.6L597.333333 768 896 469.333333z"
          );
          path.setAttribute("fill", "#8a8a8a");
          svg.appendChild(path);

          svg.addEventListener("click", function (e) {
            e.stopPropagation();
            var detailPath = location.href.replace(
              /(https:\/\/www.tapd.cn\/.*\/)storywalls.*/,
              "$1" + "stories/view/" + storyId
            );
            window.open(detailPath);
          });

          containerEle.appendChild(svg);
          insertAfter(containerEle, title.firstElementChild);
        });
      });
  };
})();
