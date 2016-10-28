(() => {
  const newAskForm = document.querySelector('.ask-form')
  const askEl = document.getElementById('ask')
  const askeeEl = document.getElementById('askee')
  const acceptedButton = document.getElementById('accepted')
  const rejectedButton = document.getElementById('rejected')
  let askListEl = document.querySelector('.ask-list')
  let scoreEl = document.querySelector('.current-score')

  let askList = (() => {
    let list = JSON.parse(localStorage.getItem('askList')) || []

    const saveList = () => {
      localStorage.setItem('askList', JSON.stringify(list))
    }

    const getList = () => {
      list.forEach(ask => appendNewAskToDOM(ask))
    }

    const appendNewAskToDOM = (ask) => {
      let newListEl = document.createElement('li')
      newListEl.innerHTML = JSON.stringify(ask, null, 2)
      newAskForm.reset()
      askListEl.appendChild(newListEl)
    }

    const getScore = () => {
      return list.reduce((total, ask) => {
        if (ask.status === 'accepted') {
          return total + 1
        }
        if (ask.status === 'rejected') {
          return total + 10
        }
      }, 0)
    }

    const setScore = () => {
      scoreEl.innerHTML = getScore()
    }

    const newAsk = (status) => {
      const ask = {
        timestamp: Date.now(),
        ask: askEl.value,
        askee: askeeEl.value,
        status
      }

      list.push(ask)
      appendNewAskToDOM(ask)
      setScore()
      saveList()

      return ask
    }

    return {
      newAsk,
      setScore,
      getList
    }
  })()

  askList.getList()
  askList.setScore()

  acceptedButton.addEventListener('click', (e) => {
    e.preventDefault()
    askList.newAsk('accepted')
  })

  rejectedButton.addEventListener('click', (e) => {
    e.preventDefault()
    askList.newAsk('rejected')
  })
})()
