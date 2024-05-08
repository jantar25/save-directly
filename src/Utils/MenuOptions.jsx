/* eslint-disable react/prop-types */
export const MenuOption = ({ item , handleClick}) => {
    return (
      <li onClick={handleClick} className="w-[300px] p-2 flex items-center space-x-2 md:space-x-4 cursor-pointer my-1">
        <img src={item.flag} alt={item.label} className="w-4 h-4 md:w-6 md:h-6 rounded-full" />
        <div className="flex items-center gap-2 text-xs md:text-lg">
          <p>{item.value}</p>
          <p>{item.label}</p>
        </div>
      </li>
    )
  }