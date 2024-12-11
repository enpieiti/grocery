const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * Hàm tải template
 *
 * Cách dùng:
 * <div id="parent"></div>
 * <script>
 *  load("#parent", "./path-to-template.html");
 * </script>
 */
function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    $(selector).innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        $(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    })
    .finally(() => {
      window.dispatchEvent(new Event("template-loaded"));
    });
}

/**
 * Hàm kiểm tra một phần tử
 * có bị ẩn bởi display: none không
 */
function isHidden(element) {
  if (!element) return true;

  if (window.getComputedStyle(element).display === "none") {
    return true;
  }

  let parent = element.parentElement;
  while (parent) {
    if (window.getComputedStyle(parent).display === "none") {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

/**
 * Hàm buộc một hành động phải đợi
 * sau một khoảng thời gian mới được thực thi
 */
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

/**
 * Hàm tính toán vị trí arrow cho dropdown
 *
 * Cách dùng:
 * 1. Thêm class "js-dropdown-list" vào thẻ ul cấp 1
 * 2. CSS "left" cho arrow qua biến "--arrow-left-pos"
 */
const calArrowPos = debounce(() => {
  if (isHidden($(".js-dropdown-list"))) return;

  const items = $$(".js-dropdown-list > li");

  items.forEach((item) => {
    const arrowPos = item.offsetLeft + item.offsetWidth / 2;
    item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
  });
});

// Tính toán lại vị trí arrow khi resize trình duyệt
window.addEventListener("resize", calArrowPos);

// Tính toán lại vị trí arrow sau khi tải template
window.addEventListener("template-loaded", calArrowPos);

/**
 * Giữ active menu khi hover
 *
 * Cách dùng:
 * 1. Thêm class "js-menu-list" vào thẻ ul menu chính
 * 2. Thêm class "js-dropdown" vào class "dropdown" hiện tại
 *  nếu muốn reset lại item active khi ẩn menu
 */
window.addEventListener("template-loaded", handleActiveMenu);

function handleActiveMenu() {
  const dropdowns = $$(".js-dropdown");
  const menus = $$(".js-menu-list");
  const activeClass = "menu-column__item--active";

  const removeActive = (menu) => {
    menu.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
  };

  const init = () => {
    menus.forEach((menu) => {
      const items = menu.children;
      if (!items.length) return;

      removeActive(menu);
      if (window.innerWidth > 991) items[0].classList.add(activeClass);

      Array.from(items).forEach((item) => {
        item.onmouseenter = () => {
          if (window.innerWidth <= 991) return;
          removeActive(menu);
          item.classList.add(activeClass);
        };
        item.onclick = () => {
          if (window.innerWidth > 991) return;
          removeActive(menu);
          item.classList.add(activeClass);
          item.scrollIntoView();
        };
      });
    });
  };

  init();

  dropdowns.forEach((dropdown) => {
    dropdown.onmouseleave = () => init();
  });
}

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
  $$(".js-toggle").forEach((button) => {
    const target = button.getAttribute("toggle-target");
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = (e) => {
      e.preventDefault();

      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      const isHidden = $(target).classList.contains("hide");

      requestAnimationFrame(() => {
        $(target).classList.toggle("hide", !isHidden);
        $(target).classList.toggle("show", isHidden);
      });
    };
    document.onclick = function (e) {
      if (!e.target.closest(target)) {
        const isHidden = $(target).classList.contains("hide");
        if (!isHidden) {
          button.click();
        }
      }
    };
  });
}

window.addEventListener("template-loaded", () => {
  const links = $$(".js-dropdown-list > li > a");

  links.forEach((link) => {
    link.onclick = () => {
      if (window.innerWidth > 991) return;
      const item = link.closest("li");
      item.classList.toggle("navbar__item--active");
    };
  });
});

window.addEventListener("template-loaded", () => {
  const tabsSelector = "prod-tab__item";
  const contentsSelector = "prod-tab__content";

  const tabActive = `${tabsSelector}--current`;
  const contentActive = `${contentsSelector}--current`;

  const tabContainers = $$(".js-tabs");
  tabContainers.forEach((tabContainer) => {
    const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
    const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
    tabs.forEach((tab, index) => {
      tab.onclick = () => {
        tabContainer.querySelector(`.${tabActive}`)?.classList.remove(tabActive);
        tabContainer.querySelector(`.${contentActive}`)?.classList.remove(contentActive);
        tab.classList.add(tabActive);
        contents[index].classList.add(contentActive);
      };
    });
  });
});

// slideshow

window.addEventListener("template-loaded", () => {
  let currentIndex = 0; // Slide hiện tại
  const slidesWrapper = $(".slideshow__inner");
  const slides = $$(".slideshow__item");
  const totalSlides = slides.length;
  const dots = $$(".slideshow__dot");
  if (slidesWrapper) {
    // Hàm cập nhật vị trí của slide
    function updateSlidePosition() {
      slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    // Hàm chuyển đến slide tiếp theo
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides; // Quay lại slide đầu khi hết
      updateSlidePosition();
    }

    // Hàm quay lại slide trước
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Quay lại cuối nếu vượt quá đầu
      updateSlidePosition();
    }

    // Hàm cập nhật trạng thái các dot
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("slideshow__dot--active", index === currentIndex);
      });
    }
    // Gán sự kiện cho các dot
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentIndex = parseInt(dot.getAttribute("data-slide"));
        updateSlidePosition();
      });
    });

    // Hiển thị slide ban đầu
    updateSlidePosition();
    // Tự động chuyển slide mỗi 7 giây
    setInterval(nextSlide, 7000);
    document.querySelector(".slideshow__btn--next").addEventListener("click", nextSlide);
    document.querySelector(".slideshow__btn--prev").addEventListener("click", prevSlide);
  }
});

