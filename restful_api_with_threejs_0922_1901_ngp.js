// 代码生成时间: 2025-09-22 19:01:46
 * A simple RESTful API interface for handling 3D models in a THREE.js application.
 *
 * Features:
 * - GET endpoint to retrieve a list of 3D models.
 * - POST endpoint to add a new 3D model.
 * - PUT endpoint to update an existing 3D model.
 * - DELETE endpoint to remove a 3D model.
 *
 * Error Handling:
 * - Proper error responses for bad requests, not found, etc.
 */

const express = require('express');
const THREE = require('three');
const app = express();
const port = 3000;

// In-memory storage for 3D model data.
// In a real-world scenario, this would likely be a database.
const models = [];

// Middleware to parse JSON bodies.
app.use(express.json());

// GET /models - Retrieve a list of 3D models.
app.get('/models', (req, res) => {
  res.status(200).json(models);
});

// POST /models - Add a new 3D model.
app.post('/models', (req, res) => {
  const model = req.body;
  if (!model) {
    return res.status(400).json({ error: 'Bad request' });
  }
  models.push(model);
  res.status(201).json(model);
});

// PUT /models/:modelId - Update an existing 3D model.
app.put('/models/:modelId', (req, res) => {
  const { modelId } = req.params;
  const modelIndex = models.findIndex(m => m.id === modelId);
  if (modelIndex === -1) {
    return res.status(404).json({ error: 'Model not found' });
  }
  models[modelIndex] = { ...models[modelIndex], ...req.body };
  res.status(200).json(models[modelIndex]);
});

// DELETE /models/:modelId - Remove a 3D model.
app.delete('/models/:modelId', (req, res) => {
  const { modelId } = req.params;
  const modelIndex = models.findIndex(m => m.id === modelId);
  if (modelIndex === -1) {
    return res.status(404).json({ error: 'Model not found' });
  }
  models.splice(modelIndex, 1);
  res.status(200).json({ message: 'Model deleted' });
});

// Error handler for any other routes.
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start the server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});