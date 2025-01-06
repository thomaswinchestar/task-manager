import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Task Schema
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 