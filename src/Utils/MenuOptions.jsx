/* eslint-disable react/prop-types */
import * as XLSX from 'xlsx'

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

export const DownloadArrayAsExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Save-Directly-Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  
  link.download = `${fileName}.xlsx`;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};
