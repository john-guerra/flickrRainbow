import React, {Component} from 'react';

import './style.css';

import Photo from "../Photo";

export default class PhotoColumn extends Component {
	renderPhotos() {
		return this.props.photos.map((photo) => {
			console.log("render photos photo=");
			console.log(photo);
			return <Photo photo={photo} key={photo.id}></Photo>
		});
	}
	render() {
		console.log("photoColumn");
		return (
			<div className="photo-column">{this.renderPhotos()}</div>
		);
	}
}