// import React from 'react';
// import { ThemeProvider } from './components/ThemeContext'; // Adjust the import path accordingly
// import Sidebar from './components/Sidebar';
// import LoginForm from './components/Authentification';
// import Main from './components/Main'

// const App = () => {
//   return (
//     <ThemeProvider>
//       <div>
//         <main className='w-full bg-slate-200 h-screen flex justify-between items-centers'>
//           <Sidebar />
//           <LoginForm />
//           <Main />
//         </main>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

import React from 'react'
import Sidebar from './components/Sidebar';
// import Main from './components/Main';
import Header from './components/Header';
import LoginForm from './components/Authentification';

const App = () => {
  return (
    <div>
      <main className='w-full bg-slate-200 h-screen flex justify-between items-centers'>
        <Sidebar />
        {/* <Main /> */}
        <Header />
        <LoginForm />

      </main>
    </div>
  )
}
export default App;
