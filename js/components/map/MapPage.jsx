import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import Header from "../common/Header";
import MapPin from "./MapPin";
import PlaceInfo from "./PlaceInfo";
import * as placeActions from "../../actions/placeActions";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: 39.7392,
        longitude: -104.9903,
        bearing: 0,
        pitch: 0,
        maxZoom: 18,
        zoom: 10
      },
      popupInfo: null,
      places: []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPlaces();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight - 64
      }
    });
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  renderPlaceMarker(place, index) {
    return (
      <Marker key={index} longitude={place.lon} latitude={place.lat}>
        <MapPin size={20} onClick={() => this.setState({ popupInfo: place })} />
      </Marker>
    );
  }

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.lon}
          latitude={popupInfo.lat}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PlaceInfo place={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <div>
        <Header />
        <div>
          <MapGL
            mapStyle="mapbox://styles/owenlamb/cjlfragh72pll2rpb8n4j2j0e"
            mapboxApiAccessToken={
              "pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw"
            }
            {...viewport}
            onViewportChange={this.updateViewport}
          >
            {this.props.places.map((place, index) =>
              this.renderPlaceMarker(place, index)
            )}
            {this.renderPopup()}
            <div className="nav" style={navStyle}>
              <NavigationControl onViewportChange={this.updateViewport} />
            </div>
          </MapGL>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.shape({
    loadPlaces: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  places: state.places
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
