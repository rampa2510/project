import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Patient() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      let userData = await localStorage.getItem("proj-data");
      userData = JSON.parse(userData);
      console.log(userData);
      const resp = await fetch("http://localhost:9000/status/" + userData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setRows(resp.msg);
    })();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Appointment Time</TableCell>
            <TableCell align="right">Doctor name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                {row.time
                  ? `${new Date(row.time).getDate()}-${
                      new Date(row.time).getMonth() + 1
                    }-${new Date(row.time).getFullYear()}`
                  : "-" || "-"}
              </TableCell>
              <TableCell align="right">
                {row.doctor ? row.doctor.name : "-" || "-"}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
