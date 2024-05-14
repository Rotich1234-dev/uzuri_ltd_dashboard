import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
// import Header from './components/Header';
import { Element } from 'react-scroll';  // Import Element to wrap section components

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <main className='w-full bg-slate-200 flex'>
        <Sidebar />
        <div className="flex-grow">
          {/* Ensure that your Main component or individual sections have Element wrappers with the correct IDs */}
          <Element name="dashboard">
            {/* Content of Dashboard */}
            <Main />
          </Element>
          <Element name="client-list">
            {/* Content of Client List */}
          </Element>
          <Element name="service-form">
            {/* Content of Service Form */}
          </Element>
          <Element name="fee-calculator">
            {/* Content of Fee Calculator */}
          </Element>
          <Element name="report-generator">
            {/* Content of Report Generator */}
          </Element>
          <Element name="invoice-generator">
            {/* Content of Invoice Generator */}
          </Element>
          <Element name="email">
            {/* Content of Email */}
          </Element>
          <Element name="help-desk">
            {/* Content of Help Desk */}
          </Element>
          <Element name="calendar">
            {/* Content of Calendar */}
          </Element>
          <Element name="authentication">
            {/* Content of Authentication */}
          </Element>
        </div>
      </main>
    </div>
  )
}

export default App;


