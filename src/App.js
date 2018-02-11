import React, { Component } from 'react';
import classNames from 'classnames';
import 'nanoscroller';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import 'primereact/resources/primereact.min.css';
import 'nanoscroller/bin/css/nanoscroller.css';
import 'fullcalendar/dist/fullcalendar.css';
import jQuery from 'jquery';
import { AppBreadcrumb } from "./AppBreadcrumb";
import { Route } from 'react-router-dom';
import DomHandler from 'primereact/components/utils/DomHandler';
import { withRouter } from 'react-router';
import './ripple.js';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            activeTopbarItem: null,
            sidebarActive: null,
            layoutStatic: false,
            mobileMenuActive: null,
            topbarMenuActive: null,
            currentRoute: null
        };

        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMobileMenuButtonClick = this.onTopbarMobileMenuButtonClick.bind(this);
        this.onTopbarMenuClick = this.onTopbarMenuClick.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onSidebarMouseEnter = this.onSidebarMouseEnter.bind(this);
        this.onSidebarMouseLeave = this.onSidebarMouseLeave.bind(this);
        this.onToggleMenuClick = this.onToggleMenuClick.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.createMenu();
    }

    componentDidMount() {
        jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    }

    onWrapperClick(event) {
        if (!this.menuClick && !this.menuButtonClick && this.state.mobileMenuActive) {
            this.setState({mobileMenuActive: false});
        }

        if (!this.topbarMenuClick && !this.topbarMenuButtonClick && this.state.activeTopbarItem) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        this.menuClick = false;
        this.menuButtonClick = false;
        this.topbarMenuClick = false;
        this.topbarMenuButtonClick = false;
    }

    onTopbarItemClick(event) {
        if (this.state.activeTopbarItem === event.item)
            this.setState({activeTopbarItem: null});
        else
            this.setState({activeTopbarItem: event.item});

    }

    onMenuButtonClick(event) {
        this.menuButtonClick = true;

        if (this.isMobile()) {
            this.setState({mobileMenuActive: !this.state.mobileMenuActive});
        }

        event.preventDefault();
    }

    onTopbarMobileMenuButtonClick(event) {
        this.topbarMenuButtonClick = true;
        this.setState({topbarMenuActive: !this.state.topbarMenuActive});
        event.preventDefault();
    }

    onTopbarMenuClick(event) {
        this.topbarMenuClick = true;
    }

    onToggleMenuClick(event) {
        this.setState({layoutStatic: !this.state.layoutStatic})
    }

    onSidebarClick(event) {
        this.menuClick = true;
        setTimeout(() => jQuery(this.layoutMenuScroller).nanoScroller(), 500);
    }

    onSidebarMouseEnter(event) {
        if (this.sidebarTimeout) {
            clearTimeout(this.sidebarTimeout);
        }
        DomHandler.addClass(this.sidebar, 'layout-sidebar-active');
    }

    onSidebarMouseLeave(event) {
        this.sidebarTimeout = setTimeout(() => {
            DomHandler.removeClass(this.sidebar, 'layout-sidebar-active');
        }, 250);
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'dashboard', command:()=>{ window.location = "#/"}}
        ];
    }

    changeTheme(theme) {
        this.changeStyleSheetUrl('theme-css', theme, 'theme');
    }

    changeLayout(theme) {
        this.changeStyleSheetUrl('layout-css', theme, 'layout');
    }

    changeStyleSheetUrl(id, value, prefix) {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');
        element.setAttribute('href', newURL);
    }

    isMobile() {
        return window.innerWidth < 640;
    }

    render() {
        let wrapperClass = classNames('layout-wrapper', {
                                        'layout-wrapper-static': this.state.layoutStatic,
                                        'layout-wrapper-active': this.state.mobileMenuActive
                                    });
        let sidebarClassName = classNames("layout-sidebar",{'layout-sidebar-dark': this.state.darkMenu});
        const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}
                    onMouseEnter={this.onSidebarMouseEnter} onMouseLeave={this.onSidebarMouseLeave}>

                    <div className="sidebar-logo">
                        <a>
                            <img alt="logo" src="assets/layout/images/logo-slim.png" />
                            <span className="app-name">SERENITY</span>
                        </a>
                        <a className="sidebar-anchor" title="Toggle Menu" onClick={this.onToggleMenuClick}> </a>
                    </div>

                    <div ref={(el) => this.layoutMenuScroller = el} className="nano">
                        <div className="nano-content sidebar-scroll-content">
                            <div className="layout-menu-container" >
                                <AppMenu model={this.menu} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout-main">
                    <AppTopbar activeTopbarItem={this.state.activeTopbarItem} onTopbarItemClick={this.onTopbarItemClick}
                               onMenuButtonClick={this.onMenuButtonClick} onTopbarMobileMenuButtonClick={this.onTopbarMobileMenuButtonClick}
                               onTopbarMenuClick={this.onTopbarMenuClick} topbarMenuActive={this.state.topbarMenuActive}/>

                    <AppBreadCrumbWithRouter />
                
                    <div className="layout-content">
                    </div>

                    <AppFooter />

                    {this.state.mobileMenuActive && <div className="layout-main-mask"></div>}
                </div>
            </div>
        );
  }
}

export default App;
