import React from "react";
import Header from "../common/Header";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="AboutPage">
        <Header />
        <h1>About</h1>
        <p>Explain what the app does</p>
      </div>
    );
  }
}

export default AboutPage;
