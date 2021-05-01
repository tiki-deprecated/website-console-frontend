import React from 'react';
import { loadProducts } from './api/load-products.js';
import styles from '../styles/Home.module.css'

export default function Payment(){
    let products = loadProducts()
    // if (loadProducts()) {
    //     products = loadProducts();
    // };

    console.log(products)

    // console.log(loadProducts());
    if (products) {
        return 'yes'
    } else {
        return 'loading...'
    }
}
