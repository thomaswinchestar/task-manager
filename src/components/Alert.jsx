import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAlert } from '../context/TodoContext'

function Alert() {
  const { alerts, hideAlert } = useAlert()

  const alertStyles = {
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800'
  }

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`p-4 rounded-lg shadow-lg flex items-center gap-2 ${alertStyles[alert.type]}`}
          >
            <span>{alert.message}</span>
            <button
              onClick={() => hideAlert(alert.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Alert 