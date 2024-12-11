const productList = [
  {
    id: "1",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 1 ",
    brand: "Lavazza",
    price: "47.00",
    score: "4.3",
    quantity: "10",
    quantitySold: "",
  },
  {
    id: "2",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 2 ",
    brand: "Nescafe",
    price: "137.00",
    score: "3.4",
    quantity: "11",
    quantitySold: "",
  },
  {
    id: "3",
    title: "Lavazza - Caffè Espresso Black Tin - Ground coffee 3 ",
    brand: "Starbucks",
    price: "170.00",
    score: "5.0",
    quantity: "12",
    quantitySold: "",
  },
  {
    id: "4",
    title: "Qualità Oro Mountain Grown - Espresso Coffee Beans 4",
    brand: "Lavazza",
    price: "45.00",
    score: "4.4",
    quantity: "13",
    quantitySold: "",
  },
  {
    id: "5",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 5",
    brand: "Lavazza",
    price: "130.00",
    score: "4.3",
    quantity: "14",
    quantitySold: "",
  },
  {
    id: "6",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 6",
    brand: "Nescafe",
    price: "153.00",
    score: "3.4",
    quantity: "15",
    quantitySold: "",
  },
  {
    id: "7",
    title: "Lavazza - Caffè Espresso Black Tin - Ground coffee 7",
    brand: "Starbucks",
    price: "99.00",
    score: "5.0",
    quantity: "16",
    quantitySold: "",
  },
  {
    id: "8",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 8",
    brand: "Starbucks",
    price: "140.00",
    score: "5.0",
    quantity: "20",
    quantitySold: "",
  },
  {
    id: "9",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 9",
    brand: "Nescafe",
    price: "120.00",
    score: "4.3",
    quantity: "18",
    quantitySold: "",
  },
  {
    id: "10",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 10",
    brand: "Starbucks",
    price: "53.00",
    score: "3.4",
    quantity: "19",
    quantitySold: "",
  },
  {
    id: "11",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 11",
    brand: "Lavazza",
    price: "147.00",
    score: "4.3",
    quantity: "20",
    quantitySold: "",
  },
  {
    id: "12",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 12",
    brand: "Lavazza",
    price: "53.00",
    score: "3.4",
    quantity: "21",
    quantitySold: "",
  },
  {
    id: "13",
    title: "Lavazza - Caffè Espresso Black Tin - Ground coffee 13 ",
    brand: "Starbucks",
    price: "149.00",
    score: "5.0",
    quantity: "22",
    quantitySold: "",
  },
  {
    id: "14",
    title: "Qualità Oro Mountain Grown - Espresso Coffee Beans 14",
    brand: "Nescafe",
    price: "40.00",
    score: "4.4",
    quantity: "23",
    quantitySold: "",
  },
  {
    id: "15",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 15",
    brand: "Starbucks",
    price: "87.00",
    score: "4.3",
    quantity: "24",
    quantitySold: "",
  },
  {
    id: "16",
    title: "Lavazza Coffee Blends - Try the Italian Espressos 16",
    brand: "Lavazza",
    price: "175.00",
    score: "3.4",
    quantity: "25",
    quantitySold: "",
  },
  {
    id: "17",
    title: "Lavazza - Caffè Espresso Black Tin - Ground coffee 17",
    brand: "Starbucks",
    price: "175.00",
    score: "5.0",
    quantity: "21",
    quantitySold: "",
  },
  {
    id: "18",
    title: "Qualità Oro Mountain Grown - Espresso Coffee Beans 18",
    brand: "Lavazza",
    price: "195.00",
    score: "4.4",
    quantity: "23",
    quantitySold: "",
  },
  {
    id: "19",
    title: "Coffee Beans - Espresso Arabica and Robusta Beans 19",
    brand: "Lavazza",
    price: "47.00",
    score: "4.3",
    quantity: "20",
    quantitySold: "",
  },
  {
    id: "20",
    title: "Starbucks Coffee Blends - Try the Italian Espressos 20",
    brand: "Nescafe",
    price: "200.00",
    score: "3.4",
    quantity: "12",
    quantitySold: "",
  },
];
// home page
function displayProduct(list, element) {
  let html = ``;
  list.forEach((item) => {
    html += ` 
        <div class="col">
          <article class="product-card" >
            <div class="product-card__img-wrap">
              <a href="product-detail.html?productId=${item.id}">
                <img src="../assets/img/product/item-${item.id}.png" alt="" class="product-card__thumb" />
              </a>
              <button class="like-btn product-card__like-btn" data-id="${item.id}" onclick="addToFavorite('${item.id}')">
                <img src="../assets/icons/heart.svg" alt="" class="like-btn__icon icon" />
              </button>
            </div>
            <h3 class="product-card__title" onclick="viewProductDetail('${item.id}')">
              <a href="product-detail.html?productId=${item.id}">${item.title}</a>
            </h3>
            <p class="product-card__brand">${item.brand}</p>
            <div class="product-card__row">
              <span class="product-card__price">$${item.price}</span>
              <img src="../assets/icons/star.svg" alt="" class="product-card__star" />
              <span class="product-card__score">${item.score}</span>
            </div>

          </article>
        </div>
`;
  });

  element.innerHTML = html;
}

