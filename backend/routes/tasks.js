import express from 'express'
import Task from '../models/Task.js'

const router = express.Router()

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ order: 1, createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    next(error)
  }
})

// Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body
    
    // Find the highest order
    const lastTask = await Task.findOne().sort({ order: -1 })
    const order = lastTask ? lastTask.order + 1 : 0

    const task = await Task.create({ text, order })
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
})

// Update a task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    if (!task) {
      const error = new Error('Task not found')
      error.status = 404
      throw error
    }

    res.json(task)
  } catch (error) {
    next(error)
  }
})

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      const error = new Error('Task not found')
      error.status = 404
      throw error
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
})

// Reorder tasks
router.put('/reorder/:id', async (req, res, next) => {
  try {
    const { newOrder } = req.body
    const task = await Task.findById(req.params.id)

    if (!task) {
      const error = new Error('Task not found')
      error.status = 404
      throw error
    }

    // Update orders of affected tasks
    if (newOrder > task.order) {
      await Task.updateMany(
        { order: { $gt: task.order, $lte: newOrder } },
        { $inc: { order: -1 } }
      )
    } else {
      await Task.updateMany(
        { order: { $gte: newOrder, $lt: task.order } },
        { $inc: { order: 1 } }
      )
    }

    task.order = newOrder
    await task.save()

    const tasks = await Task.find().sort({ order: 1, createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    next(error)
  }
})

export default router 