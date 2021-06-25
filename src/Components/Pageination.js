import React, { Component } from "react";

class Paginate extends Component {
    render() {
        const items = [];
        const { total, currentPage } = this.props;

        if (total === 1) {
            return null;
        }
        for (let i = 1; i <= total; i++) {
            let classes = "page-item";
            if (i === currentPage) {
                classes += " active";
            }
            items.push(
                <li key={i} className={classes}>
                    <span
                        className="page-link"
                        onClick={() => this.props.click(i)}
                    >
                        {i}
                    </span>
                </li>
            );
        }
        return items;
    }
}

export default Paginate;