// filter

function filterByPriceRange(products, minPrice, maxPrice) {
  return products.filter((product) => {
    const price = parseFloat(product.price); // Chuyển giá thành số thực
    return price >= minPrice && price <= maxPrice; // Kiểm tra giá trong khoảng
  });
}

function viewProductDetail(code) {
  window.location = `product-detail.html?productId=${code}`; // Điều hướng đến trang chi tiết
}

// product detail page
function loadProductDetail(element) {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("productId");

  const product = productList.find((x) => x.id === code);
  let html = `
                <section class="prod-info prod-item">
                  <h1 class="prod-info__heading">${product.title}</h1>
                  <div class="row">
                    <div class="col-5 col-xxl-6 col-xl-12">
                      <div class="prod-prop">
                        <img src="../assets/icons/star.svg" alt="" class="prod-prop__icon" />
                        <h4 class="prod-prop__title">(${product.score}) 1100 reviews</h4>
                      </div>
                      <label for="" class="form__label prod-info__label">Weight</label>
                      <div class="filter__form-group">
                        <div class="form__select-wrap prod-prop__select-wrap">
                          <select class="form__select" name="gram">
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                          </select>
                          <div class="form__select form__name">gram</div>
                        </div>
                        <div class="filter__form-group">
                          <div class="form__tags prod-info__tags">
                            <button class="form__tag prod-info__tag prod-info__tag--active">Small</button>
                            <button class="form__tag prod-info__tag">Medium</button>
                            <button class="form__tag prod-info__tag">Large</button>
                          </div>
                        </div>
                        <div class="prod-prop__cart cart-item__ctrl cart-item__ctrl--md-block">
                          <div class="cart-item__input">${product.brand}</div>
                           <div class="cart-item__input">
                            <button class="cart-item__input-btn decrease" onclick="decrease('${product.id}')">
                              <img class="icon" src="../assets/icons/minus.svg" alt="" />
                            </button>
                            <span class="cart-item__quantity" data-quantity="${product.quantity}" data-id="${
    product.id
  }">1</span>
                            <button class="cart-item__input-btn increase" onclick="increase('${product.id}')">
                              <img class="icon" src="../assets/icons/plus.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div class="prod-prop__stock">
                          <span class="prod-prop__quantity">${product.quantity}</span>
                          <span>units in stock</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-7 col-xxl-6 col-xl-12">
                      <div class="prod-props">
                        <div class="prod-prop">
                          <img src="../assets/icons/document.svg" alt="" class="prod-prop__icon icon" />
                          <h4 class="prod-prop__title">Compare</h4>
                        </div>
                        <div class="prod-prop">
                          <img src="../assets/icons/buy.svg" alt="" class="prod-prop__icon icon" />
                          <div>
                            <h4 class="prod-prop__title">Delivery</h4>
                            <p class="prod-prop__desc">From $6 for 1-3 days</p>
                          </div>
                        </div>
                        <div class="prod-prop">
                          <img src="../assets/icons/bag.svg" alt="" class="prod-prop__icon icon" />
                          <div>
                            <h4 class="prod-prop__title">Pickup</h4>
                            <p class="prod-prop__desc">Out of 2 store, today</p>
                          </div>
                        </div>
                        <div class="prod-info__card">
                          <div class="prod-info__row">
                            <span class="prod-info__price unitprice">$${product.price}</span>
                            <span class="prod-info__tax">10%</span>
                          </div>
                          <p class="prod-info__total-price">$${(product.price * 1.1).toFixed(2)}</p>
                          <div class="prod-info__row">
                            <button class="btn btn--primary prod-info__add-to-cart add-to-cart" data-id="${
                              product.id
                            }" onclick="addToCart('${product.id}')">Add to cart</button>
                            <button class="like-btn prod-info__like-btn" data-id="${
                              product.id
                            }" onclick="addToFavorite('${product.id}')">
                              <img src="../assets/icons/heart.svg" alt="" class="like-btn__icon icon" />
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

  `;
  element.innerHTML = html;
}
// preview img product detail
function setupPreviewImg() {
  const thumbnails = document.querySelectorAll(".prod-preview__thumb-img");
  const previewImage = document.querySelector(".prod-preview__main-img");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Lấy URL của hình nhỏ và set vào hình lớn
      thumbnails.forEach((thumb) => thumb.classList.remove("prod-preview__thumb-img--current"));
      previewImage.src = thumbnail.src;
      thumbnail.classList.add("prod-preview__thumb-img--current");
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  setupPreviewImg();
});

