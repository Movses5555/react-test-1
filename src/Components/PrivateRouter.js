import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRouter extends Component {
    state = {
        isLoggedIn: localStorage.getItem("token"),
    };

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    (this.state.isLoggedIn !== null) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login"/>
                    )
                }
            />
        );
    }
}

export default PrivateRouter;
