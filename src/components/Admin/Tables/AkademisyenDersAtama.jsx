import React, { useState } from "react";
import {
  Container,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AkademisyenDersAtama = () => {
  const [akademisyenler] = useState([
    { id: 1, name: "Dr. Ahmet Yılmaz" },
    { id: 2, name: "Prof. Ayşe Demir" },
    { id: 3, name: "Doç. Mehmet Kaya" },
  ]);

  const [dersler] = useState([
    { id: 101, name: "Matematik" },
    { id: 102, name: "Fizik" },
    { id: 103, name: "Kimya" },
    { id: 104, name: "Bilgisayar Programlama" },
  ]);

  const [selectedAkademisyen, setSelectedAkademisyen] = useState(null);
  const [selectedDersler, setSelectedDersler] = useState([]);
  const [atamalar, setAtamalar] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAtamaYap = () => {
    if (selectedAkademisyen && selectedDersler.length > 0) {
      const yeniAtamalar = selectedDersler.map((ders) => ({
        akademisyenId: selectedAkademisyen.id,
        akademisyenName: selectedAkademisyen.name,
        dersId: ders.id,
        dersName: ders.name,
      }));

      // Aynı ID kombinasyonunun olup olmadığını kontrol et
      const mevcutAtamalar = atamalar.map(
        (atama) => `${atama.akademisyenId}-${atama.dersId}`
      );

      const zatenVarOlanlar = yeniAtamalar.filter((yeniAtama) =>
        mevcutAtamalar.includes(
          `${yeniAtama.akademisyenId}-${yeniAtama.dersId}`
        )
      );

      if (zatenVarOlanlar.length > 0) {
        setErrorMessage(
          `Bu atama zaten yapılmış: ${zatenVarOlanlar
            .map((atama) => atama.dersName)
            .join(", ")}`
        );
        return;
      }

      // Yeni atamaları ekle
      setAtamalar((prev) => [...prev, ...yeniAtamalar]);
      setSelectedAkademisyen(null);
      setSelectedDersler([]);
    }
  };

  const handleAtamaKaldir = (index) => {
    setAtamalar((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSnackbarClose = () => {
    setErrorMessage("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Akademisyen Ders Atama
      </Typography>

      {/* Akademisyen Seçimi */}
      <Autocomplete
        options={akademisyenler}
        getOptionLabel={(option) => option.name}
        value={selectedAkademisyen}
        onChange={(e, newValue) => setSelectedAkademisyen(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Akademisyen Seç" variant="outlined" />
        )}
        sx={{ marginBottom: 2 }}
      />

      {/* Ders Seçimi */}
      <Select
        multiple
        value={selectedDersler}
        onChange={(e) => setSelectedDersler(e.target.value)}
        displayEmpty
        renderValue={(selected) =>
          selected.length === 0
            ? "Ders Seç"
            : selected.map((ders) => ders.name).join(", ")
        }
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        {dersler.map((ders) => (
          <MenuItem key={ders.id} value={ders}>
            {ders.name}
          </MenuItem>
        ))}
      </Select>

      {/* Atama Yap Butonu */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAtamaYap}
        sx={{ marginBottom: 4 }}
      >
        Atama Yap
      </Button>

      {/* Atamalar Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Akademisyen</TableCell>
              <TableCell>Ders</TableCell>
              <TableCell>Aksiyon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atamalar.map((atama, index) => (
              <TableRow key={index}>
                <TableCell>{atama.akademisyenName}</TableCell>
                <TableCell>{atama.dersName}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleAtamaKaldir(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hata Mesajı */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AkademisyenDersAtama;
