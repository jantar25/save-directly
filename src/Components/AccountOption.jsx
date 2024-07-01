/* eslint-disable react/prop-types */

const AccountOption = ({ id, title, description, account, onChange }) => (
    <div className="flex items-start gap-2">
      <input 
        type="radio" 
        name="account" 
        id={id} 
        checked={account === id} 
        className="w-[20px] md:w-[30px] h-[30px] accent-main-dark" 
        onChange={onChange} 
      />
      <label htmlFor={id} className="flex-1 flex flex-col text-main text-xl font-semibold">
        <h2 className="text-main text-lg md:text-xl 2xl:text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-400 w-full md:w-2/3 xl:w-3/4">{description}</p>
      </label>
    </div>
  );
export default AccountOption