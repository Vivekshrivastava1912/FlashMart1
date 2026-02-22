import React from 'react'

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    // Background Overlay with Blur
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">

        {/* Top Red Accent Line */}
        <div className="h-2 w-full bg-purple-500"></div>

        <div className="p-6 text-center">
          
          {/* Warning Icon (SVG) */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Category?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this category? This action is permanent and cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={cancel || close}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (confirm) confirm();
                if (close) close();
              }}
              className="flex-1 px-4 py-2.5 bg-purple-500 text-white font-semibold rounded-xl hover:bg-red-600 shadow-lg hover:shadow-red-500/30 transition-all duration-200 active:scale-95"
            >
              Yes, Delete
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox