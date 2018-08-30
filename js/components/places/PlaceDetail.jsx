import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Header from "../common/Header";
import EditPlace from "./EditPlace";
import * as placeActions from "../../actions/placeActions";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class PlaceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {},
      id: this.props.match.params.id,
      formOpen: false,
      deleteFormOpen: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.actions.getPlaceById(this.state.id);
  }

  updatePlace = place => {
    this.props.actions.updatePlace(place);
    this.handleClose();
  };

  deletePlace = () => {
    this.props.actions.deletePlace(this.state.id);
    this.handleDeleteClose();
  };

  handleClickEdit = () => {
    this.setState({ formOpen: true });
  };

  handleClose = () => {
    this.setState({ formOpen: false });
  };

  handleClickDelete = () => {
    this.setState({ deleteFormOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteFormOpen: false });
  };

  render() {
    const { classes } = this.props;
    const place = this.props.place;
    return (
      <div>
        <Header />
        <EditPlace
          {...this.props}
          formOpen={this.state.formOpen}
          handleClose={this.handleClose}
          updatePlace={this.updatePlace}
        />
        <div style={{ margin: "10px" }}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              {this.props.place.name}
            </Typography>
            <Typography component="p">{place.category}</Typography>
            <Typography component="p">{place.upvotes}</Typography>
            <Typography component="p">{place.address}</Typography>
            <Typography component="p">{place.description}</Typography>
            <Button onClick={this.handleClickEdit} size="small" color="primary">
              Edit
            </Button>
            <Button
              onClick={this.handleClickDelete}
              size="small"
              color="secondary"
            >
              Delete
            </Button>
          </Paper>
        </div>
        <Dialog
          open={this.state.deleteFormOpen}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Place"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this place?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">
              No Cancel
            </Button>
            <Button onClick={this.deletePlace} color="secondary">
              Yes I am Sure
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const filterPlace = (places, id) => {
  const thePlace = places.find(place => place.id == id); // eslint-disable-line eqeqeq
  return Object.assign({}, thePlace);
};

const mapStateToProps = (state, ownProps) => {
  if (state.places.redirect) {
    ownProps.history.push("/places");
  }
  return {
    place: filterPlace(state.places, ownProps.match.params.id)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});

PlaceDetail.propTypes = {
  actions: PropTypes.shape({
    getPlaceById: PropTypes.func.isRequired,
    updatePlace: PropTypes.func.isRequired,
    deletePlace: PropTypes.func.isRequired
  }).isRequired,
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    category: PropTypes.string
    // upvotes: PropTypes.number.isRequired,
    // lat: PropTypes.number.isRequired,
    // lon: PropTypes.number.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaceDetail);
