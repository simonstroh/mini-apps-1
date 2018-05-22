var game = {
  player: 'player1',
  renderPiece: function() {
    if (this.player === 'player1') return 'player2-piece.svg'
    else return 'player1-piece.svg'
  },
  moves: 0,
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  move: function() {
    this.player === 'player1' ? this.player = 'player2' : this.player = 'player1'
  },
  resetBoard: function(rowIndex, columnIndex) {
    this.moves++
    this.player === 'player1' ? this.board[rowIndex][columnIndex] = 1 : this.board[rowIndex][columnIndex] = 2
    var test = this.checkBoard()
    if (test) {
      this.end()
    }
    this.move()
  },
  checkBoard: function() {
    var checking
    var columnIndex = 0
    var results = false
    this.player === 'player1' ? checking = 1 : checking = 2
    var rowOneColumnIndex = this.board[0].indexOf(checking)
    if (rowOneColumnIndex === 0) {
      let count = 0
      this.board.forEach((row, index) => {
        if (row[columnIndex] === checking) {
          count++
          if (count === this.board[0].length) results = true
        }
        columnIndex++
      })
    } else if (rowOneColumnIndex === this.board[0].length - 1) {
      columnIndex = rowOneColumnIndex
      let count = 0
      this.board.forEach((row, index) => {
        if (row[columnIndex] === checking) {
          count++
          if (count === this.board[0].length) results = true
        }
        columnIndex--
      })
    }
    if (rowOneColumnIndex !== -1) {
      let count = 0
      this.board.forEach((row, index) => {
        if (row[rowOneColumnIndex] === checking) {
          count++
          if (count === this.board[0].length) results = true
        }
      })
    }
    if (this.board[0][this.board.length - 1] === checking) {
      columnIndex = this.board.length - 1
      let count = 0
      this.board.forEach((row, index) => {
        if (row[columnIndex] === checking) {
          count++
          if (count === this.board[0].length) results = true
        }
        columnIndex--
      })
    }
    this.board.forEach(row => {
      if (row.every(n => n === checking)) results = true
    })
    return results
  },
  end: function() {
    var el = document.createElement('span')
    el.innerHTML = this.player + ' beat you in ' + Math.round(this.moves / 2) + ' moves!'
    var a = document.createElement('a')
    a.innerHTML = '> play again'
    a.setAttribute('id', 'reset')
    a.onclick = function() {
      var table = Array.from(document.getElementsByTagName('tr'))
      table.forEach(row => {
        var children = Array.from(row.children)
        children.forEach(column => {
          column.style.backgroundImage = 'none'
        })
      })
      document.getElementById('container').style.backgroundImage = 'none'
      document.getElementById('reset').remove()
      game.player === 'player1' ? game.player = 'player2' : game.player = 'player1'
      game.moves = 0
      game.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }
    document.body.appendChild(el)
    document.body.appendChild(a)
    document.getElementById('container').style.backgroundImage = "url('https://i.stack.imgur.com/0kVU5.gif')"
    document.getElementById('container').style.backgroundSize = '100%'
  }
}

document.getElementById('app').addEventListener('click', function(event) {
  var target = event.target
  var url = game.renderPiece()
  var location = target.id.split('')
  game.resetBoard(location[0], location[1])
  target.innerHTML = 1
  target.style.backgroundImage = `url(${url})`
  target.style.backgroundSize = '100%'
})
