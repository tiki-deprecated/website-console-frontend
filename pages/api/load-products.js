export async function loadProducts() {
    const data = await fetch('http://.netlify/functions/get-products')
      .then((res) => res.json())
      .catch((err) => console.error(err));

      return data;
  
  }