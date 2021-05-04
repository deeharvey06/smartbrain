import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { dropdownOpen } = this.state;
    const { toggleModal, onRouteChange } = this.props;
    const menuStyle = { marginLeft: '-6rem', backgroundColor: 'rgba(255, 255, 255, 0.5)' };

    return (
      <div className="pa4 tc">
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle} drop='left'>
          <DropdownToggle
            tag="span"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 h3 w3 dib" alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu right className='b--transparent shadow-5' style={menuStyle} >
            <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
            <DropdownItem onClick={() => onRouteChange('signout')}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;