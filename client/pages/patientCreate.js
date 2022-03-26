import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function PatientCreate() {
  const [t, setT] = useState("");
  const [d, setD] = useState("");

  async function onClick() {
    let data = await localStorage.getItem("proj-data");
    data = JSON.parse(data);

    const resp = await fetch("http://localhost:9000/register", {
      method: "POST",
      body: JSON.stringify({ title: t, description: d, patient: data._id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card>
          <CardContent>
            <Typography marginTop={"10px"} component="h1" variant="h5">
              Submit Appointment request
            </Typography>
            <TextField
              value={t}
              onChange={(e) => setT(e.target.value)}
              label="title"
              style={{ marginTop: "20px" }}
              fullWidth
            />
            <TextField
              onChange={(e) => setD(e.target.value)}
              value={d}
              label="description"
              style={{ marginTop: "20px" }}
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClick}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
