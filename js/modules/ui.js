export function getButton(buttonClass, id, text){
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  if (text){button.textContent = text}
  if (buttonClass){button.classList.add(buttonClass)}
  if (id){button.setAttribute('id', id)}
  return button;
}

export function getInput(type, placeHolder, id, width){
  const input = document.createElement('input')
  if (type){input.setAttribute('type', type)}
  if (placeHolder){input.setAttribute('placeholder', placeHolder)}
  if (id){input.setAttribute('id', id)}
  if (width){input.style.width = width}
  return input
}

export function getDiv(divClass, id){
  const div = document.createElement('div')
  if (divClass){div.classList.add(divClass)}
  if (id){div.setAttribute('id', id)}
  return div;
}



