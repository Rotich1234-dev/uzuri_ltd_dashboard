import React from 'react'
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <main className='w-full bg-slate-200 h-screen flex justify-between items-centers'>
        <Sidebar />
        <Main />

      </main>
    </div>
  )
}

export default App




















