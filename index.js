import fetch from 'node-fetch';
import xlsx from 'xlsx';

(async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    const formattedProducts = products.map(product => ({
        name: product.title,
        price: product.price,
        availability: product.rating.count > 0 ? 'In Stock' : 'Out of Stock',
        rating: product.rating.rate
    }));

    console.log(formattedProducts);

    
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedProducts);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');
    xlsx.writeFile(workbook, 'products.xlsx');

    console.log('Data saved to products.xlsx');
})();
