import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";

const lessons = [
  {
    title: "Bitirme Projesi 1",
    year: "2024-2025",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Bitirme Projesi 2",
    year: "2023-2024",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Veritabanı Yönetimi",
    year: "2024-2025",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Mobil Programlama",
    year: "2024-2025",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Yapay Zeka",
    year: "2024-2025",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Siber Güvenlik",
    year: "2024-2025",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
];

export default function StudentLessonGrid() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {lessons.map((lesson, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => navigate("LessonDetailsPage")}
            sx={{
              maxWidth: 345,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "16px",
              backgroundColor: "#f9f9f9",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={lesson.image}
                alt={lesson.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "#2e7d32" }}
                >
                  {lesson.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#616161" }}>
                  {lesson.year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
