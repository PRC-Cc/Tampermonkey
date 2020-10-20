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

  var STATUS_COLOR_MAP = {
    NORMAL: "#bfbfbf",
    HOVER: "#8a8a8a",
    SUCCESS: "#1296db",
    FAIL: "#d81e06",
  };

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
          svg.style.width = "14px";
          svg.style.padding = "0 2px";
          svg.style.cursor = "pointer";

          svg.setAttribute("viewBox", "0 0 1024 1024");
          svg.setAttribute("version", "1.1");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          path.setAttribute(
            "d",
            "M938.666667 512a42.666667 42.666667 0 0 0-42.666667 42.666667v298.666666c0 23.573333-19.093333 42.666667-42.666667 42.666667H170.666667c-23.573333 0-42.666667-19.093333-42.666667-42.666667V170.666667c0-23.573333 19.093333-42.666667 42.666667-42.666667h298.666666a42.666667 42.666667 0 0 0 0-85.333333H170.666667C99.978667 42.666667 42.666667 99.978667 42.666667 170.666667v682.666666c0 70.688 57.312 128 128 128h682.666666c70.688 0 128-57.312 128-128V554.666667a42.666667 42.666667 0 0 0-42.666666-42.666667z m42.666666-426.666667v256a42.666667 42.666667 0 0 1-85.333333 0V188.330667l-349.557333 349.546666a42.666667 42.666667 0 0 1-60.32-60.330666L835.658667 128H682.666667a42.666667 42.666667 0 0 1 0-85.333333h256a42.666667 42.666667 0 0 1 42.666666 42.666666z"
          );
          path.setAttribute("fill", STATUS_COLOR_MAP.NORMAL);
          svg.appendChild(path);

          svg.addEventListener("mouseenter", function () {
            path.setAttribute("fill", STATUS_COLOR_MAP.HOVER);
          });
          svg.addEventListener("mouseleave", function () {
            path.setAttribute("fill", STATUS_COLOR_MAP.NORMAL);
          });

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
