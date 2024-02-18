const firebase = require('../firebase.js');
const Product = require('../models/product.js');

const {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const db = getFirestore(firebase);

class ProductController {
  static async create(req, res) {
    try {
      const data = req.body;
      await addDoc(collection(db, 'products'), data);
      res.status(200).send('product created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async list(req, res) {
    try {
      const products = await getDocs(collection(db, 'products'));
      const productArray = [];

      if (products.empty) {
        res.status(400).send('No Products found');
      } else {
        products.forEach((doc) => {
          const product = new Product(
            doc.id,
            doc.data().name,
            doc.data().price,
            doc.data().retailer,
            doc.data().amountInStock
          );
          productArray.push(product);
        });

        res.status(200).send(productArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async detail(req, res) {
    try {
      const id = req.params.id;
      const product = doc(db, 'products', id);
      const data = await getDoc(product);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('product not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const product = doc(db, 'products', id);
      await updateDoc(product, data);
      res.status(200).send('product updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'products', id));
      res.status(200).send('product deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = ProductController;
