let favorites = [];
function updateFavorites() {
  if (localStorage.getItem("favoriteList")) {
    favorites = JSON.parse(localStorage.getItem("favoriteList"));
  }
  let buttons = document.querySelectorAll(".like-btn");

  buttons.forEach((button) => {
    const productId = button.getAttribute("data-id");
    let icon = button.querySelector(".like-btn__icon");
    const isFavorited = favorites.some((item) => item.id == productId);
    if (isFavorited) {
      icon.src = "../assets/icons/heart-red.svg"; 
      icon.classList.remove("icon"); 
    } else {
      icon.src = "../assets/icons/heart.svg"; 
      icon.classList.add("icon"); 
    }
  });
  // Cập nhật số lượng yêu thích
  document.querySelector(".top-act__title").innerHTML = favorites.length;
  document.querySelector(".favorite-dropdown__title").innerHTML = `You have ${favorites.length} item(s)`;
  let html = "";
  favorites.forEach((item) => {
    html += ` 
                <div class="col">
                  <article class="cart-preview-item">
                    <div class="cart-preview-item__img-wrap">
                      <img src="../assets/img/product/item-${item.id}.png" alt="" class="cart-preview-item__thumb">
                    </div>
                    <h3 class="cart-preview-item__title">${item.title}</h3>
                    <p class="cart-preview-item__price">$${item.price}</p>
                  </article>
                </div>
      `;

    document.querySelector(".favorite-dropdown").innerHTML = html;
  });
}

function addToFavorite(code) {
  let itemIndex = -1;
  let button = document.querySelector(`.like-btn[data-id="${code}"]`);
  let icon = button.querySelector(".like-btn__icon");

  if (localStorage.getItem("favoriteList") != undefined) {
    favorites = JSON.parse(localStorage.getItem("favoriteList"));
    itemIndex = favorites.findIndex((item) => item.id == code);
  }
  // = -1 là không có
  if (itemIndex == -1) {
    let item = productList.find((x) => x.id == code);
    favorites.push(item);
    icon.src = "../assets/icons/heart-red.svg"; 
    icon.classList.remove("icon"); 
  } else {
    favorites.splice(itemIndex, 1);
    icon.src = "../assets/icons/heart.svg"; 
    icon.classList.add("icon"); 
  }
  if (favorites.length > 0) {
    localStorage.setItem("favoriteList", JSON.stringify(favorites));
  } else {
    localStorage.removeItem("favoriteList");
  }
  const topActTitle = document.querySelector(".top-act__number");
  if (topActTitle) {
    topActTitle.innerHTML = favorites.length;
  }
  updateFavorites();
}
// hiển thị trên trang favorite.html
function displayFavorite(idElement) {
  let checkAll = document.querySelector(".cart-info__check-all");
  let itemQuantity = document.querySelector(".cart-info__desc");
  let favorites = JSON.parse(localStorage.getItem("favoriteList"));
  if (favorites) {
    let html = ``;
    favorites.forEach((item) => {
      html += ` 
      <article class="cart-item">
                          <label class="cart-info__checkbox favourite__checkbox">
                            <input type="checkbox" name="favourite" class="cart-info__checkbox-input d-none">
                          </label>
                          <a href="product-detail.html?productId=${item.id}" onclick="viewProductDetail('${item.id}')">
                            <img src="../assets/img/product/item-${item.id}.png" alt="" class="cart-item__thumb">
                          </a>
                          <div class="cart-item__content">
                            <div class="cart-item__content-left">
                              <h3 class="cart-item__title">
                                <a href="product-detail.html?productId=${item.id}" onclick="viewProductDetail('${item.id}')">${item.title}</a>
                              </h3>
                              <p class="cart-item__price-wrap">
                                 ${item.price}
                                <span class="cart-item__status">In Stock</span>
                              </p>
<div class="cart-item__ctrl-wrap">
                                                    <div class="cart-item__ctrl cart-item__ctrl--md-block">
                                                        <div class="cart-item__input">
                                                        ${item.brand}
                                                        </div>
                          <div class="cart-item__input">
                            <button class="cart-item__input-btn decrease" onclick="decrease('${item.id}', true)">
                              <img class="icon" src="../assets/icons/minus.svg" alt="" />
                            </button>
                            <span class="cart-item__quantity" data-quantity="${item.quantity}" data-id="${item.id}">1</span>
                            <button class="cart-item__input-btn increase" onclick="increase('${item.id}', true)">
                              <img class="icon" src="../assets/icons/plus.svg" alt="" />
                            </button>
                          </div>
                                                    </div>
                                                    <div class="cart-item__ctrl">
                                                        <button class="cart-item__ctrl-btn">
                                                            <img src="../assets/icons/heart2.svg" alt="">
                                                            Save
                                                        </button>
                                                       <button class="cart-item__ctrl-btn removeCart" onclick="removeFavorite('${item.id}')">
                            <img src="../assets/icons/trash.svg" alt="">
                            Delete
                          </button>
                                                    </div>
                                                </div>
                            </div>
                            <div class="cart-item__content-right">
                              <p class="cart-item__total-price">$ ${item.price}</p>
                              <button class="btn btn--primary cart-item__checkout-btn add-to-cart"  data-id="${item.id}" onclick="addToCart('${item.id}')">Add to cart</button>
                            </div>
                          </div>
                        </article>
            `;
      idElement.innerHTML = html;
    });
  }

  if (favorites.length > 0) {
    itemQuantity.textContent = `${favorites.length} items`;
    checkAll.classList.remove("d-none");
  } else {
    itemQuantity.textContent = `Your favorite list is empty.  Start adding some products you love!`;
    checkAll.classList.add("d-none");
  }

  document.getElementById("checkAll").addEventListener("change", function () {
    const isChecked = this.checked; 
    const itemCheckboxes = document.querySelectorAll(".cart-info__checkbox-input");

    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked; 
    });
  });
}

function removeFavorite(code) {
  console.log(code);
  favorites = JSON.parse(localStorage.getItem("favoriteList"));
  itemIndex = favorites.findIndex((item) => item.id == code);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    favorites.splice(itemIndex, 1);
  }
  localStorage.setItem("favoriteList", JSON.stringify(favorites));
  location.reload();
}


