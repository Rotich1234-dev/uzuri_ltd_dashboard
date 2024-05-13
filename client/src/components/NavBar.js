// import React, { useState } from 'react'
// // import Logo from '../assets/uzurilogo.png';
// import { LayoutDashboard, Clock3, BarChart2, ArrowRightLeft, HelpCircleIcon } from 'lucide-react';
// import  RightArrow from '../assets/arrow-right.png';
// import { motion }from 'framer-motion';

// const navLinks = [
//     {
//         name: 'Home',
//         icon: LayoutDashboard,
//     },
//     {
//         name: 'Dashboard',
//         icon: LayoutDashboard,
//     },
//     {
//         name: 'Services',
//         icon: Clock3,
//     },
//     {
//         name: 'Activity',
//         icon: Clock3,
//     },
//     {
//         name: 'Analytics',
//         icon: BarChart2,
//     },
//     {
//         name: 'Transactions',
//         icon: ArrowRightLeft,
//     },
//     {
//         name: 'Help-Desk',
//         icon: HelpCircleIcon,
//     },
// ];

// const variants = {
//     expanded: { width: "20%"},
//     nonExpanded: { width: "5%"},
// }  

// const NavBar = () => {
//     const [activeNabIndex, setActiveNabIndex] = useState(0)
//     const [isExpanded, setIsExpanded] = useState(true)
   
//     return (
//     <motion.div 
//      animate = {isExpanded ? "expanded" : "nonExpanded"}
//      variants={variants}
//     className={"py-12 flex flex-col border border-r-1 w=1/5 h-screen relative" 
//     }   
//     >
//        <div className="logo-div flex space-x-3 items-center">
//         {/* <img src = {Logo} /> */}
//         <span className={isExpanded ? "block" : "hidden"}>Uzuri Limited</span>
//     </div>

//     <div onClick = {() => setIsExpanded(!isExpanded)} 
//     className='w-5 h-5 bg-[orange] rounded-full absolute -right-[10.5] top-15 flex items-center justify-center'>
//     <img src = {RightArrow} alt='Arrow' className='w-[5]' />
//     </div>

//     <div className='mt-9 flex flex-col space-y-8'>
//         {navLinks.map((item, index) => 
//           <div key={index} 
//           className={
//             'flex space-x-1 p-2 rounded' + 
//             (activeNabIndex === index 
//               ? " bg-[orange] text-white font-semibold" 
//               : "" )
//             } 
//             onClick={() => setActiveNabIndex(index)}
//         >
//             <item.icon />
//             <span className={isExpanded ? "block" : "hidden"}>{item?.name}</span>
//         </div>
//         )}

//     </div>
//     </motion.div>
//   )
// }

// export default NavBar