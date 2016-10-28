const askEl = document.getElementById('ask')
const acceptedButton = document.getElementById('accepted')
const rejectedButton = document.getElementById('rejected')
let askListEl = document.querySelector('.ask-list')

let askList = (() => {
  let list = []

  const appendNewAskToDOM = (ask) => {
    let newListEl = document.createElement('li')
    newListEl.innerHTML = JSON.stringify(ask, null, 2)
    askListEl.appendChild(newListEl)
  }

  const newAsk = (status) => {
    const ask = {
      timestamp: Date.now(),
      ask: askEl.value,
      askee: askEl.value,
      status
    }

    list.push(ask)
    appendNewAskToDOM(ask)

    return ask
  }

  return {
    newAsk
  }
})()

acceptedButton.addEventListener('click', (e) => {
  e.preventDefault()
  askList.newAsk('accepted')
})

rejectedButton.addEventListener('click', (e) => {
  e.preventDefault()
  askList.newAsk('rejected')
})
