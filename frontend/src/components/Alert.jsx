import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { hideAlert } from '../store/alertSlice'

const MotionDiv = motion(forwardRef((props, ref) => <div ref={ref} {...props} />))

function Alert() {
  const alerts = useSelector(state => state.alert.alerts)
  const dispatch = useDispatch()

  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  }

  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="space-y-4">
        <AnimatePresence>
          {alerts.map((alert) => (
            <MotionDiv
              key={alert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className={`py-4 px-5 rounded-lg shadow-lg flex items-center justify-between min-w-[320px] ${
                alertStyles[alert.type] || alertStyles.success
              }`}
            >
              <span className="flex-1 mr-3 text-[15px]">{alert.message}</span>
              <button
                onClick={() => dispatch(hideAlert(alert.id))}
                className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-black/5 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Alert 