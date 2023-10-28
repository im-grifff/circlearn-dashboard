import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnsTable from "./components/ColumnsTable";

export default function RoomMembers() {
  const [users, setUsers] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch("https://circlearn-back-end.up.railway.app/admin/runding/" + id)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        console.log(data.data);
      });
  }, [id, reloadAPI]);

  const columnsDataColumns = React.useMemo(
    () => [
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
        roomId={id}
      />
    </div>
  );
}
