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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumber = this.handleNumber.bind(this)
    this.handleCvv = this.handleCvv.bind(this)
    this.handleDate = this.handleDate.bind(this)
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
      <form onSubmit={this.handleSubmit} style={this.props.styles}>
        <p>Card Number</p>
        <input type="text" onChange={this.handleNumber} />
        <p>CVV</p>
        <input type="text" onChange={this.handleCvv} />
        <p>Expiry Date</p>
        <input type="text" onChange={this.handleDate} />
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleAddress1 = this.handleAddress1.bind(this)
    this.handleAddress2 = this.handleAddress2.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleState = this.handleState.bind(this)
    this.handleZip = this.handleZip.bind(this)
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
      <form onSubmit={this.handleSubmit} style={this.props.styles}>
        <p>Name</p>
        <input type="text" onChange={this.handleName}/>
        <p>Address Line 1</p>
        <input type="text" onChange={this.handleAddress1} />
        <p>Address Line 2</p>
        <input type="text" onChange={this.handleAddress2} />
        <p>City</p>
        <input type="text" onChange={this.handleCity} />
        <p>State</p>
        <input type="text" onChange={this.handleState} />
        <p>ZIP</p>
        <input type="text" onChange={this.handleZip} />
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFirstName = this.handleFirstName.bind(this)
    this.handleLastName = this.handleLastName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
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
      <form onSubmit={this.handleSubmit}>
        <p>First Name</p>
        <input type="text" onChange={this.handleFirstName}/>
        <p>Last Name</p>
        <input type="text" onChange={this.handleLastName}/>
        <p>Email</p>
        <input type="text" onChange={this.handleEmail}/>
        <p>Password</p>
        <input type="password" onChange={this.handlePassword}/>
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
    this.next = this.next.bind(this)
    this.next2 = this.next2.bind(this)
    this.next3 = this.next3.bind(this)
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
          <RegisterForm showNext={this.next}/>
          <ShippingForm showNext={this.next2} styles={this.state.shippingFormStyles}/>
          <CardForm showNext={this.next3} styles={this.state.cardFormStyles}/>
          <CompleteOrderForm styles={this.state.completeFormStyles} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
