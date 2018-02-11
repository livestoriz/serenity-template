import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AppSubmenu extends Component {

    static defaultProps = {
        className: null,
        items: null,
        root: false
    }

    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.array,
        root: PropTypes.bool
    }
    
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null
        };
    }

    onMenuItemClick(event, item, index) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        //prevent hash change
        if(item.items || !item.url) {
            event.preventDefault();
        }

        if(index === this.state.activeIndex)
            this.setState({activeIndex: null});
        else
            this.setState({activeIndex: index});
    }


    render() {
        var items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active});
            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
            let submenuIcon = item.items && <i className="material-icons layout-submenu-toggler">keyboard_arrow_down</i>;

            return <li className={styleClass} key={i}>
                <a className="ripplelink" href={item.url||'#'} onClick={(e) => this.onMenuItemClick(e, item, i)} target={item.target}>
                    <i className="material-icons">{item.icon}</i>
                    <span className="menuitem-text">{item.label}</span>
                    {submenuIcon}
                    {badge}
                </a>
                <AppSubmenu items={item.items} onMenuItemClick={this.props.onMenuItemClick}  />
            </li>
        });

        return <ul className={this.props.className}>{items}</ul>;

    }
}

export class AppMenu extends Component {

    static defaultProps = {
        model: null
    }

    static propTypes = {
        model: PropTypes.array
    }

    render() {

        return (
            <AppSubmenu items={this.props.model} className="layout-menu" root={true}/>
        );
    }
}