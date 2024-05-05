import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, Card, CardActionArea, CardContent, CircularProgress, Dialog, DialogActions, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { courseApi } from "../../utils/api";
import BreadCrumbs from "../../components/breadcrubs";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";

const CourseHomePage = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const navigate = useNavigate()

    const fetchCourses = async(page = 1, rows = 50) => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.get(`/course/all`, {params: {page, rows}});

            console.log(data);
            setCourses(data.payload.rows);

            // toast.success(data.message);
        } catch (error) {
            setCourses([]);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const promptDelete = (course_id) => {
        setDeleteId(course_id)
        setShowDialog(true);
    }

    const deleteCourse = async() => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.delete(`/course/delete/${deleteId}`);
            await fetchCourses();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
            setShowDialog(false);
            setDeleteId('');
        }
    }

    useEffect(() => {
        fetchCourses()
    },[])

    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography fontSize={30}>All Courses</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'}>
                        <Button variant={'contained'} color={'primary'} onClick={() => navigate('./create')}>Add Course</Button>
                    </Grid>
                    {courses.map((course, index) => (
                        <Grid key={index} item xs={12} md={6} lg={12}>
                            <Card elevation={1} style={{width:'100%', display:'flex', flexDirection:'column', padding:'20px', border:'1px solid #f3d607', borderRadius:'5px', margin:'0px 0px'}}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3} md={12} lg={3}>
                                            <img src={import.meta.env.VITE_COURSE_SERVER_URL+course.thumbnail} alt={course.title} style={{width:'100%', height:'auto', borderRadius:'5px'}} />
                                        </Grid>
                                        <Grid item xs={12} sm={9} md={12} lg={9}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'}>
                                                    <IconButton onClick={() => navigate(`./${course.course_id}`)} >
                                                        <RemoveRedEye />
                                                    </IconButton>
                                                    <IconButton onClick={() => navigate(`./update/${course.course_id}`)} >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton onClick={() => promptDelete(course.course_id)} >
                                                        <Delete />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>        
                                                    <Typography fontSize={25}>{course.name}</Typography>
                                                    <p>{course.desc}</p>
                                                    <p>Start Date: {new Date(course.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    <br />
                                                    <Typography fontSize={17}>{course.price == 0 ? 'FREE' : `$${course.price}`}</Typography>
                                                    <Typography fontSize={15}>{course.level} • {course.type} • {course.duration}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {courses.length === 0 && <Typography width={'100%'} fontSize={20} textAlign={'center'} marginTop={'20px'}>No Courses Found</Typography>}
                </Grid>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
            >
                <DialogTitle>
                    Are you sure you want to delete this course?
                </DialogTitle>
                <DialogActions>
                <Button autoFocus onClick={() => setShowDialog(false)}>
                    Cancel
                </Button>
                <Button onClick={deleteCourse} autoFocus color="error">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CourseHomePage;