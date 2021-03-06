import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Typography, Grid, Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import SimpleCard from './SimpleCard';
import Axios from "axios";
import schema from './Validator.js'
import validate from 'validate.js';
import SimpleSnackbar from './SimpleSnackbar';
import * as country from './CountryandCity.js'

//Class for job portal

export class PortalList extends Component {


    constructor(props) {
        super(props);
        this.snackbarRef = React.createRef();
        console.log(this.snackbarRef)
        this.state = {
            apiResponse: '',
            jobID: '',
            jobTitle: '',
            jobdescription: '',
            dateOfposting: new Date(),
            countrys: [{ "countries": "Afghanistan" }, { "countries": "Albania" }, { "countries": "Algeria" }, { "countries": "Andorra" }, { "countries": "Angola" }, { "countries": "AntiguaandBarbuda" }, { "countries": "Argentina" }, { "countries": "Armenia" }, { "countries": "Aruba" }, { "countries": "Australia" }, { "countries": "Austria" }, { "countries": "Azerbaijan" }, { "countries": "Bahamas" }, { "countries": "Bahrain" }, { "countries": "Bangladesh" }, { "countries": "Barbados" }, { "countries": "Belarus" }, { "countries": "Belgium" }, { "countries": "Belize" }, { "countries": "Bolivia" }, { "countries": "BosniaandHerzegovina" }, { "countries": "Botswana" }, { "countries": "Brazil" }, { "countries": "Brunei" }, { "countries": "Bulgaria" }, { "countries": "Cambodia" }, { "countries": "Cameroon" }, { "countries": "Canada" }, { "countries": "CaymanIslands" }, { "countries": "Chile" }, { "countries": "China" }, { "countries": "Colombia" }, { "countries": "Congo" }, { "countries": "CostaRica" }, { "countries": "Croatia" }, { "countries": "Cuba" }, { "countries": "Cyprus" }, { "countries": "CzechRepublic" }, { "countries": "Denmark" }, { "countries": "DominicanRepublic" }, { "countries": "Ecuador" }, { "countries": "Egypt" }, { "countries": "ElSalvador" }, { "countries": "Estonia" }, { "countries": "FaroeIslands" }, { "countries": "Finland" }, { "countries": "France" }, { "countries": "FrenchPolynesia" }, { "countries": "Gabon" }, { "countries": "Georgia" }, { "countries": "Germany" }, { "countries": "Ghana" }, { "countries": "Greece" }, { "countries": "Greenland" }, { "countries": "Guadeloupe" }, { "countries": "Guam" }, { "countries": "Guatemala" }, { "countries": "Guinea" }, { "countries": "Haiti" }, { "countries": "HashemiteKingdomofJordan" }, { "countries": "Honduras" }, { "countries": "HongKong" }, { "countries": "Hungary" }, { "countries": "Iceland" }, { "countries": "India" }, { "countries": "Indonesia" }, { "countries": "Iran" }, { "countries": "Iraq" }, { "countries": "Ireland" }, { "countries": "IsleofMan" }, { "countries": "Israel" }, { "countries": "Italy" }, { "countries": "Jamaica" }, { "countries": "Japan" }, { "countries": "Kazakhstan" }, { "countries": "Kenya" }, { "countries": "Kosovo" }, { "countries": "Kuwait" }, { "countries": "Latvia" }, { "countries": "Lebanon" }, { "countries": "Libya" }, { "countries": "Liechtenstein" }, { "countries": "Luxembourg" }, { "countries": "Macedonia" }, { "countries": "Madagascar" }, { "countries": "Malaysia" }, { "countries": "Malta" }, { "countries": "Martinique" }, { "countries": "Mauritius" }, { "countries": "Mayotte" }, { "countries": "Mexico" }, { "countries": "Mongolia" }, { "countries": "Montenegro" }, { "countries": "Morocco" }, { "countries": "Mozambique" }, { "countries": "Myanmar[Burma]" }, { "countries": "Namibia" }, { "countries": "Nepal" }, { "countries": "Netherlands" }, { "countries": "NewCaledonia" }, { "countries": "NewZealand" }, { "countries": "Nicaragua" }, { "countries": "Nigeria" }, { "countries": "Norway" }, { "countries": "Oman" }, { "countries": "Pakistan" }, { "countries": "Palestine" }, { "countries": "Panama" }, { "countries": "PapuaNewGuinea" }, { "countries": "Paraguay" }, { "countries": "Peru" }, { "countries": "Philippines" }, { "countries": "Poland" }, { "countries": "Portugal" }, { "countries": "PuertoRico" }, { "countries": "RepublicofKorea" }, { "countries": "RepublicofLithuania" }, { "countries": "RepublicofMoldova" }, { "countries": "Romania" }, { "countries": "Russia" }, { "countries": "SaintLucia" }, { "countries": "SanMarino" }, { "countries": "SaudiArabia" }, { "countries": "Senegal" }, { "countries": "Serbia" }, { "countries": "Singapore" }, { "countries": "Slovakia" }, { "countries": "Slovenia" }, { "countries": "SouthAfrica" }, { "countries": "Spain" }, { "countries": "SriLanka" }, { "countries": "Sudan" }, { "countries": "Suriname" }, { "countries": "Swaziland" }, { "countries": "Sweden" }, { "countries": "Switzerland" }, { "countries": "Taiwan" }, { "countries": "Tanzania" }, { "countries": "Thailand" }, { "countries": "TrinidadandTobago" }, { "countries": "Tunisia" }, { "countries": "Turkey" }, { "countries": "U.S.VirginIslands" }, { "countries": "Ukraine" }, { "countries": "UnitedArabEmirates" }, { "countries": "UnitedKingdom" }, { "countries": "UnitedStates" }, { "countries": "Uruguay" }, { "countries": "Venezuela" }, { "countries": "Vietnam" }, { "countries": "Zambia" }, { "countries": "Zimbabwe" }],
            location: '',
            keywords: '',
            JobList: [],
            jobModal: {},
            status: '',
            message: '',
            errors: {},
            cities: [],
            selectedcity: ''
        }

    }



