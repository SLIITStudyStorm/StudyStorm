import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/breadcrubs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { courseApi } from "../../utils/api";
import createFileObjectFromPath from "../../utils/createFileObjectFromPath";
import dayjs from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Switch, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { Add, AddCircle, AddCircleOutline, Delete, Edit, ExpandMore, RemoveRedEye } from "@mui/icons-material";
import { useSelector } from "react-redux";
import FormUploadArea from "../../components/fileUpload";

const CourseContentPage = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    const [title, setTitle] = useState('');
    const [customCrumb, setCustomCrumb] = useState('');
    const [desc, setDesc] = useState('');
    const [subject, setSubject] = useState(null);
    const [skills, setSkills] = useState([]);
    const [language, setLanguage] = useState('English');
    const [type, setType] = useState('Course');
    const [level, setLevel] = useState('Beginner');
    const [duration, setDuration] = useState('Less Than 2 Hours');
    const [startDate, setStartDate] = useState(null);
    const [price, setPrice] = useState(0);
    const [approved, setApproved] = useState(false);
    const [contType, setContType] = useState('file')

    const [editable, setEditable] = useState(false);
    const [approvable, setApprovable] = useState(false);
    const [approveAction, setApproveAction] = useState(false);
    
    const [contentId, setContentId] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const [showDialog3, setShowDialog3] = useState(false);
    const [showDialog4, setShowDialog4] = useState(false);

    const [courseContents, setCourseContents] = useState([]);
    const [contentTitle, setContentTitle] = useState('');
    const [contentSubTitle, setContentSubTitle] = useState('');
    const [contentDesc, setContentDesc] = useState('');
    const [contentTitleError, setContentTitleError] = useState(false);

    
    const [contentDetailTitle, setContentDetailTitle] = useState('');
    const [contentDetailDesc, setContentDetailDesc] = useState('');
    const [attatchment, setAttatchment] = useState('');
    const [attatchmentType, setAttatchmentType] = useState('');
    const [contentDetailTitleError, setContentDetailTitleError] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);    

    const fetchCourse = async() => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.get(`/course/one/${id}`);

            setTitle(data.payload.name);
            setCustomCrumb(data.payload.name)
            setDesc(data.payload.desc);
            setSubject(data.payload.subject);  
            setLanguage(data.payload.language);
            setType(data.payload.type);
            setLevel(data.payload.level);
            setDuration(data.payload.duration);
            setSkills(data.payload.skills);
            setStartDate(dayjs(data.payload.start_date));
            setPrice(data.payload.price);
            setApproved(data.payload.approved);
            setThumbnail(data.payload.thumbnail);

            await fetchCourseContents()
            toast.success(data.message);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }


    const promptApprove = (status) => {
        setApproveAction(status);
        setShowDialog4(true)
    }

    const approve = async() => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.patch(`/course/approve/${id}/${approveAction}`);
            
            toast.success(data.message);
            navigate('/admin/courses')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCourseContents = async(page = 1, rows = 50) => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.get(`/course/content/all`, {params: {page, rows, course_id: id}});

            setCourseContents(data.payload.rows);
            // toast.success(data.message);
        } catch (error) {
            setCourseContents([]);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const promptContentDialog = (content) => {
        if(content){
            setContentId(content.content_id)
            setContentTitle(content.title)
            setContentSubTitle(content.subtitle)
            setContentDesc(content.desc)
        }else{
            setContentId('')
            setContentTitle('')
            setContentSubTitle('')
            setContentDesc('')
        }
        setShowDialog(true);
    }

    const handleContentSubmit = async() => {
        try {

            if(!contentTitle) setContentTitleError(true);

            
            if(contentTitleError){
                throw new Error('Content Title is required');
            }
            
            let data = {
                course_id: id,
                title: contentTitle,
                subtitle: contentSubTitle,
                desc: contentDesc
            }

            let res;
            if(contentId){
                data = {...data, content_id: contentId}
                res = await courseApi.put(`/course/content/update/`, data);
            }else{
                res = await courseApi.post("/course/content/create", data);
            }

            await fetchCourseContents()
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setContentId('')
            setContentTitle('')
            setContentSubTitle('')
            setContentDesc('')
            setShowDialog(false)
        }
    }

    const onSelect = (files) => {
        setAttatchment(files);
        setAttatchmentType(files.map((file) => file.name.split('.').pop()));
    }

    const handleContentDetailSubmit = async() => {
        
    }

    const promptDeleteContent = (course_id) => {
        setContentId(course_id)
        setShowDialog2(true);
    }

    const deleteCourseContent = async() => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.delete(`/course/content/delete/${contentId}`);
            await fetchCourseContents();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
            setShowDialog2(false);
            setContentId('');
        }
    }

    useEffect(() => {
        fetchCourse()

        if(userInfo.userType == "ROLE_ADMIN"){
            setEditable(false);
            setApprovable(true);
        }
        else if(userInfo.userType == "ROLE_INSTRUCTOR"){
            setEditable(true);
            setApprovable(false);
        }
    }, [])


    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs customLast={true} customCrumb={customCrumb} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card elevation={0} style={{width:'100%', background: 'transparent', display:'flex', flexDirection:'column', padding:'0px 20px', margin:'0px 0px'}}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={12} lg={3}>
                                        <img src={import.meta.env.VITE_COURSE_SERVER_URL+thumbnail} onError={(event) => { event.target.src = "/default.png" }}  alt={title} style={{width:'100%', height:'auto', maxHeight:'350px', objectFit:'cover', borderRadius:'5px'}} />
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={12} lg={9}>
                                        <Grid container spacing={2} height={'100%'}>
                                            {
                                                editable &&
                                                <Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'}>
                                                    <IconButton onClick={() => navigate(`../courses/update/${id}`)} >
                                                        <Edit />
                                                    </IconButton>
                                                </Grid>
                                            }
                                            <Grid item xs={12} sm={12} md={12} lg={12}>        
                                                <Typography fontSize={25}>{title}</Typography>
                                                <p>{desc}</p>
                                                <p>Start Date: {new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                <br />
                                                <Typography fontSize={17}>{price == 0 ? 'FREE' : `$${price}`}</Typography>
                                                <Typography fontSize={15}>{level} • {type} • {duration}</Typography>
                                            </Grid>
                                            {
                                                approvable && approved == null &&
                                                <Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                                    <Button variant="contained" color="success" onClick={() => promptApprove(true)}>Approve</Button>
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    <Button variant="contained" color="error" onClick={() => promptApprove(false)}>Reject</Button>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {
                        editable &&
                        <Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'}>
                            <Button variant={'contained'} color={'primary'} onClick={() => promptContentDialog('')}><Add /></Button>
                        </Grid>
                    }
                    <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={'10px'}>
                        {courseContents.map((content, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>{content.title}</Typography>
                                    {
                                        editable &&
                                        <>
                                            <IconButton style={{marginLeft:'5px', height:'25px', width:'25px'}} onClick={() => promptContentDialog(content)}><Edit /></IconButton>
                                            <IconButton style={{marginLeft:'5px', height:'25px', width:'25px'}} onClick={() => promptDeleteContent(content.content_id)}><Delete fontSize="20px"/></IconButton>
                                        </>
                                    }
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography fontWeight={700} marginBottom={'15px'}>{content.subtitle}</Typography>
                                    <Typography>
                                        {content.desc}
                                    </Typography>
                                    <br />

                                    {
                                        editable &&
                                        <>
                                            <Button style={{margin:'5px', padding:'10px'}} onClick={() => setShowDialog3(true)}><AddCircleOutline /> &nbsp;&nbsp;&nbsp;Add Content</Button>
                                        </>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
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
                maxWidth={'xs'}
                fullWidth
            >
                <DialogTitle>
                    New Course Content Category
                </DialogTitle>
                <DialogContent style={{paddingTop:'5px'}}>
                    <TextField 
                        variant="outlined" size="small" 
                        label="Content Category Title" placeholder="Content Category Title" 
                        fullWidth
                        value={contentTitle}
                        onChange={(e) => {
                            setContentTitle(e.target.value)

                            if(!e.target.value) setContentTitleError(true);
                            else setContentTitleError(false);
                        }}
                    />
                    <Typography variant="caption" display={contentTitleError ? 'block' : 'none'} color={"red"} gutterBottom>
                        *{"Content Category Title is required"}
                    </Typography>
                    <br />
                    <br />
                    <TextField 
                        variant="outlined" size="small" 
                        label="Content Category Sub Title" placeholder="Content Category Sub Title" 
                        fullWidth
                        value={contentSubTitle}
                        onChange={(e) => {
                            setContentSubTitle(e.target.value)
                        }}
                    />
                    <br />
                    <br />
                    <TextField 
                        variant="outlined" size="small" 
                        label="Description" placeholder="Description" 
                        fullWidth 
                        multiline 
                        minRows={2}
                        value={contentDesc}
                        onChange={(e) => {
                            setContentDesc(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setShowDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleContentSubmit} autoFocus color="success">
                        {contentId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog
                open={showDialog2}
                onClose={() => setShowDialog2(false)}
            >
                <DialogTitle>
                    Are you sure you want to delete this course content?
                </DialogTitle>
                <DialogActions>
                <Button autoFocus onClick={() => setShowDialog2(false)}>
                    Cancel
                </Button>
                <Button onClick={deleteCourseContent} autoFocus color="error">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog
                open={showDialog3}
                onClose={() => setShowDialog3(false)}
                maxWidth={'md'}
                fullWidth
            >
                <DialogTitle>
                    New Course Content
                </DialogTitle>
                <DialogContent style={{paddingTop:'5px'}}>
                    <ToggleButtonGroup
                        color="primary"
                        value={contType}
                        exclusive
                        onChange={(e, newVal) => setContType(newVal)}
                    >
                        <ToggleButton value="file">File</ToggleButton>
                        <ToggleButton value="link">Link</ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                    <br />                    
                    <TextField 
                        variant="outlined" size="small" 
                        label="Content Title" placeholder="Content Title" 
                        fullWidth
                        value={contentDetailTitle}
                        onChange={(e) => {
                            setContentDetailTitle(e.target.value)

                            if(!e.target.value) setContentDetailTitleError(true);
                            else setContentDetailTitleError(false);
                        }}
                    />
                    <Typography variant="caption" display={contentDetailTitleError ? 'block' : 'none'} color={"red"} gutterBottom>
                        *{"Content Title is required"}
                    </Typography>
                    <br />
                    <br />
                    <TextField 
                        variant="outlined" size="small" 
                        label="Description" placeholder="Description" 
                        fullWidth 
                        multiline 
                        minRows={2}
                        value={contentDetailDesc}
                        onChange={(e) => {
                            setContentDetailDesc(e.target.value)
                        }}
                    />
                    <br />
                    <br />
                    {contType == 'file' ?
                    <FormUploadArea 
                        accept="*" 
                        multiple={true} 
                        maxFileSize={1000000000000000}  
                        label={"Files"}
                        selectfunc={onSelect}
                    />
                    :
                    <TextField 
                        variant="outlined" size="small" 
                        label="Link" placeholder="Link" 
                        fullWidth
                        value={attatchment}
                        onChange={(e) => {
                            setAttatchment([e.target.value])
                            setAttatchmentType(['link'])
                        }}
                    />
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setShowDialog3(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleContentDetailSubmit} autoFocus color="success">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog
                open={showDialog4}
                onClose={() => setShowDialog4(false)}
            >
                <DialogTitle>
                    Are you sure you want to {approveAction ? 'approve' : 'reject'} this course?
                </DialogTitle>
                <DialogActions>
                <Button autoFocus onClick={() => setShowDialog4(false)}>
                    Cancel
                </Button>
                <Button onClick={approve} autoFocus color={approveAction ? 'success' : 'error'}>
                    {approveAction ? 'Approve' : 'Reject'}
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CourseContentPage;