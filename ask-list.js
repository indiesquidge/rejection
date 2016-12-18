(() => {
  const newAskForm = document.querySelector('.ask-form')
  const askInput = document.getElementById('ask')
  const askeeInput = document.getElementById('askee')
  const acceptedButton = document.getElementById('accepted')
  const rejectedButton = document.getElementById('rejected')
  const askListEl = document.querySelector('.ask-list')
  const scoreEl = document.querySelector('.current-score')

  const myAskList = askList()
  myAskList.renderListAndScore()

  acceptedButton.addEventListener('click', (e) => {
    if (askInput.validity.valid && askeeInput.validity.valid) {
      e.preventDefault()
      myAskList.newAsk('accepted')
    }
  })

  rejectedButton.addEventListener('click', (e) => {
    if (askInput.validity.valid && askeeInput.validity.valid) {
      e.preventDefault()
      myAskList.newAsk('rejected')
    }
  })

  function askList() {
    let list = JSON.parse(localStorage.getItem('askList')) || []

    const saveList = () => {
      localStorage.setItem('askList', JSON.stringify(list))
    }

    const renderListAndScore = () => {
      const listElements = list.map(convertToElement).join('')
      askListEl.innerHTML = listElements
      renderScore()
      newAskForm.reset()
    }

    const convertToElement = ask => {
      return `<li class="ask">
                <h4>${ask.status}</h4>
                <p>${ask.ask}</p>
                <p>${ask.askee}</p>
                <p>${ask.timestamp}</p>
              </li>`
    }

    const renderScore = () => {
      const scoreTotal = list.reduce((total, ask) => {
        if (ask.status === 'accepted') return total + 1
        if (ask.status === 'rejected') return total + 10
      }, 0)

      scoreEl.innerHTML = scoreTotal
    }

    const newAsk = status => {
      const ask = {
        timestamp: currentDateAndTime(),
        ask: askInput.value,
        askee: askeeInput.value,
        status
      }

      list.push(ask)
      saveList()
      renderListAndScore()

      return ask
    }

    // create timestamp
    const currentDateAndTime = () => {
      const newDate = new Date()
      newDate.setTime(Date.now())
      const date = newDate.toLocaleDateString()
      const time = currentTime(newDate)
      return `${time}, ${date}`
    }

    const currentTime = dateObj => {
      return (
        ((dateObj.getHours() < 10) ? '0' : '') +
        dateObj.getHours() +
        ':' +
        ((dateObj.getMinutes() < 10) ? '0' : '') +
        dateObj.getMinutes()
      )
    }

    // public methods
    return {
      newAsk,
      renderListAndScore
    }
  }
})()
