const fs = require('fs');
const path = require('path');

// Make sure the products directory exists
const productsDir = path.join(__dirname, '../public/products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Create simple placeholder SVGs for each product
const products = [
  { name: 'sharp-fridge', color: '#81c784', text: 'Sharp Fridge' },
  { name: 'sanaky-freezer', color: '#64b5f6', text: 'Sanaky Freezer' },
  { name: 'asanzo-ac', color: '#ffb74d', text: 'Asanzo AC' },
  { name: 'silver-fridge', color: '#a5d6a7', text: 'Silver Fridge' },
  { name: 'book', color: '#fff176', text: 'Book A-Z' },
  { name: 'ac-unit', color: '#ef9a9a', text: 'AC Unit' },
];

products.forEach(product => {
  const svg = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${product.color}" />
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${product.text}</text>
</svg>
  `.trim();
  
  fs.writeFileSync(path.join(productsDir, `${product.name}.jpg`), svg);
  console.log(`Created placeholder for ${product.name}`);
});

console.log('All placeholders created successfully'); 