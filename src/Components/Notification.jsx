/* eslint-disable react/prop-types */

const Notification = ({ success,failure,color }) => {
  return (
    <p
      data-testid= 'error-message'
      style={{ backgroundColor:`${ color }` }}
      className={`fixed right-0 top-32 w-[95%] z-50 md:w-1/2 lg:w-1/3 rounded-l-xl text-center text-white p-4 transform font-bold my-4 p-4 
      ${success || failure  ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}>{success || failure}
    </p>
  )}

export default Notification