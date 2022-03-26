import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Patient() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [t, setT] = useState("");
  const [d, setD] = useState("");
  const [value, setValue] = useState(new Date());
  const [i, setI] = useState();
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  async function onClick() {
    let data = await localStorage.getItem("proj-data");
    data = JSON.parse(data);
    const rowData = rows[i];

    const resp = await fetch("http://localhost:9000/accept", {
      method: "POST",
      body: JSON.stringify({ doctor: data._id, time: value, id: rowData._id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(resp);
  }
  useEffect(() => {
    (async () => {
      const resp = await fetch("http://localhost:9000/get/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setRows(resp.data);
    })();
  }, []);

  function viewDetails(i) {
    handleOpen();
    const data = rows[i];
    setI(i);
    setT(data.title);
    setD(data.description);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <Button onClick={() => viewDetails(i)}>View details </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Details
          </Typography>
          <Typography
            style={{ marginTop: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h4"
          >
            Title - {t}
          </Typography>
          <Typography
            style={{ marginTop: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h4"
          >
            Description - {d}
          </Typography>
          <Typography
            style={{ marginTop: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h4"
          >
            Select date -{" "}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date mobile"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClick}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
}
