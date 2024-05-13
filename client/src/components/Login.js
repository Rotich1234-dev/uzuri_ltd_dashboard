import React from 'react';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        loginMode: 'login',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({ input });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      let input = { username: "", email: "", password: "", confirm_password: "" };
      this.setState({ input: input });

      let successMessage = this.state.input.loginMode === 'register' ? 'Registration successful!' : 'Login successful!';
      alert(successMessage);
    }
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b
      from-cyan-300
      via-blue to-cyan-900 text-black">
        <div className='container mx-auto px-4'>
          <h1 className='text-center text-3xl font-bold my-4'>{this.state.input.loginMode === 'register' ? 'REGISTRATION FORM' : 'LOGIN FORM'}</h1>
          <form onSubmit={this.handleSubmit} className='bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4'>
            {this.state.input.loginMode === 'register' && (
              <div>
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
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
