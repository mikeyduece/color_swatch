import './stylesheets/styles.scss'
import COLORS from './data/colors'
const $ = require('jquery')
const api = 'https://color-swatch-api.herokuapp.com/'

$(document).ready(() => {
  topColor()
  getColors()
})

const topColor = () => {
  $.get(`${api}api/v1/top_color`, data => {
    $('span.top-color').append(`${data.value} - ${data.color_count}`)
  })
}

const getColors = () => {
  $('section.text-submission').on('click', 'button', () => {
    let text = $('textarea').val().toLowerCase().split(' ')
    let colorNames = Object.keys(COLORS)
    let matches = []
    $.each(text, (i,color) => {
      if(colorNames.includes(color)){
        matches.push(color)
      }
    })
  })
}
