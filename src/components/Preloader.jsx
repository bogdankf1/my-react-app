import React, { Component } from 'react'
import './../css/Preloader.css'

export default class Preloader extends Component {
    render() {
        return (
            <div className="preloader-wrapper big active" id="preloader">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                    <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
            </div> 
        )
    }
}