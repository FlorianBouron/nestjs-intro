import { Injectable, NotFoundException } from '@nestjs/common';
import uniqid = require('uniqid');
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const productId = uniqid();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    const productIndex = this.products.findIndex(prod => prod.id === productId);
    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    this.products.splice(productIndex, 1);
  }

  private findProduct(id: string): Product {
    const product = this.products.find(prod => prod.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
