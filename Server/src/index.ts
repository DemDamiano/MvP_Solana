/* import express from 'express';
  import router from './router';

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.use("/api", router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
*/
import express from 'express';
import path from 'path';
import router from './router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

// Serve the static files from the React app (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