// Hàm Decrease
const decrease = (key, isCheckout = false) => {
  // Lấy giá trị số lượng hiện tại
  let quantitySpan = document.querySelector(`.cart-item__quantity[data-id="${key}"]`);
  let totalSpan = document.querySelector(`.cart-item__total-price[data-id="${key}"]`);
  let currentQuantity = parseInt(quantitySpan.textContent);

  if (currentQuantity > 1) {
    let newQuantity = currentQuantity - 1;
    quantitySpan.textContent = newQuantity;
    if (isCheckout) {
      let carts = JSON.parse(localStorage.getItem("cartList")) || [];
      let vt = carts.findIndex((item) => item.id == key);
      let totalPrice = "";
      if (vt !== -1) {
        carts[vt].quantitySold = newQuantity;
        localStorage.setItem("cartList", JSON.stringify(carts));
        totalPrice = carts[vt].quantitySold * carts[vt].price;
        totalSpan.textContent = `$${(totalPrice * 1.1).toFixed(2)}`;
      }
      quantitySpan.textContent = newQuantity;

      totalCart();
      updateCart();
    }
  } else {
    alert("The quantity cannot be less than 1!");
  }
};
// Hàm Increase
const increase = (key, isCheckout = false) => {
  // Lấy giá trị số lượng hiện tại

  let quantitySpan = document.querySelector(`.cart-item__quantity[data-id="${key}"]`);
  let totalSpan = document.querySelector(`.cart-item__total-price[data-id="${key}"]`);
  let quantityInStock = parseInt(quantitySpan.getAttribute("data-quantity"));
  let currentQuantity = parseInt(quantitySpan.textContent);

  if (currentQuantity < quantityInStock) {
    let newQuantity = currentQuantity + 1;
    quantitySpan.textContent = newQuantity;
    if (isCheckout) {
      let carts = JSON.parse(localStorage.getItem("cartList")) || [];
      let vt = carts.findIndex((item) => item.id == key);

      if (vt !== -1) {
        carts[vt].quantitySold = newQuantity;
        localStorage.setItem("cartList", JSON.stringify(carts));
        totalPrice = carts[vt].quantitySold * carts[vt].price;
        totalSpan.textContent = `$${(totalPrice * 1.1).toFixed(2)}`;
      }
      quantitySpan.textContent = newQuantity; //
      totalCart();
      updateCart();
    }
  } else {
    alert("The quantity has reached the maximum in stock!");
  }
};
