let productHtml = "";

products.forEach((prduct) => {
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${prduct.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prduct.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${prduct.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${prduct.rating.count}</div>
          </div>

          <div class="product-price">$${(prduct.priceCents / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${prduct.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productHtml;

document
  .querySelectorAll(".js-add-to-cart")
  .forEach((addToCartButtonElement) => {
    addToCartButtonElement.addEventListener("click", () => {
      const productId = addToCartButtonElement.dataset.productId;
      let matchingItem;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }

      let totalCartQuantity = 0;
      cart.forEach((quantity) => {
        totalCartQuantity = totalCartQuantity + quantity.quantity;
      });

      document.querySelector(".js-cart-quantity").innerHTML = totalCartQuantity;
    });
  });
