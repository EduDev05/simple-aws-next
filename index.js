const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 2535;
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'src')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.tsx'));
});

app.listen(port, () => {
	console.log(`Express listening on port ${port}`);
});