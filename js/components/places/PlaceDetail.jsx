import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Header from "../common/Header";
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
      id: this.props.match.params.id
    };
  }

  componentDidMount() {
    this.props.actions.getPlaceById(this.state.id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div style={{ margin: "10px" }}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              {this.props.place.name}
            </Typography>
            <Typography component="p">Some Details here</Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

const filterPlace = (places, id) => {
  const thePlace = places.find(place => place.id == id); // eslint-disable-line eqeqeq
  return Object.assign({}, thePlace);
};

const mapStateToProps = (state, ownProps) => ({
  place: filterPlace(state.places, ownProps.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});

PlaceDetail.propTypes = {
  actions: PropTypes.shape({
    getPlaceById: PropTypes.func.isRequired
  }).isRequired,
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
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