/////////
// preview img product detail

//  Select dialog : City/ District/ Town
// window.addEventListener("template-loaded", () => {
//   const options = document.querySelectorAll(".form__option");
//   document.querySelector(".form__search-input").addEventListener("input", function () {
//     const searchTerm = this.value.toLowerCase(); // Lấy giá trị nhập vào và chuyển thành chữ thường
//     options.forEach((option) => {
//       const optionText = option.textContent.toLowerCase(); // Lấy nội dung văn bản của mỗi mục
//       if (optionText.includes(searchTerm)) {
//         option.style.display = "block"; // Hiển thị mục nếu nó khớp với từ khóa tìm kiếm
//       } else {
//         option.style.display = "none"; // Ẩn mục nếu không khớp
//       }
//     });
//   });
//   options.forEach((option) => {
//     option.addEventListener("click", function () {
//       // Cập nhật giá trị cho input
//       const cityInput = document.querySelector("#city");
//       cityInput.value = this.textContent;

//       // Đóng dialog (ẩn city dialog)
//       const cityDialog = document.querySelector("#city-dialog");

//       cityDialog.classList.remove("show");
//       cityDialog.classList.add("hide");
//       // Đánh dấu mục được chọn (thêm class)
//       document.querySelectorAll(".form__option").forEach((option) => {
//         option.classList.remove("form__option--current");
//       });
//       this.classList.add("form__option--current");
//     });
//   });
// });
// filter active
window.addEventListener("template-loaded", () => {
  const filterForm = document.querySelectorAll(".filter__form-group");
  filterForm.forEach((group) => {
    group.addEventListener("click", (event) => {
      if (event.target.classList.contains("prod-info__tag")) {
        group.querySelectorAll(".prod-info__tag").forEach((tag) => {
          tag.classList.remove("prod-info__tag--active");
        });
        event.target.classList.add("prod-info__tag--active");
      }
    });
  });
});

// theme
window.addEventListener("template-loaded", () => {
  const switchBtn = document.querySelector("#switch-theme-btn");
  if (switchBtn) {
    switchBtn.onclick = function () {
      const isDark = localStorage.dark === "true";
      document.querySelector("html").classList.toggle("dark", !isDark);
      localStorage.setItem("dark", !isDark);
      switchBtn.querySelector("span").textContent = isDark ? "Dark mode" : "Light mode";
    };
    const isDark = localStorage.dark === "true";
    switchBtn.querySelector("span").textContent = isDark ? "Light mode" : "Dark mode";
  }
});

const isDark = localStorage.dark === "true";
document.querySelector("html").classList.toggle("dark", isDark);