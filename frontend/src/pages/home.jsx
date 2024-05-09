import { Container, Grid, Typography } from "@mui/material";
import Hero from "../components/home/hero";
import CourseCard from "../components/home/courseCard";

const HomePage = () => {
  return (
    <Container sx={{mt:5}}>
          <Hero />
          <Typography variant="h4" sx={{mb:2}}>Popular Courses</Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                  <CourseCard/>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                  <CourseCard/>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                  <CourseCard/>
              </Grid>
              
          </Grid> 
    </Container>
  );
}

export default HomePage;