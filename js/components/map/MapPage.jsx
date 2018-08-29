import React from "react";
import ReactMapGL from "react-map-gl";
import Header from "../common/Header";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      places: []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <ReactMapGL
            mapboxApiAccessToken={
              "pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw"
            }
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({ viewport })}
          />
        </div>
      </div>
    );
  }
}

export default Map;
