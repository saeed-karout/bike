

import React, { useState, useEffect } from 'react';
import { fetchBikeThefts } from '../api';
import BikeListItem from './BikeListItem';
import Filter from './Filter';
import { Bike } from '../types';
import Loading from '../loading/loading';
import { IoMdClose } from "react-icons/io";

const BikeList: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ title: '', from: '', to: '' });
  const [filterVisible, setFilterVisible] = useState(false); // New state for filter visibility

   useEffect(() => {
    const loadBikes = async () => {
      setLoading(true);
      try {
        const data = await fetchBikeThefts(page);
        setBikes(data);
        setFilteredBikes(data);
      } catch (err) {
        setError('Failed to load bike thefts.');
      }
      setLoading(false);
    };
    loadBikes();
  }, [page]);
  useEffect(() => {
    const filterBikes = () => {
      let filtered = bikes;
      if (filters.title) {
        filtered = filtered.filter(bike =>
          bike.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      if (filters.from) {
        const fromDate = new Date(filters.from).getTime() / 1000;
        filtered = filtered.filter(bike => bike.date_stolen >= fromDate);
      }
      if (filters.to) {
        const toDate = new Date(filters.to).getTime() / 1000;
        filtered = filtered.filter(bike => bike.date_stolen <= toDate);
      }
      setFilteredBikes(filtered);
    };
    filterBikes();
  }, [filters, bikes]);

  const handleFilterChange = (title: string, from: string, to: string) => {
    setFilters({ title, from, to });
  };
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!filteredBikes.length) return <div>No bike thefts found.</div>;


  return (
    <div>
      <h2 className='sub-title'>Filters</h2>
      {!filterVisible && (
        <button className='btn btn-show-filter' onClick={() => setFilterVisible(true)}>
          Show Filter
        </button>
      )}

      {filterVisible && (
        <div>
          <label className='btn btn-hide-filter' onClick={() => setFilterVisible(false)}>
            <IoMdClose />
          </label>
          <Filter onFilterChange={handleFilterChange} />
        </div>
      )}

      <h2 className='sub-title'>Total Bike Theft Cases: {filteredBikes.length}</h2>
      <div className="table-wrapper">
        <table className="fl-table" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stolen on</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reported on</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredBikes.map((bike: Bike) => (
              <BikeListItem key={bike.id} bike={bike} />
            ))}
          </tbody>
        </table>
      </div>

      <div className='d-flex ' style={{ justifyContent: 'space-around', alignItems: "center", margin: '20px 0' }}>

        <button className='btn btn-Previous'
          onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous 10
        </button>

        <button className='btn btn-next' onClick={() => setPage(page + 1)}>
          Next  10
        </button>

      </div>
    </div>
  );
};

export default BikeList;
