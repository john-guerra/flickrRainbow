import React, {Component} from 'react';

export default class Photo extends Component {
	getUrl() {
		return "https://farm"+
			this.props.photo.farm +
			".staticflickr.com/" +
			this.props.photo.server +
			"/"+
			this.props.photo.id+
			"_" +
			this.props.photo.secret +
			"_s.jpg";
	}
	render() {
		return (
			<div className="photo">
				<img src={this.getUrl()} alt={this.props.photo.title}/>
			</div>
		);
	}
}