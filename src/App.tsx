import { useState } from 'react'

function App() {
  const [grinds, setGrinds] = useState([])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-center">HeadHunter Tracker</h1>
        <p className="text-center text-slate-300">Call of the Wild Grind Tracker</p>
      </header>
      
      <main className="p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <h2 className="text-xl mb-4">Welcome Hunter!</h2>
            <p className="text-slate-300 mb-4">Track your hunting progress across all COTW maps</p>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">
              Start Your First Grind
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
