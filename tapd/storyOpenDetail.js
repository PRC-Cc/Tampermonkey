// ==UserScript==
// @name         Tapd 故事墙打开任务详情
// @namespace    https://github.com/PRC-Cc/Tampermonkey.git
// @version      0.1
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

          var containerEle = document.createElement("div");

          var svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          var path1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          var path2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          svg.style.width = "14px";
          svg.style.padding = "0 2px";
          svg.style.cursor = "pointer";

          svg.setAttribute("viewBox", "0 0 1024 1024");
          svg.setAttribute("version", "1.1");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          path1.setAttribute(
            "d",
            "M904.760889 768.512c0.768-1.137778 1.820444-2.104889 2.389333-3.328 0.341333-0.768 0.341333-1.678222 0.597334-2.474667 0.654222-2.104889 1.336889-4.238222 1.336888-6.456889 0-0.142222 0.113778-0.256 0.113778-0.369777V24.206222c0-12.856889-11.064889-23.296-24.775111-23.296H141.824c-13.681778 0-24.775111 10.439111-24.775111 23.296V999.822222c0 12.885333 11.093333 23.296 24.775111 23.296H605.297778a25.429333 25.429333 0 0 0 9.272889-1.763555c1.450667-0.568889 2.616889-1.536 3.896889-2.304 1.223111-0.739556 2.616889-1.223111 3.726222-2.190223l279.125333-243.854222 0.284445-0.369778c1.251556-1.194667 2.133333-2.702222 3.157333-4.124444z m-45.056-58.510222h-250.680889c-1.336889 0-2.446222 0.597333-3.726222 0.739555-1.223111-0.170667-2.389333-0.739556-3.669334-0.739555a28.444444 28.444444 0 0 0-28.444444 28.444444v238.08H166.570667V47.502222h693.134222v662.499556z m-229.632 56.888889h205.454222l-205.454222 179.484444v-179.484444z"
          );
          path2.setAttribute(
            "d",
            "M740.693333 215.694222a28.444444 28.444444 0 0 1-28.444444 28.444445h-398.222222a28.444444 28.444444 0 0 1 0-56.888889h398.222222a28.444444 28.444444 0 0 1 28.444444 28.444444zM740.693333 401.294222a28.444444 28.444444 0 0 1-28.444444 28.444445h-398.222222a28.444444 28.444444 0 1 1 0-56.888889h398.222222a28.444444 28.444444 0 0 1 28.444444 28.444444zM740.693333 586.894222a28.444444 28.444444 0 0 1-28.444444 28.444445h-398.222222a28.444444 28.444444 0 1 1 0-56.888889h398.222222a28.444444 28.444444 0 0 1 28.444444 28.444444z"
          );
          path1.setAttribute("fill", "#8a8a8a");
          path2.setAttribute("fill", "#8a8a8a");
          svg.appendChild(path1);
          svg.appendChild(path2);

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
