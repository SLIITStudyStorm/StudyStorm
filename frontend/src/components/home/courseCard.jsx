import { Button, Card, Grid, Typography } from "@mui/material";

const CourseCard = () => {
  return (
    <Card sx={{ maxWidth: 345, p: 3 }}>
      <img
        src="https://cdn.springpeople.com/media/python%20logo.png"
        alt="course"
        style={{ width: "100%", height: "auto" }}
      />
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Python Begginer Course
      </Typography>
      <Typography variant="body2">
        In this course, you will be introduced to foundational programming
        skills with basic Python Syntax. You’ll learn how to use code to solve
        problems.
      </Typography>

      {/* add a btn */}

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary">
                Learn more
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant="outlined" color="primary">
                Get started
                </Button>
            </Grid>
        </Grid>


    </Card>
  );
};

export default CourseCard;
