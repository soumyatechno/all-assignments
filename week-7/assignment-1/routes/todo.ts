import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import todo from '../module';
const router = express.Router();

router.post('/todos', authenticateJwt, (req, res) => {
  const { title, description } = req.body;
  const userId = req.headers["userId"]
  const done = false;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo:todo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err:Error) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"]
  
  Todo.find({ userId })
    .then((todos:todo) => {
      res.json(todos);
    })
    .catch((err:Error) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"]

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo:todo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err:Error) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});
export default router;