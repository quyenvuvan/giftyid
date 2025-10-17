import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create lightning bolt SVG
const lightningSvg = `
<svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32.5 0L0 55H25L15 100L55 40H30L42.5 0H32.5Z" fill="white" fill-opacity="0.8"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'lightning.svg'), lightningSvg);

// Create mini logo for banners
const createLogoMini = async (): Promise<void> => {
  const canvas = createCanvas(60, 60);
  const ctx = canvas.getContext('2d');
  
  // Draw green background
  ctx.fillStyle = '#008751';
  ctx.fillRect(0, 0, 60, 60);
  
  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('V', 30, 30);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'logo-mini.png'), buffer);
};

// Create hero product images
const createHeroImage = async (filename: string, color: string, productCount: number): Promise<void> => {
  const canvas = createCanvas(500, 400);
  const ctx = canvas.getContext('2d');
  
  // Create product shapes
  for (let i = 0; i < productCount; i++) {
    // Random position and size for each product
    const x = 100 + Math.random() * 300;
    const y = 50 + Math.random() * 300;
    const size = 80 + Math.random() * 120;
    
    // Random shape (bottle or box)
    const isBottle = Math.random() > 0.5;
    
    if (isBottle) {
      // Draw a bottle
      ctx.fillStyle = color;
      
      // Bottle body
      ctx.beginPath();
      ctx.ellipse(x, y + size * 0.7, size * 0.3, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(x - size * 0.3, y + size * 0.7);
      ctx.lineTo(x - size * 0.2, y);
      ctx.lineTo(x + size * 0.2, y);
      ctx.lineTo(x + size * 0.3, y + size * 0.7);
      ctx.fill();
      
      // Bottle cap
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.rect(x - size * 0.1, y - size * 0.15, size * 0.2, size * 0.15);
      ctx.fill();
    } else {
      // Draw a box
      ctx.fillStyle = color;
      ctx.fillRect(x - size * 0.3, y - size * 0.4, size * 0.6, size * 0.8);
      
      // Label
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - size * 0.25, y - size * 0.2, size * 0.5, size * 0.4);
    }
  }
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buffer);
};

// Create service scheduling image
const createServiceImage = async (): Promise<void> => {
  const canvas = createCanvas(500, 400);
  const ctx = canvas.getContext('2d');
  
  // Draw a delivery truck
  const truckX = 250;
  const truckY = 200;
  const truckSize = 200;
  
  // Truck body
  ctx.fillStyle = '#9F7AEA'; // Purple color
  ctx.fillRect(truckX - truckSize * 0.4, truckY - truckSize * 0.25, truckSize * 0.8, truckSize * 0.4);
  
  // Truck cabin
  ctx.fillStyle = '#805AD5'; // Darker purple
  ctx.fillRect(truckX - truckSize * 0.4, truckY - truckSize * 0.25, truckSize * 0.25, truckSize * 0.3);
  
  // Wheels
  ctx.fillStyle = '#2D3748'; // Dark gray
  ctx.beginPath();
  ctx.arc(truckX - truckSize * 0.25, truckY + truckSize * 0.15, truckSize * 0.08, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(truckX + truckSize * 0.25, truckY + truckSize * 0.15, truckSize * 0.08, 0, Math.PI * 2);
  ctx.fill();
  
  // Window
  ctx.fillStyle = '#A0AEC0'; // Light blue gray
  ctx.fillRect(truckX - truckSize * 0.35, truckY - truckSize * 0.15, truckSize * 0.15, truckSize * 0.12);
  
  // GiftyID logo on truck
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GiftyID', truckX + truckSize * 0.1, truckY);
  
  // Calendar icon
  const calX = 100;
  const calY = 100;
  const calSize = 80;
  
  // Calendar body
  ctx.fillStyle = 'white';
  ctx.fillRect(calX - calSize * 0.4, calY - calSize * 0.4, calSize * 0.8, calSize * 0.8);
  
  // Calendar header
  ctx.fillStyle = '#E53E3E'; // Red
  ctx.fillRect(calX - calSize * 0.4, calY - calSize * 0.4, calSize * 0.8, calSize * 0.2);
  
  // Calendar grid lines
  ctx.strokeStyle = '#CBD5E0'; // Light gray
  ctx.lineWidth = 1;
  
  // Horizontal lines
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(calX - calSize * 0.4, calY - calSize * 0.4 + calSize * 0.2 + (calSize * 0.6 / 3) * i);
    ctx.lineTo(calX + calSize * 0.4, calY - calSize * 0.4 + calSize * 0.2 + (calSize * 0.6 / 3) * i);
    ctx.stroke();
  }
  
  // Vertical lines
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(calX - calSize * 0.4 + (calSize * 0.8 / 3) * i, calY - calSize * 0.4 + calSize * 0.2);
    ctx.lineTo(calX - calSize * 0.4 + (calSize * 0.8 / 3) * i, calY + calSize * 0.4);
    ctx.stroke();
  }
  
  // Clock icon
  const clockX = 400;
  const clockY = 100;
  const clockSize = 70;
  
  // Clock body
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(clockX, clockY, clockSize * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Clock border
  ctx.strokeStyle = '#4A5568'; // Dark gray
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(clockX, clockY, clockSize * 0.4, 0, Math.PI * 2);
  ctx.stroke();
  
  // Clock hands
  ctx.strokeStyle = '#2D3748'; // Dark gray
  ctx.lineWidth = 3;
  
  // Hour hand
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX - clockSize * 0.15, clockY - clockSize * 0.2);
  ctx.stroke();
  
  // Minute hand
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + clockSize * 0.25, clockY - clockSize * 0.05);
  ctx.stroke();
  
  // Clock center
  ctx.fillStyle = '#2D3748';
  ctx.beginPath();
  ctx.arc(clockX, clockY, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Package box
  const boxX = 350;
  const boxY = 300;
  const boxSize = 70;
  
  // Box body
  ctx.fillStyle = '#F6AD55'; // Orange
  ctx.fillRect(boxX - boxSize * 0.4, boxY - boxSize * 0.3, boxSize * 0.8, boxSize * 0.6);
  
  // Box flaps
  ctx.fillStyle = '#ED8936'; // Darker orange
  ctx.beginPath();
  ctx.moveTo(boxX - boxSize * 0.4, boxY - boxSize * 0.3);
  ctx.lineTo(boxX, boxY - boxSize * 0.5);
  ctx.lineTo(boxX + boxSize * 0.4, boxY - boxSize * 0.3);
  ctx.closePath();
  ctx.fill();
  
  // Box tape
  ctx.fillStyle = '#A0AEC0'; // Gray
  ctx.fillRect(boxX - boxSize * 0.05, boxY - boxSize * 0.5, boxSize * 0.1, boxSize * 0.8);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'hero-service.png'), buffer);
};

// Create all required images
async function createAllImages(): Promise<void> {
  await createLogoMini();
  await createHeroImage('hero-products.png', '#3366ff', 5);
  await createHeroImage('hero-lix.png', '#ff3333', 3);
  await createHeroImage('hero-family.png', '#33cc33', 4);
  await createServiceImage();
  
  console.log('Banner images created successfully!');
}

createAllImages().catch(console.error); 