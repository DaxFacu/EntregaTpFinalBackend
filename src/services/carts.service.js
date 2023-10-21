import { cartsMongo } from "../DAO/mongo/carts.mongo.js";
import { ticketMongo } from "../DAO/mongo/ticket.mongo.js";
import { productsMongo } from "../DAO/mongo/products.mongo.js";
import dateFormat from "../utils/date-fns.js";

class CartsService {
  getAllCarts = async () => {
    const carts = await cartsMongo.getAllCarts();
    return carts;
  };

  createCart = async () => {
    const cartCreated = await cartsMongo.createCart({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  };

  findCart = async (id) => {
    const cartFind = await cartsMongo.findCart(id);
    return cartFind;
  };

  updateCart = async (cid, products) => {
    const cartUpdated = await cartsMongo.updateCart(cid, products);
    return cartUpdated;
  };

  updateQuantityItemCart = async (cid, pid, quantity) => {
    const cartQuantityUpdated = await cartsMongo.updateQuantityItemCart(
      cid,
      pid,
      quantity
    );
    return cartQuantityUpdated;
  };

  addProductToCart = async (cid, pid) => {
    const productToCart = await cartsMongo.addProductToCart(cid, pid);
    return productToCart;
  };

  deleteProductsCard = async (cid) => {
    const deleted = await cartsMongo.deleteProductsCard(cid);
    return deleted;
  };

  deleteCard = async (cid) => {
    const deleted = await cartsMongo.deleteCard(cid);
    return deleted;
  };

  purchase = async (cid, userMail) => {
    const productsCart = await cartsMongo.findCart(cid);
    let productsCartS = productsCart.products.map((product) => {
      return {
        title: product.product.title,
        description: product.product.description,
        stock: product.product.stock,
        price: product.product.price,
        id: product.product._id,
        quantity: product.quantity,
      };
    });

    const products = [];

    for (let i = 0; i < productsCart.products.length; i++) {
      const productos = await productsMongo.findProduct(
        productsCart.products[i].product._id
      );

      if (productsCart.products[i].quantity <= productos.stock) {
        products.push(productsCart.products[i]);
        await cartsMongo.deleteProductToCart(cid, productsCart.products[i]._id);
        await productsMongo.updateStockProduct(
          productos._id,
          productos.stock - productsCart.products[i].quantity
        );
      } else {
      }
    }

    const code = Date.now() + Math.floor(Math.random() * 10000 + 1);
    const purchase_datatime = dateFormat.getDate().toString();

    const amountCart = productsCartS.reduce((sum, producto) => {
      return sum + producto.price;
    }, 0);

    const amount = amountCart;

    const purchaser = userMail;
    const purchase = await ticketMongo.createTicket(
      code,
      purchase_datatime,
      amount,
      purchaser
    );
    return purchase;
  };

  async deleteProductToCard(cid, pid) {
    const deletedProduct = await cartsMongo.deleteProductToCart(cid, pid);
    return deletedProduct;
  }
}

export const cartsService = new CartsService();
