import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Header from "../common/Header";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="HomePage">
        <Header />
        <div className="Hero">
          <h1>Welcome to PlaceList</h1>
          <p>List, map, share and rank your spots</p>
          <Link style={{ textDecoration: "none" }} to="/places">
            <Button variant="contained" color="primary">
              Add to the List
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
