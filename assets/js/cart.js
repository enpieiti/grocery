function updateCart() {
  let carts = [];
  if (localStorage.getItem("cartList")) {
    carts = JSON.parse(localStorage.getItem("cartList"));
  }
  const totalPrice = carts
    .reduce((sum, product) => sum + parseFloat(product.price * product.quantitySold) * 1.1, 0)
    .toFixed(0);

  document.querySelector(".top-act__total").textContent = `$${totalPrice}`;
  document.querySelector(".cart-dropdown__title").textContent = `You have ${carts.length} item(s)`;
  let html = "";
  carts.forEach((item) => {
    html += ` 
                <div class="col">
                  <article class="cart-preview-item">
                    <div class="cart-preview-item__img-wrap">
                      <img src="../assets/img/product/item-${item.id}.png" alt="" class="cart-preview-item__thumb" />
                    </div>
                    <h3 class="cart-preview-item__title">${item.title}</h3>
                    <p class="cart-preview-item__price">$${item.price} x ${item.quantitySold}</p>
                  </article>
                </div>
      `;
    document.querySelector(".cart-dropdown").innerHTML = html;
  });
  totalCart();
}

function addToCart(code) {
  console.log("ID clicked:", code);
  let carts = [];
  let button = document.querySelector(`.add-to-cart[data-id="${code}"]`);

  let quantitySpan = document.querySelector(".cart-item__quantity");
  let itemIndex = -1;
  if (localStorage.getItem("cartList") != undefined) {
    carts = JSON.parse(localStorage.getItem("cartList"));
    itemIndex = carts.findIndex((item) => item.id == code);
  }

  if (itemIndex == -1) {
    let item = productList.find((x) => x.id == code);
    item.quantitySold = quantitySpan.textContent;
    carts.push(item);
    
    button.textContent = "Added to Cart";
  }
  if (carts.length > 0) {
    localStorage.setItem("cartList", JSON.stringify(carts));
  } else {
    localStorage.removeItem("cartList");
  }

  const topActTotal = document.querySelector(".top-act__total");
  const totalPrice = carts.reduce((sum, product) => sum + parseFloat(product.price), 0);
  if (topActTotal) {
    topActTotal.innerHTML = `$${totalPrice}`;
  }
  updateCart();
}
// hiển thị list cart trên trang checkout.html
function displayCart(idElement) {
  let carts = [];
  let cart = JSON.parse(localStorage.getItem("cartList"));
  if (cart) {
    let html = ``;
    cart.forEach((item) => {
      html += `
                <article class="cart-item prod-item">
                    <a href="product-detail.html?productId=${item.id}">
                      <img src="../assets/img/product/item-${item.id}.png" alt="" class="cart-item__thumb">
                    </a>
                    <div class="cart-item__content">
                      <div class="cart-item__content-left">
                        <h3 class="cart-item__title">
                        ${item.title}
                        
                          <a href="product-detail.html?productId=${item.id}"></a>
                        </h3>
                        <p class="cart-item__price-wrap unitprice">
                           ${item.price}
                          <span class="cart-item__status">In Stock</span>
                        </p>
                        <div class="cart-item__ctrl cart-item__ctrl--md-block">
                          <div class="cart-item__input">
                             ${item.brand}
                          </div>
                          <div class="cart-item__input">
                            <button class="cart-item__input-btn decrease" onclick="decrease('${item.id}', true)">
                              <img class="icon" src="../assets/icons/minus.svg" alt="" />
                            </button>
                            <span class="cart-item__quantity" data-quantity="${item.quantity}"   data-id="${item.id}">${
        item.quantitySold
      }</span>
                            <button class="cart-item__input-btn increase" onclick="increase('${item.id}', true)">
                              <img class="icon" src="../assets/icons/plus.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="cart-item__content-right">
                      <span class="prod-info__tax prod-info__tax-cart">10%</span>
                        <p class="cart-item__total-price total-price" data-id="${item.id}">$${(
        item.price *
        item.quantitySold *
        1.1
      ).toFixed(2)}</p>
                        <div class="cart-item__ctrl">
                          <button class="cart-item__ctrl-btn">
                            <img src="../assets/icons/heart2.svg" alt="">
                            Save
                          </button>
                          <button class="cart-item__ctrl-btn removeCart" onclick="removeCart('${item.id}')">
                            <img src="../assets/icons/trash.svg" alt="">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  
            `;
      idElement.innerHTML = html;
    });
  } else {
    document.querySelector(".cartEmpty").innerHTML = `You don't have any products in your cart yet.`;
  }
  let locationBtn = document.querySelector(".user-address__btn");
  if (locationBtn) {
    locationBtn.addEventListener("click", setupLocation);
  }
}

function removeCart(code) {
  let carts = [];
  carts = JSON.parse(localStorage.getItem("cartList"));
  itemIndex = carts.findIndex((item) => item.id == code);

  if (itemIndex !== -1) {
    carts.splice(itemIndex, 1);
  }
  localStorage.setItem("cartList", JSON.stringify(carts));
  location.reload();
}

function totalCart() {
  let carts = [];
  let sum = 0;
  carts = JSON.parse(localStorage.getItem("cartList"));
  if (carts) {
    carts.forEach((item) => {
      sum += Number(item.quantitySold) * Number(item.price * 1.1);
    });
    let numberItem = document.querySelector(".numberCart");
    if (numberItem) {
      numberItem.textContent = carts.length;
    }
    document.querySelectorAll(".totalPrice").forEach((item) => {
      item.textContent = `$${sum.toFixed(2)}`;
    });
    document.querySelectorAll(".total").forEach((item) => {
      item.textContent = `$${(sum + 10).toFixed(2)}`;
    });
  }
}
function setupLocation() {
  const options = document.querySelectorAll(".form__option");
  document.querySelector(".form__search-input").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase(); 
    options.forEach((option) => {
      const optionText = option.textContent.toLowerCase(); 
      if (optionText.includes(searchTerm)) {
        option.style.display = "block"; 
      } else {
        option.style.display = "none"; 
      }
    });
  });
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Cập nhật giá trị cho input
      const cityInput = document.querySelector("#city");
      cityInput.value = this.textContent;

      // Đóng dialog (ẩn city dialog)
      const cityDialog = document.querySelector("#city-dialog");

      cityDialog.classList.remove("show");
      cityDialog.classList.add("hide");
      // Đánh dấu mục được chọn (thêm class)
      document.querySelectorAll(".form__option").forEach((option) => {
        option.classList.remove("form__option--current");
      });
      this.classList.add("form__option--current");
    });
  });
}
