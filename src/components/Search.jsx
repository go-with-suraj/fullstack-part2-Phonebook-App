import React from 'react'

export const Search = ({searchQuery, setSearchQuery}) => {
  return (
    <div className='search-bar'>
      <label htmlFor="search"></label>
    <input
    id='search'  
       type="text"
       placeholder='search by name'
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
   </div>
  )
}
