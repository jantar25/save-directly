/* eslint-disable react/prop-types */
export const MenuOption = ({ item , handleClick, number }) => {
    return (
      <li onClick={handleClick} className="w-[300px] p-2 flex items-center space-x-2 cursor-pointer my-1 rounded-lg hover:bg-gray-100">
        <p className="w-4 h-4 md:w-6 md:h-6 rounded-full">{item.flag}</p>
        <div className="flex items-center gap-2 text-sm">
          <p className="font-bold">({ number ? item.dial_code : item.code })</p>
          <p>{item.name}</p>
        </div>
      </li>
    )
  }