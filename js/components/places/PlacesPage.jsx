import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Header from "../common/Header";
import PlaceCard from "./PlaceCard";
import NewPlace from "./NewPlace";
import * as placeActions from "../../actions/placeActions";

const styles = theme => ({
  actionButton: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: "auto",
    margin: "10px",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  }
});

class PlacePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      formOpen: false,
      handleClose: this.handleClose,
      createPlace: this.createPlace
    };
  }

  componentDidMount() {
    this.props.actions.loadPlaces();
  }

  handleClickOpen = () => {
    this.setState({ formOpen: true });
  };

  handleClose = () => {
    this.setState({ formOpen: false });
  };

  createPlace = place => {
    this.props.actions.createPlace(place);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classNames(classes.button, classes.actionButton)}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        <NewPlace {...this.state} />
        <div style={{ maxHeight: "100vh", overflow: "auto" }}>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {this.props.places.map(place => (
                <Grid item key={Math.random()} sm={6} md={4} lg={3}>
                  <PlaceCard {...place} key={place.id} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});

PlacePage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  places: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.shape({
    createPlace: PropTypes.func.isRequired,
    loadPlaces: PropTypes.func.isRequired
  }).isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlacePage);
