import { useState, useEffect } from "react";
import { Button, Select, MenuItem, FormControl } from "@mui/material";

function StaffTable() {
    const [tableItems, setTableItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/admin")
        .then(res => res.json())
        .then(data => setTableItems(data))
    }, [])

    const handleAvailabilityChange = (id, newAvailability) => {
        const updatedItems = tableItems.map(item => 
            item.id === id ? { ...item, availability: newAvailability } : item
        );
        setTableItems(updatedItems);

        fetch(`http://localhost:5000/admin/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ availability: newAvailability })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
      <div className="flex flex-col items-center h-screen overflow-y-auto"
      >
        <h1 className="text-4xl overflow-hidden m-3 font-bold">TEAM</h1>
        <h3 className=" m-3 ">Managing the team</h3>
        <table className="min-w-full border m-3 border-orange-500">
          <thead>
            <tr className="bg-orange-950 border-orange-950 ">
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Id</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Name</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Email</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Contact no.</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Address</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200 border-r">Availability</th>
              <th className="text-xl font-medium py-2 border-orange-500 px-4 text-slate-200">Position</th>
            </tr>
          </thead>
          <tbody>
            {tableItems.map((tableItem) => (
              <tr key={tableItem.id} className="hover:bg-cyan-400 border-t border-orange-700">
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">{tableItem.id}</td>
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">{`${tableItem.first_name} ${tableItem.last_name}`}</td>
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">{tableItem.email}</td>
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">{tableItem.phone_number}</td>
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">{tableItem.address}</td>
                <td className="text-xl font-medium py-2 border-orange-500 px-4 border-r">
                  <FormControl fullWidth>
                    <Select
                      value={tableItem.availability}
                      onChange={(e) => handleAvailabilityChange(tableItem.id, e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{ color: 'orange', '& .MuiSvgIcon-root': { color: 'orange' } }} 
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Not Available">Not Available</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <Button className="text-xl font-medium py-2 bg-emerald-800 text-slate-300 w-full">{tableItem.position}</Button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default StaffTable;
