import React, { useEffect, useState } from "react";
import ColumnsTable from "./components/ColumnsTable";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/admin/runding")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.data);
        console.log(data.data);
      });
  }, [reloadAPI]);

  const columnsDataColumns = React.useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "TOPIC",
        accessor: "topic",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  const tableDataColumns = React.useMemo(() => rooms, [rooms]);

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
