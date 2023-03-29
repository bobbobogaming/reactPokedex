import { Component } from "react";

import './style/bootstrap.min.css'

export class ButtonStyle{
    static primary = "btn-primary";
    static secondary = "btn-secondary";
    static success = "btn-success";
    static danger = "btn-danger";
    static warning = "btn-warning";
    static info = "btn-info";
    static light = "btn-light";
    static dark = "btn-dark"
    static link = "btn-link"

    static outlinePrimary = "btn-outline-primary";
    static outlineSecondary = "btn-outline-secondary";
    static outlineSuccess = "btn-outline-success";
    static outlineDanger = "btn-outline-danger";
    static outlineWarning = "btn-outline-warning";
    static outlineInfo = "btn-outline-info";
    static outlineLight = "btn-outline-light";
    static outlineDark = "btn-outline-dark"
}

export class ReactButton extends Component {
    render(){
        return <button className={`btn ${this.props.buttonStyle}`} onClick={this.props.onClick}>{this.props.children}</button>
    }
}