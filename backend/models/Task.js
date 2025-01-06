import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true,
    minlength: [1, 'Task text must not be empty'],
    maxlength: [200, 'Task text cannot exceed 200 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Add index for text search
taskSchema.index({ text: 'text' })

// Add index for sorting by order
taskSchema.index({ order: 1 })

// Ensure task text is unique
taskSchema.index({ text: 1 }, { 
  unique: true,
  collation: { locale: 'en', strength: 2 } // Case-insensitive unique index
})

// Pre-save middleware to trim text
taskSchema.pre('save', function(next) {
  this.text = this.text.trim()
  next()
})

const Task = mongoose.model('Task', taskSchema)

export default Task 