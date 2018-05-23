class CompleteOrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return(
      <div style={this.props.styles}>
        <br />
        <p>Thanks for your order!</p>
        <p>We will begin processing it shortly. If you have any questions about your order, please contact us.</p>
        <p>-MGMT</p>
      </div>
    )
  }
}

class CardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      cvv: '',
      date: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    var json = {
      number: this.state.number,
      cvv: this.state.cvv,
      date: this.state.date
    }
    console.log(json)
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    e.target.style.display = 'none'
    this.props.showNext()
  }
  handleNumber(e) {
    var parsed = JSON.parse(e.target.value)
    this.setState({number: parsed})
  }
  handleCvv(e) {
    var parsed = JSON.parse(e.target.value)
    this.setState({cvv: parsed})
  }
  handleDate(e) {
    var parsed = JSON.parse(e.target.value)
    this.setState({date: parsed})
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.styles}>
        <p>Card Number</p>
        <input type="text" onChange={this.handleNumber.bind(this)} />
        <p>CVV</p>
        <input type="text" onChange={this.handleCvv.bind(this)} />
        <p>Expiry Date</p>
        <input type="text" onChange={this.handleDate.bind(this)} />
        <input type="submit" />
      </form>
    )
  }
}

class ShippingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    var json = {
      name: this.state.name,
      address: this.state.address1 + ', ' + this.state.address2 + ', ' + this.state.city + ', ' + this.state.state,
      zip: this.state.zip
    }
    console.log(json)
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    e.target.style.display = 'none'
    this.props.showNext()
  }
  handleName(e) {
    this.setState({name: e.target.value})
  }
  handleAddress1(e) {
    this.setState({address1: e.target.value})
  }
  handleAddress2(e) {
    this.setState({address2: e.target.value})
  }
  handleCity(e) {
    this.setState({city: e.target.value})
  }
  handleState(e) {
    this.setState({state: e.target.value})
  }
  handleZip(e) {
    this.setState({zip: e.target.value})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.styles}>
        <p>Name</p>
        <input type="text" onChange={this.handleName.bind(this)}/>
        <p>Address Line 1</p>
        <input type="text" onChange={this.handleAddress1.bind(this)} />
        <p>Address Line 2</p>
        <input type="text" onChange={this.handleAddress2.bind(this)} />
        <p>City</p>
        <input type="text" onChange={this.handleCity.bind(this)} />
        <p>State</p>
        <input type="text" onChange={this.handleState.bind(this)} />
        <p>ZIP</p>
        <input type="text" onChange={this.handleZip.bind(this)} />
        <input type="submit" />
      </form>
    )
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleSubmit(e) {
    e.preventDefault()
    var json = {
      name: this.state.firstname + ' ' + this.state.lastname,
      email: this.state.email,
      password: this.state.password
    }
    console.log(json)
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    e.target.style.display = 'none'
    this.props.showNext()
  }
  handleFirstName(e) {
    this.setState({firstname: e.target.value})
  }
  handleLastName(e) {
    this.setState({lastname: e.target.value})
  }
  handleEmail(e) {
    this.setState({email: e.target.value})
  }
  handlePassword(e) {
    this.setState({password: e.target.value})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>First Name</p>
        <input type="text" onChange={this.handleFirstName.bind(this)}/>
        <p>Last Name</p>
        <input type="text" onChange={this.handleLastName.bind(this)}/>
        <p>Email</p>
        <input type="text" onChange={this.handleEmail.bind(this)}/>
        <p>Password</p>
        <input type="password" onChange={this.handlePassword.bind(this)}/>
        <input type="submit" />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: {
        display: 'block',
        right: '-999px'
      },
      shippingFormStyles: {
        display: 'none'
      },
      cardFormStyles: {
        display: 'none'
      },
      completeFormStyles: {
        display: 'none'
      }
    }
    this.beginCheckout = this.beginCheckout.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  beginCheckout() {
    this.setState({styles: {right: '0'}})
  }
  closeModal() {
    this.setState({styles: {display: 'none'}})
  }
  next() {
    this.setState({shippingFormStyles: {display: 'block'}})
  }
  next2() {
    this.setState({cardFormStyles: {display: 'block'}})
  }
  next3() {
    this.setState({completeFormStyles: {display: 'block'}})
  }
  render() {
    return (
      <div>
        <input onClick={this.beginCheckout} type="submit" value="Checkout" />
        <div id="pop-up" style={this.state.styles}>
          <span onClick={this.closeModal} id="close-pop-up">&#10005;</span>
          <span>Checkout</span>
          <h5>Customer Information > Credit Card Information > Complete Order</h5>
          <RegisterForm showNext={this.next.bind(this)}/>
          <ShippingForm showNext={this.next2.bind(this)} styles={this.state.shippingFormStyles}/>
          <CardForm showNext={this.next3.bind(this)} styles={this.state.cardFormStyles}/>
          <CompleteOrderForm styles={this.state.completeFormStyles} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
