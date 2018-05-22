class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      csvText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.csvCompiler = this.csvCompiler.bind(this)
  }
  handleChange(event) {
    this.setState({text: event.target.value})
  }
  handleKeyPress(event) {
    if (event.key === "Enter") {

    }
  }
  csvCompiler(json) {
    var storage = []
    function store(child) {
      var cache = []
      for (var key in child) {
        if (key !== 'children') cache.push(child[key])
      }
      storage.push(cache)
      var recurse = child.children
      recurse.forEach(item => {
        store(item)
      })
    }
    var parsed = JSON.parse(json)
    var children = parsed.children
    for (var property in parsed) {
      !storage[0] ? storage.push([property]) : storage[0].push(property)
      !storage[1] ? storage.push([parsed[property]]) : storage[1].push(parsed[property])
    }
    storage.forEach(item => {
      item.pop()
    })
    children.forEach(child => {
      store(child)
    })
    return storage.join('\n')
  }
  handleClick() {
    var input = document.getElementById('json-input')
    var result = this.csvCompiler(input.value)
    this.setState({text: result})
  }
  render() {
    return (
      <div>
        <span style={{'fontSize': '14pt'}}>put your JSON here^^^ for CSV</span>
        <button id="submit" onClick={this.handleClick} />
        <form id="my-form" onSubmit={function(e) { e.preventDefault() }}>
          <textarea value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress}>
          </textarea>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
