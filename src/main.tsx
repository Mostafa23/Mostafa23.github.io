import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Function to generate a circular favicon dynamically
const setRoundedFavicon = async (username: string) => {
  try {
    // Fetch the direct avatar URL which has proper CORS headers
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (!data.avatar_url) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Draw circle mask
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Replace favicon link
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = canvas.toDataURL("image/png");
    };
    img.src = data.avatar_url;
  } catch (err) {
    console.error("Failed to generate rounded favicon", err);
  }
};

// Call the function with your GitHub username
setRoundedFavicon("Mostafa23");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
