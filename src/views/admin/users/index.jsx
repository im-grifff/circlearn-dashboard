import React, { useEffect, useState } from "react";
import ColumnsTable from "./components/ColumnsTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        console.log(data.data);
      });
  }, [reloadAPI]);

  const columnsDataColumns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  const tableDataColumns = React.useMemo(() => users, [users]);

  return (
    <div>
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={tableDataColumns}
        setReloadAPI={setReloadAPI}
        reloadAPI={reloadAPI}
      />
    </div>
  );
}
