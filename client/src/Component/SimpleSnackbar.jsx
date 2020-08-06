import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class SimpleSnackbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
            severity: ''
        }
    }

    handleClick = (globalmessage, severity) => {
        this.setState({
            open: true,
            message: globalmessage,
            severity: severity
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.message}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close"
                                color="inherit" onClick={this.handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }>

                    <Alert onClose={this.handleClose} severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
                {/* <Alert severity="error">This is an error message!</Alert>
                <Alert severity="warning">This is a warning message!</Alert>
                <Alert severity="info">This is an information message!</Alert>
                <Alert severity="success">This is a success message!</Alert> */}
            </div >
        )
    }

}