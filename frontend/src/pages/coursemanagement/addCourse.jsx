import { useState } from "react"
import { FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Switch, TextField } from "@mui/material"

import BreadCrumbs from "../../components/breadcrubs"
import FormCard from "../../components/formCard"
import FormUploadArea from "../../components/fileUpload"
import CustomAutoComplete from "../../components/autoComplete"

import { DurationList, LanguageList, LevelList, SkillsList, SubjectList, TypeList } from "../../data"
import CustomDatePicker from "../../components/datePicker"

const AddCoursePage = () => {
    const [files, setFiles] = useState([]);
    const [subject, setSubject] = useState(null);
    const [skills, setSkills] = useState([]);
    const [language, setLanguage] = useState('English');
    const [type, setType] = useState('Course');
    const [level, setLevel] = useState('Beginner');
    const [duration, setDuration] = useState('Less Than 2 Hours');
    const [startDate, setStartDate] = useState(null);
    const [price, setPrice] = useState(0);
    const [publish, setPublish] = useState(false);


    const onSelect = (files) =>{
        setFiles(files);
    }

    const handleSubmit = async() => {
        console.log(files, subject, skills, language, type, level, duration, startDate, price, publish);
    }

    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs />
                <FormCard title={"Course"} action={"Create"} onClick={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormUploadArea 
                                multiple={false}
                                accept={"image/*"}
                                maxFileSize={1000000}
                                label={"Course Thumbnail"}
                                selectfunc={onSelect}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={12}>
                                    <TextField variant="outlined" size="small" label="Title" placeholder="Title" fullWidth/>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <TextField variant="outlined" size="small" label="Description" placeholder="Description" fullWidth multiline minRows={2}/>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Subject"}
                                        options={SubjectList}
                                        value={subject}
                                        setValue={setSubject}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Language"}
                                        options={LanguageList}
                                        value={language}
                                        setValue={setLanguage}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Type"}
                                        options={TypeList}
                                        value={type}
                                        setValue={setType}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Level"}
                                        options={LevelList}
                                        value={level}
                                        setValue={setLevel}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Duration"}
                                        options={DurationList}
                                        value={duration}
                                        setValue={setDuration}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        multiple={true}
                                        label={"Benefits"}
                                        options={SkillsList}
                                        value={skills}
                                        setValue={setSkills}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomDatePicker
                                        label="Start Date"
                                        disablePast={true}
                                        value={startDate}
                                        setValue={setStartDate}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Price</InputLabel>
                                        <OutlinedInput
                                            size="small"
                                            type="number"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Price"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControlLabel 
                                        control={
                                            <Switch  
                                                checked={publish}
                                                onChange={(e) => setPublish(e.target.checked)}
                                            />
                                        } 
                                        label="Publish" 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormCard>
            </div>
        </>
    )
}

export default AddCoursePage;