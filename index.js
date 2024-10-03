const express = require('express');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
app.use(express.json());

app.use('/api', mediaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
