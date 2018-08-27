const { ipcRenderer } = require('electron')
const $ = require('jquery')

// Get data about key press from main process
ipcRenderer.on('keydown', (event, props) => {
    // Set css on HTML with jQuery
    $('.' + props.event.keycode).css('background', 'rgb(47, 71, 180)')
})
ipcRenderer.on('keyup', (event, props) => {
    // Set css on HTML with jQuery
    $('.' + props.event.keycode).css('background', 'black')
})

// Disable F5 and TAB for reasons
function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault() }
function disableTAB(e) { if ((e.which || e.keyCode) == 9) e.preventDefault() }
$(document).bind("keydown", disableF5)
$(document).on("keydown", disableF5)
$(document).bind("keydown", disableTAB)
$(document).on("keydown", disableTAB)