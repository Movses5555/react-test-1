import React, { Component } from "react";

class ErrorMessage extends Component {
    render() {
        if (this.props.errors.length === 0) {
            return null;
        }
        return (
            <div className="alert alert-danger">
                <ul>
                    {this.props.errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ErrorMessage;

