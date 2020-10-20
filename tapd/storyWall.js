// ==UserScript==
// @name         Tapd 故事墙复制
// @namespace    https://github.com/PRC-Cc/Tampermonkey.git
// @version      0.2
// @description  在tapd故事墙单项标题后添加复制按钮，用于复制精简storyId
// @author       Cache
// @match        https://www.tapd.cn/*/storywalls*
// ==/UserScript==

(function () {
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
          var shortStoryId = storyId.slice(-7);
          var title = li.querySelector(".note_head");

          var containerEle = document.createElement("div");
          containerEle.style.display = "inline-block";

          var inputEle = document.createElement("input");
          inputEle.style.width = "1px";
          inputEle.style.opacity = 0;
          inputEle.style.border = "none";
          inputEle.value = shortStoryId;

          var svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          var path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          svg.style.width = "15px";
          svg.style.padding = "0 2px";
          svg.style.cursor = "pointer";

          svg.setAttribute("viewBox", "0 0 1024 1024");
          svg.setAttribute("version", "1.1");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          path.setAttribute(
            "d",
            "M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z"
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
            inputEle.select();
            var copyResult = document.execCommand("Copy");
            if (!copyResult) {
              copyResult = window.clipboardData.setData("text", storyId);
            }
            if (copyResult) {
              path.setAttribute("fill", STATUS_COLOR_MAP.SUCCESS);
            } else {
              path.setAttribute("fill", STATUS_COLOR_MAP.FAIL);
            }
          });

          containerEle.appendChild(svg);
          containerEle.appendChild(inputEle);

          title.firstElementChild.style.display = "flex";
          title.firstElementChild.append(containerEle);
        });
      });
  };
})();
