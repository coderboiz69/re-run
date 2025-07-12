import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, '../dist/public')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
