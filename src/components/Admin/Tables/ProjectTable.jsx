import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  DialogTitle,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

function CrudTable() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    lessonCode: "",
    academicYear: "",
    akts: 0,
  });
  const [page, setPage] = useState(0); // Aktif sayfa
  const [pageSize, setPageSize] = useState(10); // Sayfa başına satır sayısı
  const [formattedAcademicYears, setFormattedAcademicYears] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null); // Silinecek öğe
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Onay dialog
  const [successMessage, setSuccessMessage] = useState(""); // Başarı mesajı için

  // Snackbar kontrolü
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  }); // Snackbar state
  // Veri Çekme
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const fetchData = async () => {
    debugger;
    try {
      const response = await axios.get(
        `http://localhost:5226/api/Lesson/GetLessons?index=${page}&size=${pageSize}`
      );
      const response2 = await axios.get(
        `http://localhost:5226/api/Lesson/AcademicYearList`
      );
      var obj = response2.data.data;
      const array = Object.entries(obj).map(([key, value]) => [
        Number(key),
        value,
      ]);

      setFormattedAcademicYears(array);
      setData(response.data.data.items);
      setPageSize(response.data.data.count);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  function convertAcademicYears(academicYears) {
    const formattedYears = academicYears.map((item) => {
      // Dizinin yalnızca ikinci elemanına işlemi uygula
      if (Array.isArray(item) && item[1]) {
        const term = item[1].charAt(0) === "a" ? "Güz Dönemi" : "Bahar Dönemi";
        const year = item[1].slice(2, 6) + "-" + item[1].slice(6);
        return [item[0], `${year} ${term}`]; // İlk eleman aynı kalır, 2. elemana dönüştürme uygulanır
      }
      return item; // 2. eleman yoksa veya geçerli değilse, aynen döndür
    });
    return formattedYears;
  }

  // Yeni veya Güncelleme İşlemi
  const handleSave = async () => {
    try {
      if (newItem != null && newItem.id > 0) {
        // Güncelleme işlemi
        await axios.post(
          `http://localhost:5226/api/Lesson/UpdateLesson`,
          newItem
        );
        await fetchData(); // Veriyi yeniden yükle

        setSuccessMessage("Ders başarıyla güncellendi!");
      } else {
        // Ekleme işlemi
        const response = await axios.post(
          "http://localhost:5226/api/Lesson/AddLesson",
          newItem
        );
        if (response.data.success === true) {
          showSnackbar("Ekleme işlemi başarılı!", "success");
        }
        await fetchData(); // Veriyi yeniden yükle
      }
      handleClose(); // Dialog penceresini kapat
    } catch (error) {
      console.error("Kaydetme hatası:", error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };
  const handleClickOpen = (model = null) => {
    if (model) {
      // Güncelleme işlemi için seçili satır verilerini ayarla
      setNewItem({
        id: model.id || 0,
        name: model.name || "",
        lessonCode: model.lessonCode || "",
        academicYear: model.academicYear || "",
        akts: model.akts || 0,
      });
    } else {
      // Yeni ekleme için boş bir obje oluştur
      setNewItem({
        id: 0,
        name: "",
        lessonCode: "",
        academicYear: "",
        akts: 0,
      });
    }
    setOpen(true); // Dialog'u aç
  };
  const handleDeleteRequest = (model) => {
    setDeleteItem(model); // Silinecek öğeyi kaydet
    setConfirmDeleteOpen(true); // Dialog'u aç
  };
  // Eleman Silme
  const handleDelete = async (model) => {
    try {
      debugger;
      var response = await axios.post(
        `http://localhost:5226/api/Lesson/DeleteLesson`,
        model
      );
      await fetchData();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  // DataGrid Sütunları
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "İsim", width: 200, flex: 1 },
    {
      field: "academicYear",
      headerName: "Akademik Yıl",
      width: 200,
      flex: 1,
      valueGetter: (params) => {
        const convertedYears = convertAcademicYears(formattedAcademicYears);
        const year = convertedYears.find(([key]) => key === params);
        return year ? year[1] : "Bilinmiyor"; // Eşleşme yoksa 'Bilinmiyor' göster
      },
    },
    {
      field: "lessonCode",
      headerName: "Ders Kodu",
      width: 200,
      flex: 1,
    },
    { field: "akts", headerName: "AKTS", width: 200, flex: 1 },
    {
      field: "createdDate",
      headerName: "Oluşturulma Zamanı",
      width: 200,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "İşlemler",
      width: 200,
      renderCell: (params) => (
        <>
          <Button color="primary" onClick={() => handleClickOpen(params.row)}>
            Güncelle
          </Button>
          <Button color="error" onClick={() => handleDeleteRequest(params.row)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <h2>Ders İşlemleri Tablosu</h2>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Yeni Ekle
      </Button>

      <DataGrid
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25, { value: -1, label: "Tümü" }]}
        rows={data}
        columns={columns}
        pageSize={pageSize}
        page={page}
        rowsPerPageOptions
        onPageChange={(newPage) => setPage(newPage)} // Sayfa değiştiğinde
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Sayfa boyutu değiştiğinde
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        localeText={{
          MuiTablePagination: {
            labelRowsPerPage: "Sayfa başına satır",
          },
        }}
      />
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Silme İşlemi</DialogTitle>
        <DialogContent>
          <p>Bu öğeyi silmek istediğinize emin misiniz?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
            İptal
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteItem); // Silme işlemi
              setConfirmDeleteOpen(false); // Dialog'u kapat
            }}
            color="error"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ders Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="İsim"
            type="text"
            fullWidth
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Ders Kodu"
            type="text"
            fullWidth
            value={newItem.lessonCode}
            onChange={(e) =>
              setNewItem({ ...newItem, lessonCode: e.target.value })
            }
          />
          {/* Akademik Yıl Dropdown */}
          <Select
            fullWidth
            margin="dense"
            value={newItem.academicYear}
            onChange={(e) =>
              setNewItem({ ...newItem, academicYear: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="" disabled>
              Akademik Yıl Seçin
            </MenuItem>
            {convertAcademicYears(formattedAcademicYears).map(
              ([key, text], index) => (
                <MenuItem key={index} value={key}>
                  {text}
                </MenuItem>
              )
            )}
          </Select>

          <TextField
            autoFocus
            margin="dense"
            label="AKTS"
            type="text"
            fullWidth
            value={newItem.akts}
            onChange={(e) => setNewItem({ ...newItem, akts: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            İptal
          </Button>
          <Button onClick={handleSave} color="primary">
            {newItem.id ? "Güncelle" : "Ekle"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // Mesajın görünme süresi
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ fontSize: "1.2rem", padding: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CrudTable;
