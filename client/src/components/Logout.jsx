import React from 'react';

class LogoutButton extends React.Component {
  handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');

    // Display logout message
    alert('Logout successful!');

    // Redirect to login page
    window.location.href = '/login'; // Redirect using window.location.href
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.handleLogout}
        className="text-red-500 hover:text-red-800 underline py-2"
      >
        Logout
      </button>
    );
  }
}

export default LogoutButton;