    hasError(field) {
        return this.state.errors[field] ? true : false;
    }

    componentDidMount() {
         this.collectPostedJobList()
    }

    
    handlecityvalue = (sindex) => {
        const { cities } = this.state
        console.log(sindex)
        if (sindex>-1) {
            let tempcityobject = {}
            var cityarray = country.country;
            let tempdata = []
            var state_arr = cityarray[sindex].split("|");
            for (var i = 0; i < state_arr.length; i++) {
                tempcityobject["city"] = state_arr[i].trim()
                let ocity = Object.assign({}, tempcityobject)
                tempdata.push(ocity)

            }

            this.setState({ cities: tempdata })
        }

    }

    

    handleClick = (message, serverity) => {
        console.log(this.snackbarRef)
        this.snackbarRef.current.handleClick(message, serverity);
    }


    //To get the posted jobs
    collectPostedJobList() {
        Axios({
            method: "GET",
            url: "/findAll",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            this.setState({ JobList: res.data })
        });
    }

    updateJobList = (id, mode) => {
        const { JobList } = this.state
        let tempList = JobList
        switch (mode) {
            case 'Edit': //Update the jobs
                Axios({
                    method: "PUT",
                    url: `/update/${id}`,
                    data: {
                        "title": this.state.jobTitle,
                        "description": this.state.jobdescription,
                        "keywords": this.state.keywords,
                        "location": this.state.location,
                        "status": 'A'
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        if (tempList.length > 0) {
                            for (let i = 0; i < tempList.length; i++) {
                                console.log(tempList[i]._id)
                                if (tempList[i]._id === res.data._id) {
                                    tempList[i].title = res.data.title
                                    tempList[i].keywords = res.data.keywords
                                    tempList[i].location = res.data.location
                                    tempList[i].description = res.data.description
                                    break;
                                }
                            }
                            console.log(tempList)
                            this.setState({
                                JobList: tempList
                            })

                        }
                    }
                });
                break;

            case 'ARCHIVE': //to maintain the history of archive
                Axios({
                    method: "PUT",
                    url: `/update/${id}`,
                    data: {
                        "status": 'V'
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        
                        if (tempList.length > 0) {
                            for (let i = 0; i < tempList.length; i++) {
                                console.log(tempList[i]._id)
                                if (tempList[i]._id === res.data._id) {
                                    tempList[i].status = "V"
                                    break;
                                }
                            }
                            console.log(tempList)
                            this.setState({
                                JobList: tempList
                            })
                            this.handleClick("Posted job Archived Successfully", "success")

                        }
                    }
                });
                break;

            case 'DELETE': //delete the posted jobs
                Axios({
                    method: "DELETE",
                    url: `/delete/${id}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        console.log(id)
                        console.log('index', tempList)
                        let index = tempList.findIndex(x => x._id === id)
                        tempList.splice(index, 1)

                        console.log(tempList)
                        this.setState({ JobList: tempList })
                        this.handleClick("Posted Job Deleted Successfully", "success")
                    }
                }).catch(error => {
                    console.log(error.message)
                })
                break;
        }


    }



    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    

    resetField = () => {
        this.setState({
            jobTitle: '',
            jobdescription: '',
            keywords: '',
            errors:{}
        })
    }


    //to post jobs 
    handlePost = () => { 
        const { JobList } = this.state
        console.log(this.state.selectedcity)
        let errors = validate(this.state, schema)
        if (errors === undefined) {
            Axios({
                method: "POST",
                url: "/addjobs",
                data: {
                    "title": this.state.jobTitle,
                    "description": this.state.jobdescription,
                    "keywords": this.state.keywords,
                    "location": this.state.location,
                    "city": this.state.selectedcity,
                    "status": 'A'
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    
                    this.state.JobList.push(res.data)
                    this.setState({ JobList })
                    this.resetField()
                    this.handleClick("Job Posted Successfully", "success")    
                } else {
                    console.log(res.data)
                    this.handleClick(res.data.message, "error")
                }
            }).catch(error => {
                const message = error.message
                this.handleClick(message, "error")
            });
        } else {
            console.log('errors::', errors)
            this.setState({ ...this.state, errors: errors });
        }

    }

    handleselectchange = (event, value) => {
        console.log(value)
        if (value!==null) {
            let index = this.state.countrys.indexOf(value)
            this.handlecityvalue(index)
            this.setState({ location: value.countries })
        }

    }

    handlecityselectchange = (event, value) => {
        console.log(value)
        if (value!==null) {
            this.setState({ selectedcity: value.city })
        }
    }

    render() {

        return (
            <React.Fragment>
                <Typography variant="h6" component="h3" style={{ marginTop: '15px' }}
                 gutterBottom>JOB PORTAL</Typography>
                <Container maxWidth="sm" style={{ padding: '30px', marginBottom: '30px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required size="small" fullWidth id="standard-basic" label="Job Title"
                                name="jobTitle"
                                value={this.state.jobTitle}
                                helperText={this.hasError('jobTitle') ? "Please fill the JobTitle" : null}
                                onChange={this.handleChange} variant="outlined" />

                        </Grid>
                        <Grid item xs={12} >
                            <TextField required 
                            fullWidth
                                helperText={this.hasError('jobdescription') ? "Please fill the Jobdescription" : null}
                                label="Job Description"
                                name="jobdescription"
                                value={this.state.jobdescription}
                                onChange={this.handleChange}
                                multiline
                                variant="outlined" />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required size="small" fullWidth id="standard-basic" label="Keywords"
                                helperText={this.hasError('keywords') ? "Please fill the Keywords" : null}
                                name="keywords" value={this.state.keywords}
                                onChange={this.handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                helperText={this.hasError('countrys') ? "Select the countrys" : null}
                                size="small"
                                fullWidth
                                autoHighlight
                                id="country"
                                options={this.state.countrys}
                                getOptionLabel={(option) => option.countries}
                                onChange={(event, value) => this.handleselectchange(event, value)}
                                
                                renderInput={(params) => <TextField required {...params} label="Country"
                                    variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                helperText={this.hasError('city') ? "Select the city" : null}
                                size="small"
                                autoHighlight
                                fullWidth
                                id="city"
                                options={this.state.cities}
                                getOptionLabel={(option) => option.city}
                                onChange={(event, value) => this.handlecityselectchange(event, value)}
                                
                                renderInput={(params) => <TextField required {...params} label="City"
                                    variant="outlined" />}
                            />
                        </Grid>
                       
                        <Grid item xs={12}>
                            <Button onClick={this.handlePost} style={{ float: 'right' }}
                                variant="contained" size="small" color="primary">ADD</Button>
                        </Grid>
                    </Grid>
                </Container>
                <div>
                    {this.state.JobList.length > 0 &&
                        <SimpleCard postedJob={this.state.JobList} remove={this.updateJobList} />
                    }
                </div>


                <SimpleSnackbar ref={this.snackbarRef} />

            </React.Fragment>


        )
    }
}

export default PortalList
