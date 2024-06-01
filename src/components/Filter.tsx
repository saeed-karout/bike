
import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (title: string, from: string, to: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const handleFilter = () => {
    onFilterChange(title, dateRange.from, dateRange.to);
  };

  return (
    <div className='input_filter'>

      <label htmlFor='search'>
        Search by title :
      </label>
      <input
      id='search'
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />



      <label htmlFor='from'>Filter By Date :</label>

      <div className="d-flex" style={{flexWrap:'wrap' , gap:"3px",justifyContent:'space-around' }}>

         <div style={{display:'flex',justifyContent:'space-around'}}>

           <label htmlFor="from">From </label>
           <input
             id='from'
             type="date"
             value={dateRange.from}
             onChange={(e) => setDateRange({ 
              ...dateRange, from: e.target.value })}
           />

         </div>

         <div style={{marginLeft:'5px' ,        marginRight:'5px'}}>

           <label htmlFor="to">To</label>
           <input
             id='to'
             type="date"
             value={dateRange.to}
             onChange={(e) => setDateRange({
               ...dateRange, to: e.target.value 
              })}
           />
           
         </div>

      </div>
      <button className='btn-apply' onClick={handleFilter} style={{width:'100px' , cursor:'pointer' , padding:'5px',borderRadius:'5px'}}>Apply Filters</button>
    </div>
  );
};

export default Filter;
