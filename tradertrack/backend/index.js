const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tradeRoutes = require('./routes/tradeRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/daily', tradeRoutes);

// Serve the dashboard from the public directory
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use(cors({
  origin: 'http://', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
