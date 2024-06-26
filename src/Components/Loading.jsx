import React from 'react'

const Loading = ({ color }) => {
  return (
    <div data-testid='loading' className={`m-auto animate-spin rounded-full h-[20px] w-[20px] border-t-4 border-b-4 border-${color? color :'main'}`}></div>
  )
}

export default Loading