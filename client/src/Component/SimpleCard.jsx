import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: '600px',
    height: 'auto',
    marginLeft: '374px',
    marginBottom: '10px'
  },

  btnactions: {
    float: "right",
  },
  header: {
    backgroundColor: 'sandybrown',
    marginTop: '-10px'

  }
});

export default function SimpleCard(props) {

  const { postedJob } = props
  const classes = useStyles();


  const dayDifference = (stateDate, endDate) => {
    if (!moment.isMoment(stateDate)) stateDate = moment(stateDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    let dayDifference = endDate.diff(stateDate, "days");
    if (dayDifference === 0) {
      return `Posted on Today`
    } else if (isNaN(dayDifference)) {
      return ""
    } else {
      return `Posted on ${dayDifference} ago`
    }
  }

  const removeaction = (id, mode) => {
    console.log(id)
    props.remove(id, mode)


  }

  return (
    <div>
      {postedJob.map((jobList, index) => {
        return <Card style={jobList.status === "V" ? { backgroundColor: 'antiquewhite' } : {}}
          className={classes.root}
          key={jobList._id}
          variant="outlined">
          <CardHeader className={classes.header}
            title={<Typography style={{ float: 'left' }}>
              {jobList.title} </Typography>
            }
            subheader={<Typography style={{ float: 'right' }}>{dayDifference(new Date(jobList.createdAt), new Date())} </Typography>} />
          <CardContent>
            <Typography align="justify" variant="h6" color="textSecondary" gutterBottom>
              {jobList.description}
            </Typography>
            <Typography align="justify" variant="h6" component="h2" gutterBottom>
              {jobList.keywords}
            </Typography>
            <Typography style={{ display: 'none' }} align="justify" variant="h6" component="h2" gutterBottom>
              {jobList._id}
            </Typography>
            <Typography align="justify" variant="h6" component="h2" gutterBottom>
              {jobList.location} - {jobList.city}
            </Typography>
           

          </CardContent>
          <CardActions className={classes.btnactions}>
            {/* {jobList.status==="A" &&
            <Button size="small" variant="contained" color="primary"
              onClick={() => removeaction(jobList._id,"Edit")}>
              EDIT
            </Button>
          } */}

            <Button size="small" variant="contained" style={{backgroundColor:'cadetblue',color: 'white'}}
              onClick={() => removeaction(jobList._id, "ARCHIVE")}>
              ARCHIVE
            </Button>

            <Button size="small" variant="contained" color="secondary"
              onClick={() => removeaction(jobList._id, "DELETE")}>
              DELETE
            </Button>


          </CardActions>
        </Card>
      })
      }
    </div>
  );
}