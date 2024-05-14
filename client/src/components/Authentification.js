import React from 'react';
import LogoutButton from './Logout';


class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        loginMode: 'login',
        role: 'user', // Default role is 'user'
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors: {},
      isLoggedIn: false // Track login status
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Parse the JSON data and update the component state
      this.setState({ input: JSON.parse(userData) });
    }
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({ input });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { loginMode, role, email, password } = this.state.input;

    // Check if loginMode is 'login' and user data exists in localStorage
    if (loginMode === 'login') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || userData.role !== role || userData.email !== email || userData.password !== password) {
        alert('Invalid email or password. Please retry or register first.');
        return;
      }
    }

    // Continue with form submission for valid cases
    if (this.validate()) {
      // Save user data to localStorage if it's a registration
      if (loginMode === 'register') {
        localStorage.setItem('userData', JSON.stringify(this.state.input));
      }

      // Display success message
      let successMessage = loginMode === 'register' ? 'Registration successful!' : 'Login successful!';
      alert(successMessage);

      // Set isLoggedIn to true after successful login
      this.setState({ isLoggedIn: true });
      // Reset the form
      this.resetForm();
    }
  }

  handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('userData');

    // Set isLoggedIn to false after logout
    this.setState({ isLoggedIn: false });
  }

  resetForm() {
    // Reset form fields to initial state
    this.setState({
      input: {
        loginMode: 'login',
        role: 'user',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors: {}
    });
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (input.loginMode === 'register' && !input["username"]) {
      isValid = false;
      errors["username"] = "Please enter your username.";
    }

    this.setState({ errors: errors });
    return isValid;
  }

  render() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-cyan-300 via-blue to-cyan-900 text-black">
        <div className='container w-full mx-auto px-4'>
          <h1 className='text-center text-3xl font-bold my-4'>{this.state.input.loginMode === 'register' ? 'Sign Up ' : 'Sign In '}</h1>
          <form onSubmit={this.handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor="role" className='block text-gray-700 text-sm font-bold mb-2'>ROLE:</label>
              <select
                name="role"
                value={this.state.input.role}
                onChange={this.handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {this.state.input.loginMode === 'register' && (
              <div className='mb-4'>
                <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>USERNAME:</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.input.username}
                  onChange={this.handleChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id="username"
                  placeholder='Enter username'
                />
                <p className='text-red-500 text-xs italic'>{this.state.errors.username}</p>
              </div>
            )}
            <div className='mb-6'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>EMAIL ADDRESS:</label>
              <input
                type="text"
                name="email"
                value={this.state.input.email}
                onChange={this.handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="email"
                placeholder='Enter Email'
              />
              <p className='text-red-500 text-xs italic'>{this.state.errors.email}</p>
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>PASSWORD:</label>
              <input
                type="password"
                name="password"
                value={this.state.input.password}
                onChange={this.handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id="password"
                placeholder='Enter password'
              />
              <p className='text-red-500 text-xs italic'>{this.state.errors.password}</p>
            </div>
            {this.state.input.loginMode === 'register' && (
              <div className='mb-6'>
                <label htmlFor="confirm-password" className='block text-gray-700 text-sm font-bold mb-2'>CONFIRM PASSWORD:</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={this.state.input.confirm_password}
                  onChange={this.handleChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id="confirm-password"
                  placeholder='Confirm password'
                />
                <p className='text-red-500 text-xs italic mb-3'>{this.state.errors.confirm_password}</p>
              </div>
            )}
            <input
              type="submit"
              value={this.state.input.loginMode === 'register' ? 'REGISTER' : 'LOGIN'}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            />
            <button
              type="button"
              onClick={() => this.setState({ input: { ...this.state.input, loginMode: this.state.input.loginMode === 'register' ? 'login' : 'register' } })}
              className="text-blue-500 hover:text-blue-800 underline py-2"
            >
              {this.state.input.loginMode === 'register' ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
            {this.state.isLoggedIn && (
              <div className="mt-4">
                <LogoutButton
                  onLogout={this.handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
