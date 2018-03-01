function setupDragZone (zoneElement, dropZone) {
  let draggingElement
  let offsetX
  let offsetY

  function startDrag (event) {
    event.preventDefault()
    offsetX = event.offsetX
    offsetY = event.offsetY

    if (event.target.matches('.draggable-item')) {
      draggingElement = event.target
      document.addEventListener('mousemove', doDrag)
      document.addEventListener('mouseup', endDrag)
    }

    if (event.shiftKey) {
      draggingElement.classList.add('shifted')
    }
    else {
      draggingElement.classList.remove('shifted')
    }
  }

  function doDrag (event) {
    draggingElement.style.left = event.clientX - offsetX + 'px'
    draggingElement.style.top = event.clientY - offsetY + 'px'

    const dragRect = draggingElement.getBoundingClientRect()
    const dropRect = dropZone.getBoundingClientRect()

    if (
      dragRect.top >= dropRect.top &&
      dragRect.left >= dropRect.left &&
      dragRect.bottom <= dropRect.bottom &&
      dragRect.right <= dropRect.right
    ) {
      draggingElement.classList.add('in-the-zone')
    }
    else {
      draggingElement.classList.remove('in-the-zone')
    }
  }

  function endDrag (event) {
    document.removeEventListener('mousemove', doDrag)
    document.removeEventListener('mouseup', endDrag)
    draggingElement.classList.remove('shifted')
  }

  zoneElement.addEventListener('mousedown', startDrag)
}

setupDragZone(document, document.getElementById('drop-zone'))
