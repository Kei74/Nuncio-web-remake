const eventElement = document.getElementById('event')
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
let currEvent = 0

function startGame() {
  state = {testv: 5, Taverntalk: 0, Secrets: 0, Office: 0, Rat: 0, hair: false}
  showTextNode('Docks')
}

function showTextNode(textNodeIndex) {
  currEvent = textNodeIndex
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  if (textNode.event!=null) {
    eventElement.innerText = textNode.event
  }
  while (textElement.firstChild) {
    textElement.removeChild(textElement.firstChild)
  }
  if(textNode.btxt!=null) {
    const btxt = document.createElement('div')
    btxt.innerText = textNode.btxt
    btxt.id = 'btxt'
    textElement.appendChild(btxt)
  }
  const ntxt = document.createElement('div')
  ntxt.innerText = textNode.text
  ntxt.id = 'ntxt'
  textElement.appendChild(ntxt)
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const obtxt = document.createElement('div')
      obtxt.innerText = option.btxt
      obtxt.classList.add('obtxt')
      optionButtonsElement.appendChild(obtxt)
      const otxt = document.createElement('div')
      otxt.innerText = option.txt
      optionButtonsElement.appendChild(otxt)
      const button = document.createElement('button')
      if(option.bstxt != null)
        button.innerText = 'Proceed'
      else
        button.innerText = 'Go Back'
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  if(option.deleted)
    return
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  let nextTextNodeId
  if (option.nextText != null) {
    nextTextNodeId = option.nextText
  }
  else {
    nextTextNodeId = currEvent
  }

  if(option.bstxt == null)
    return showTextNode(nextTextNodeId)

  while (textElement.firstChild) {
    textElement.removeChild(textElement.firstChild)
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  const btxt = document.createElement('div')
  btxt.innerText = option.btxt
  btxt.id = 'btxt'
  textElement.appendChild(btxt)
  const ntxt = document.createElement('div')
  ntxt.innerText = option.txt
  ntxt.id = 'ntxt'
  textElement.appendChild(ntxt)

  const obtxt = document.createElement('div')
  obtxt.innerText = option.bstxt
  obtxt.classList.add('obtxt')
  optionButtonsElement.appendChild(obtxt)
  const otxt = document.createElement('div')
  otxt.innerText = option.stxt
  optionButtonsElement.appendChild(otxt)

  if(typeof option.setState === "function")
  option.setState(state)

  const button = document.createElement('button')
  button.innerText = 'Continue'
  button.classList.add('btn')
  button.addEventListener('click', () => showTextNode(nextTextNodeId))
  optionButtonsElement.appendChild(button)
  
  if(!option.repeatable)
    option.deleted = true
}

startGame()