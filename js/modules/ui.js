//metoda pro vytvoření button
export function getButton(buttonClass, id, text, title) {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  if (text) {
    button.textContent = text
  }
  if (buttonClass) {
    button.classList.add(buttonClass)
  }
  if (id) {
    button.setAttribute('id', id)
  }
  if (title){
    button.setAttribute('title', title)
  }
  return button;
}

//metoda pro vytvoření input
export function getInput(type, placeHolder, id, width, value) {
  const input = document.createElement('input')
  if (type) {
    input.setAttribute('type', type)
  }
  if (placeHolder) {
    input.setAttribute('placeholder', placeHolder)
  }
  if (id) {
    input.setAttribute('id', id)
  }
  if (width) {
    input.style.width = width
  }
  if (value) {
    input.value = value;
  }
  return input
}

//metoda pro vytvoření div
export function getDiv(divClass, id) {
  const div = document.createElement('div')
  if (divClass) {
    div.classList.add(divClass)
  }
  if (id) {
    div.setAttribute('id', id)
  }
  return div;
}

//metoda pro vytvoření paragragu p
export function getP(id, text){
  const p = document.createElement('p')
  if (id){p.setAttribute('id', id)}
  if (text){p.textContent = text}
  return p;
}

