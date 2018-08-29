import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class PlaceInfo extends PureComponent {
  render() {
    console.log(this.props);
    const { place } = this.props;
    const displayName = `${place.name}, ${place.address}`;
    const category = `${place.category}`;

    return (
      <div>
        <div>
          {displayName} |{" "}
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
        </div>
        <img width={240} src={`/public/images/${category}.jpg`} alt="" />
      </div>
    );
  }
}

PlaceInfo.propTypes = {
  place: PropTypes.shape({}).isRequired
};
