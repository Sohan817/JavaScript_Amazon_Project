function Cart(localStorageKey) {
  const cart = {
    cartitems: undefined,
    loadStorage() {
      this.cartitems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartitems) {
        this.cartitems = [];
      }
    },

    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartitems));
    },

    addToCart(productId) {
      let matchingItem;
      this.cartitems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      let quantityEl = document.querySelector(
        `.js-product-quantity-${productId}`,
      );

      if (!quantityEl) {
        quantityEl = 0;
      }
      let Quantity = Number(quantityEl.value);

      this.cartitems.push({
        // productId: productId,
        // quantity: Quantity,
        productId,
        Quantity,
        delivaryOptionsId: "1",
      });
      this.saveToLocalStorage();
    },

    removeItemFromCart: function (productId) {
      let newCart = [];
      this.cartitems.forEach((cartItem) => {
        if (cartItem.productId != productId) {
          newCart.push(cartItem);
        }
      });

      this.cartitems = newCart;
      this.saveToLocalStorage();
    },

    totalCartItem() {
      let totalCartQuantity = 0;
      this.cartitems.forEach((quantity) => {
        totalCartQuantity = totalCartQuantity + quantity.Quantity;
      });
      return totalCartQuantity;
    },

    updateCheckOutPageQuantity(productId, newQuantity) {
      this.cartitems.forEach((quantity) => {
        if (quantity.productId === productId) {
          if (newQuantity > 0 && newQuantity <= 1000) {
            quantity.Quantity = newQuantity;
          } else {
            quantity.Quantity = quantity.Quantity;
          }
        }
      });
      this.saveToLocalStorage();
    },

    selectDelevaryOption(productId, delivaryOptionsId) {
      let matchingItem;
      this.cartitems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      if (!matchingItem || !validDeliveryOptionId(delivaryOptionsId)) {
        return;
      }

      matchingItem.delivaryOptionsId = delivaryOptionsId;
      this.saveToLocalStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("business-cart-oop");
cart.loadStorage();
businessCart.loadStorage();
console.log(cart);
console.log(businessCart);
