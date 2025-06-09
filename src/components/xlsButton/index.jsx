import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import * as XLSX from "xlsx";

function createExcelFromJSON(jsonData, fileName = "my_excel_file.xlsx") {
  // 1. Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // 2. Create a workbook
  const workbook = XLSX.utils.book_new();

  // 3. Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 4. Generate and download the excel file
  XLSX.writeFile(workbook, fileName);
}

// Example usage:
// const myJsonData = [
//   { name: "John Doe", age: 30, city: "New York" },
//   { name: "Jane Smith", age: 25, city: "London" },
// ];

const XlsButtonBtn = ({ data, filename = "tabla", className }) => {
  return (
    <button
      className={clsx(
        "bg-primary text-white hover:bg-sky-700 text-sm px-5 py-2 rounded-md flex items-center gap-1",
        className
      )}
      onClick={() => {
        if (data) createExcelFromJSON(data, `${filename}.xlsx`);
      }}
    >
      <Icon type="xls" />
      <I18N id="xlsx.btn" />
    </button>
  );
};

export default XlsButtonBtn;
