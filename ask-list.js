(() => {
  const newAskForm = document.querySelector('.ask-form')
  const askInput = document.getElementById('ask')
  const askeeInput = document.getElementById('askee')
  const acceptedButton = document.getElementById('accepted')
  const rejectedButton = document.getElementById('rejected')
  const askListEl = document.querySelector('.ask-list')
  const scoreEl = document.querySelector('.current-score')

  const myAskList = askList()
  myAskList.render()

  acceptedButton.addEventListener('click', (e) => {
    if (askInput.validity.valid && askeeInput.validity.valid) {
      e.preventDefault()
      myAskList.newAsk('accepted')
    }
  })

  askInput.addEventListener('keyup', (e) => {
    acceptedButton.disabled = !askInput.validity.valid
    rejectedButton.disabled = !askInput.validity.valid
  })

  rejectedButton.addEventListener('click', (e) => {
    if (askInput.validity.valid && askeeInput.validity.valid) {
      e.preventDefault()
      myAskList.newAsk('rejected')
    }
  })

  function askList () {
    let list = getList() || []

    function render () {
      const listElements = list.map(convertToElement).join('')
      askListEl.innerHTML = listElements
      renderScore()
      newAskForm.reset()
    }

    function convertToElement (ask) {
      const { status, description, askee, timestamp } = ask

      return `<li class="ask">
                <h4>${status}</h4>
                <p>${description}</p>
                <p>${askee}</p>
                <p>${timestamp}</p>
              </li>`
    }

    function renderScore () {
      const scoreTotal = list.reduce((total, ask) => {
        if (ask.status === 'accepted') return total + 1
        if (ask.status === 'rejected') return total + 10
      }, 0)

      scoreEl.innerHTML = scoreTotal
    }

    function newAsk (status) {
      const ask = {
        timestamp: currentDateAndTime(),
        description: askInput.value,
        askee: askeeInput.value,
        status
      }

      list.push(ask)
      saveList()
      render()

      return ask
    }

    function getList () {
      try {
        const serializedList = window.localStorage.getItem('askList')
        if (serializedList === null) return undefined

        return JSON.parse(serializedList)
      } catch (err) {
        return undefined
      }
    }

    function saveList () {
      try {
        const serializedList = JSON.stringify(list)
        window.localStorage.setItem('askList', serializedList)
      } catch (err) {
        // Ignore write errors if localStorage does not exist
      }
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
      render
    }
  }
})()
