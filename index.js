const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const dbo = require('./db.config');
const synonymsRouter = require('./routes/synonyms.route');

dbo.connectToDatabase();
app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

/* Routes */
app.use('/synonyms', synonymsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
  console.log(`Synonyms app listening on port ${port}`)
})