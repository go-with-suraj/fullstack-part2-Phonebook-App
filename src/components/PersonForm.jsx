import React from 'react'

export const PersonForm = ({addName}) => {
  return (
    <>
       <form onSubmit={addName}>
    <div>
      Name: <input 
       type='text'
       name='name'
       placeholder='Enter a unique name' 
      />
    </div>
    <div>
      Number: <input 
       type='number'
       name='number'
      //  defaultValue={1234567890}
       placeholder='Enter a 10 digit Number' 
      />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
    
   </form>
    </>
  )
}
