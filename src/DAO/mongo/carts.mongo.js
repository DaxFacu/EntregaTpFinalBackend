import { CartModel } from "./models/carts.model.js";

class CartsMongo {
  async getAllCarts() {
    const carts = await CartModel.find();
    return carts;
  }

  async createCart() {
    const cartCreated = await CartModel.create({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  }

  async findCart(id) {
    const cartFind = await CartModel.findOne({ _id: id });
    return cartFind;
  }

  async updateCart(cid, products) {
    const cartUpdated = await CartModel.updateOne(
      { _id: cid },
      { products: { ...products } }
    );
    return cartUpdated;
  }

  async updateQuantityItemCart(cid, pid, quantity) {}

  async deleteCard(cid) {
    const deleted = await CartModel.updateOne({ _id: cid }, { products: [] });
    return deleted;
  }

  async addProductToCart(cid, pid) {
    const productToCart = await CartModel.findOne({ _id: cid });

    const existingProduct = productToCart.products.find(
      (item) => item.product._id == pid
    );
    const existingIndex = productToCart.products.findIndex(
      (item) => item.product._id == pid
    );

    if (existingProduct) {
      const existingProductIndex = "products." + existingIndex + ".quantity";
      const existingProductQuantity = existingProduct.quantity + 1;
      const updateCart = await CartModel.updateOne(
        { _id: cid },
        {
          $set: {
            [existingProductIndex]: existingProductQuantity,
          },
        }
      );

      return updateCart;
    } else {
      productToCart.products.push({ product: pid, quantity: 1 });
      const updateCart = await CartModel.updateOne({ _id: cid }, productToCart);
      return updateCart;
    }
  }

  async deleteProductToCart(cid, pid) {
    const deletedProduct = await CartModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: pid } } },
      { new: true }
    );
    return deletedProduct;
  }
}

export const cartsMongo = new CartsMongo();
