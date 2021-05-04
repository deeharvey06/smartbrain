import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }
  }

  onProfileUpdate = (data) => {
    const { toggleModal, loadUser, user } = this.props;
    fetch(`http://localhost:3000/profile/${user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        formInput: data
      })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        toggleModal();
        loadUser({ ...user, ...data });
      }
    }).catch(console.log)
  }

  onFormChange = (event) => {
    const { name, value } = event.target

    this.setState({ [name]: value });
  }

  render() {
    const { toggleModal, user } = this.props
    const { name, age, pet } = this.state;

    return (
      <div className='profile-modal'>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
          <main className='pa4 black-80 w-80'>
            <img
              src='http://tachyons.io/img/logo.jpg'
              className='h3 w3 dib' alt='avatar'
            />
            <h1>{name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />

            <label className='mt2 fw6' htmlFor='name'>Name:</label>
            <input
              onChange={this.onFormChange}
              type='text'
              name='name'
              value={name}
              className='pa2 ba w-100'
              laceholder={name}
            >
            </input>

            <label className='mt2 fw6' htmlFor='age'>Age:</label>
            <input
              onChange={this.onFormChange}
              type='text'
              name='age'
              value={age}
              className='pa2 ba w-100'
              placeholder={age}
            >
            </input>

            <label className='mt2 fw6' htmlFor='pet'>Favourite Pet:</label>
            <input
              onChange={this.onFormChange}
              type='text'
              name='pet'
              value={pet}
              className='pa2 ba w-100'
              placeholder={pet}
            >
            </input>

            <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                onClick={() => this.onProfileUpdate({name, age, pet})}>
                Save
              </button>
              <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={toggleModal}>
                Cancel
              </button>
            </div>

          </main>
          <div className='modal-close' onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  };
};

export default Profile;