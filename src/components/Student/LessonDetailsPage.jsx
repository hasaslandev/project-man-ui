import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LessonDetailPage() {
  const navigate = useNavigate();

  // Sabit ders bilgisi
  const lesson = {
    title: "Bitirme Projesi",
    topic: "Yapay Zeka ile Tavsiye Sistemleri Geliştirme",
    description:
      "Bu proje, kullanıcı davranışlarını analiz ederek tavsiye algoritmalarını optimize etmeyi amaçlar.",
    advisor: "Dr. Ahmet Yılmaz",
    team: [
      { name: "Ali Veli", role: "Backend Developer" },
      { name: "Ayşe Kaya", role: "Frontend Developer" },
      { name: "Mehmet Çelik", role: "Project Manager" },
    ],
    milestones: [
      { title: "Proje Planı Hazırlama", date: "01 Kasım 2024" },
      { title: "Model Eğitimi ve Testi", date: "15 Aralık 2024" },
      { title: "Sonuçların Sunumu", date: "30 Ocak 2025" },
    ],
    cost: "25,000 TL",
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "900px", margin: "0 auto" }}>
      {/* Ders Başlığı */}
      <Typography variant="h3" gutterBottom>
        {lesson.title}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "text.secondary", marginBottom: 2 }}
      >
        {lesson.topic}
      </Typography>

      {/* Proje Tanımı */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="body1">{lesson.description}</Typography>
      </Paper>

      {/* Danışman Bilgisi */}
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader
          avatar={<Avatar>{lesson.advisor[0]}</Avatar>}
          title="Danışman Hoca"
          subheader={lesson.advisor}
        />
      </Card>

      {/* Takım Arkadaşları */}
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Takım Arkadaşları" />
        <CardContent>
          <List>
            {lesson.team.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{member.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={`Görev: ${member.role}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Kilometre Taşları */}
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Kilometre Taşları" />
        <CardContent>
          <List>
            {lesson.milestones.map((milestone, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={milestone.title}
                  secondary={`Tarih: ${milestone.date}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Proje Maliyeti */}
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Proje Maliyeti
        </Typography>
        <Typography variant="body1">{lesson.cost}</Typography>
      </Card>

      {/* Mesajlaşma Butonu */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate("/messages")}
      >
        Mesajlaşma Ekranına Git
      </Button>

      {/* Sayfa Altı */}
      <Divider sx={{ marginY: 4 }} />
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "center" }}
      >
        © 2024 Yazılım Geliştirme Takımı
      </Typography>
    </Box>
  );
}
