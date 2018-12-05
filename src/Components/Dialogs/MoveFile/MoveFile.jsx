import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalMoveFile, setSelectedFolderSublist, enterToPreviousDirectorySublist, refreshFileListSublist } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { handleChange, handleClose, handleSave, value, open, selectedFolderSublist, canGoBack, handleGoBack } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSave}>
                    <DialogTitle id="form-dialog-title">
                        Move files to <span style={{color: 'grey'}}>{ selectedFolderSublist ? selectedFolderSublist.name : '' }</span>
                    </DialogTitle>
                    <DialogContent>
                        <FileListSublist />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleGoBack} color="primary" type="button" disabled={!canGoBack}>
                            <KeyboardArrowLeftIcon /> Go back directory
                        </Button>

                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleSave} type="submit">
                            Move
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.visibleModalMoveFile,
        selectedFolderSublist: state.selectedFolderSublist,
        canGoBack: state.pathSublist.length
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleModalMoveFile(false));
        },
        handleSave: (event) => {
        },
        handleGoBack: (event) => {
            dispatch(enterToPreviousDirectorySublist());
            dispatch(refreshFileListSublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
