export async function loadProducts() {
    const data = await fetch('http://www.nba.com')
      .then((res) => res.json())
      .catch((err) => console.error(err));

      return data;
  
  }


  // const data = await fetch('http://localhost:8888/.netlify/functions/get-products')