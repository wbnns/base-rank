const express = require('express');
const app = express();

// Middleware and routes setup

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
