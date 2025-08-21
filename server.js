const express = require('express');
const path = require('path'); // Node's built-in path module
const app = express();
const port = 3000;

// Serve static files from the current directory (where index.html is located)
app.use(express.static('.'));

// Route for the root URL to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});