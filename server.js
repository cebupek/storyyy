const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  startPinging();
});

function startPinging() {
  const RENDER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  
  setInterval(async () => {
    try {
      await axios.get(RENDER_URL);
      console.log(`Ping успешен: ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.log(`Ping ошибка: ${error.message}`);
    }
  }, 10 * 60 * 1000); // каждые 10 минут
}
