import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const ColumnsTable = (props) => {
  const { columnsData, tableData, setReloadAPI, reloadAPI } = props;

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

  const deleteUser = (roomId) => {
    console.log(roomId);
    fetch(`${process.env.REACT_APP_API_URL}/topics/request/${roomId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setReloadAPI(!reloadAPI);
      });
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Users List
        </div>
        <div>
          <button
            className="rounded-md bg-navy-700 px-4 py-2 text-white hover:bg-navy-800"
            onClick={() => (window.location.href = "/admin/manage-room/create")}
          >
            Create Room
          </button>
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
                    if (cell.column.Header === "TOPIC ID") {
                      data = (
                        <div className="text-sm font-semibold">
                          {cell.row.original.topicId}
                        </div>
                      );
                    }
                    if (cell.column.Header === "TOPIC NAME") {
                      data = (
                        <div className="text-sm font-semibold">
                          {cell.row.original.topicName}
                        </div>
                      );
                    }
                    if (cell.column.Header === "ACTION") {
                      data = (
                        <button
                          className="text-sm font-semibold text-red-500 hover:text-red-700"
                          onClick={() => deleteUser(cell.row.original._id)}
                        >
                          Delete
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
