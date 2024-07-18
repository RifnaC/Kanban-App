import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       'react-router-dom': 'react-router-dom'
//     }
//   },
//   build: {
//     rollupOptions: {
//       external: ['react-router-dom']
//     }
//   }
// });

