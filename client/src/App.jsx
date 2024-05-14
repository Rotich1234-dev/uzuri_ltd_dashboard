import { UpdateTheme,UseTheme } from "./Theme";
import SideBar from "./components/SideBar";
import TopNav from "./components/TopNav";
import { Routes, Route } from "react-router-dom"
import Authentication from './components/Authentication';
import Staff from "./components/Staff";
import Invoice from "./components/Invoice";
import Dashboard from "./components/Dashboard";
import MyCalendar from "./components/Calendar";
import FeeCalculator from "./components/FeeCalculator"
import ServiceForm from "./components/ServiceForm";
import Reports from "./components/Reports";
import OurChart from "./components/OurChart";
function App () {
  const darkTheme=UseTheme() 
  const toggleColor=UpdateTheme() 
  //create the themes
  const ThemeStyles={
    backgroundColor:darkTheme?"rgb(46, 45, 45)":"rgb(171, 163, 159)",
    color:darkTheme?"rgb(240,240,240)":"rgb(26 46 5)",
  }
  
  return (

    <div className="app overflow-hidden" style={ThemeStyles}>
      <SideBar/>
    <main className="content">
      <TopNav toggleColor={toggleColor} darkTheme={darkTheme}/> 
      {/* Routes */}
      <Routes>
        <Route path="/Staff" element={<Staff/>}/>
        <Route path="/Profile" element={<Authentication ThemeStyles={ThemeStyles} />}/>
        <Route path="/" element={<Dashboard ThemeStyles={ThemeStyles}/>}/>
        <Route path="/Calendar" element={<MyCalendar/>}/>
        <Route path="/FeeCalculator" element={<FeeCalculator ThemeStyles={ThemeStyles}/>}/>
        <Route path="/ServiceForm" element={<ServiceForm />}/>
        <Route path="/Invoice" element={<Invoice ThemeStyles={ThemeStyles} />}/>
        <Route path="/Reports" element={<Reports />}/>
        <Route path="/OurChart" element={<OurChart ThemeStyles={ThemeStyles}/>}/>
      </Routes> 
      </main>
     
     </div>

  
  )
}

export default App;