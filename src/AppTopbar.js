import React, { Component } from 'react';
import {InputText} from 'primereact/components/inputtext/InputText'
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class AppTopbar extends Component {

    static defaultProps = {
        activeTopbarItem: null,
        topbarMenuActive: null,
        onMenuButtonClick: null,
        onTopbarItemClick: null,
        onTopbarMenuClick: null,
        onTopbarMobileMenuButtonClick: null
    }

    static propTypes = {
        activeTopbarItem: PropTypes.string,
        topbarMenuActive: PropTypes.bool,
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        onTopbarMenuClick: PropTypes.func.isRequired,
        onTopbarMobileMenuButtonClick: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {};
    }

    onTopbarItemClick(event, item) {
        if(this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    render() {
        let topbarClass = classNames('topbar-menu fadeInDown',{'topbar-menu-active': this.props.topbarMenuActive})
        return (
            <div className="layout-topbar">
                <img alt="logo" src="assets/layout/images/logo-slim.png" className="mobile-logo"/>

                <a className="menu-btn" onClick={this.props.onMenuButtonClick}>
                    <i className="material-icons">&#xE5D2;</i>
                </a>

                <a className="topbar-menu-btn" onClick={this.props.onTopbarMobileMenuButtonClick}>
                    <i className="material-icons">&#xE853;</i>
                </a>

                <div className="layout-topbar-menu-wrapper">
                    <ul className={topbarClass} onClick={this.props.onTopbarMenuClick}>
                        <li  className={classNames('profile-item', {'active-topmenuitem': this.props.activeTopbarItem === 'profile'})}>
                            <a onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
                                <span className="profile-image-wrapper">
                                    <img src="assets/layout/images/avatar.png" alt="avatar"/>
                                </span>
                                <span className="topbar-item-name profile-name">Current User</span>
                            </a>
                            <ul className="fadeInDown">
                                <li role="menuitem">
                                    <a>
                                        <i className="material-icons">account_circle</i>
                                        <span>Profile</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a>
                                        <i className="material-icons">exit_to_app</i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}