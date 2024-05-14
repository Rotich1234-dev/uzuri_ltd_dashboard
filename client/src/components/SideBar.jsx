import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react"
import { Box, IconButton} from "@mui/material";
import {Link} from "react-router-dom"
import CottageIcon from '@mui/icons-material/Cottage';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TicketChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ContactPage from "@mui/icons-material/ContactPage";
import CalculateIcon from '@mui/icons-material/Calculate';
import SummarizeIcon from '@mui/icons-material/Summarize';

const Item=({title,to,icon})=>{ //create a function for holding the sidevar details
    return(
    <Link to={to}>  
    <MenuItem
    style={{color:"rgb(200,200,200)"}}
    icon={icon}
    >
      <h4 className="bg-gray-500 text-sm" color="rgb(255,240,200)">{title}</h4> 
      
    </MenuItem>
    </Link>
     )
   }


function SideBar({ThemeStyles}) {
    
    const [isCollapsed, setCollapsed]=useState(false)
  return (
    <div className="flex-col w-fit h-screen border-x-4 border-neutral-700 bg-gray-500 border-solid ">
    <Box className="flex-col" style={ThemeStyles}>
   
<Sidebar collapsed={isCollapsed} style={ThemeStyles}>
<Menu  className="bg-gray-500">
<Box>
<MenuItem
        className="text-slate-700 justify-between"
        onClick={()=>setCollapsed(!isCollapsed)}   
        icon={isCollapsed?<MenuIcon/>:undefined } 
       style={{margin:"10px 0", cursor:"pointer"}}>

        {!isCollapsed&&( 
             <Box className='flex justify-between p-3'>
         <h1 className="text-2xl font-bold">UZURI LIMITED</h1>
            <IconButton className="text-slate-200" onClick={()=>setCollapsed(!isCollapsed)}>
                <MenuIcon/>
            </IconButton>
            </Box>
        )}
       
           
        </MenuItem>

    </Box>
    {!isCollapsed &&(
        <Box>
 <Box className="mt-3">
   <h1 className="text-2xl text-center text-white font-bold">Naomi Mogi</h1>
   <h5 className="text-xl font-bold text-center text-blue-900">Admin</h5>
</Box>  
 </Box>
      
    )}
  
</Menu>
<Menu className="bg-gray-500">
<Box paddingLeft={!isCollapsed? undefined: "10%"}>
    
        <Item
        icon={<CottageIcon/>}
        title="Dashboard"
        onClick={()=>setSelected(!isSelected)}
         to="/"
      />
    
     <h1 className="text-black">Users</h1>
      <Box>
      <Item
        icon={<GroupIcon/>}
        title="Staff"
        to="/admin"
      />
</Box>
<Box> 
<Item
        icon={<ContactPage/>}
        title="Clients"
        to="/clients"
      />
      </Box>    
      
      <h1 className="text-black">Items</h1>
      <Box>
        <Item
        icon={<AccountBoxIcon/>}
        title="Services"
        to="/ServiceForm"
      />
     </Box>
     <Box>
        <Item
        icon={<CalculateIcon/>}
        title="FeeCalculator"
        to="/FeeCalculator"
      />
     </Box>
     <Box>
        <Item
        icon={<SummarizeIcon/>}
        title="Reports"
        to="/Reports"
      />
     </Box>
     <Box>
        <Item
        icon={<ReceiptIcon/>}
        title="Invoice"
        to="/Invoice"
      />
     </Box>
     <Box>
        <Item
        icon={<CalendarMonthOutlinedIcon/>}
        title="Calendar"
        to="/Calendar"
      />
     </Box>
     <h1 className="text-black">Charts</h1>
     <Box>
        <Item
        icon={<TicketChartOutlinedIcon/>}
        title="OurCharts"
        to="/OurCharts"
      />
     </Box>
</Box>
</Menu>
</Sidebar>
    </Box>

    </div>
  )
}

export default SideBar