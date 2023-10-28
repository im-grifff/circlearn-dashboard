import Card from "components/card";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { HiChevronLeft } from "react-icons/hi";

const ColumnsTable = (props) => {
  const { columnsData, tableData, setReloadAPI, reloadAPI, roomId } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  console.log(page);

  const deleteUser = (userId) => {
    console.log(userId);
    fetch(
      `https://circlearn-back-end.up.railway.app/admin/runding/${roomId}/${userId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setReloadAPI(!reloadAPI);
      });
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="flex items-center justify-center text-xl font-bold text-navy-700 dark:text-white">
          <Link
            to="/admin/manage-room"
            className="text-sm font-semibold text-navy-500 hover:text-navy-700"
          >
            <HiChevronLeft className="mr-1 inline-block h-6 w-6" />
          </Link>
          Member List
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === "NAME") {
                      data = (
                        <div className="text-sm font-semibold">
                          {cell.row.original.username}
                        </div>
                      );
                    }
                    if (cell.column.Header === "EMAIL") {
                      data = (
                        <div className="text-sm font-semibold">
                          {cell.row.original.email}
                        </div>
                      );
                    }
                    if (cell.column.Header === "ACTION") {
                      data = (
                        <button
                          className="text-sm font-semibold text-red-500 hover:text-red-700"
                          onClick={() => deleteUser(cell.row.original._id)}
                        >
                          Remove User
                        </button>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[20px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
