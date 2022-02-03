import { useState } from 'react'
export function Input () { 
  const [value, setValue] = useState(0)
  const handleAddValue = () => setValue(prev => prev+1)
  const handleDecrease = () => setValue(prev => prev-1 < 0 ? 0: prev-1)
  const onChange = (e) => {
    if (e.target.value < 0) {
      setValue(0)
      return
    }
    setValue(e.target.value)
  }
  return (
    <div className='flex w-48 justify-around'>
      <button onClick={handleDecrease} className='w-12 h-12 bg-gray-400 rounded-full font-bold'>-</button>
      <input type="number" onChange={onChange} className="w-20 h-12 rounded-full p-4 text-center font-bold bg-gray-400"  value={value}/>
      <button onClick={handleAddValue} className=' w-12 h-12 bg-gray-400 rounded-full font-bold'>+</button>
    </div>
  )
}