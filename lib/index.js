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
    let text = $('textarea').val().toLowerCase().replace(/[,. ]+/g, " ").trim().split(' ')
    let unique = Array.from(new Set(text))
    let colorNames = Object.keys(COLORS)
    postColors(text, colorNames)
    $.each(unique, (i,color) => {
      if(colorNames.includes(color)){
        $('article.colorized-text').append(`<div class="swatch" style="background-color:${COLORS[color]};"></div>`)
      }
    })
  })
}

const postColors = (text, colorNames)=> {
  let matches = []
  $.each(text, (i, color) => {
    if(colorNames.includes(color)){
      $.post(`${api}api/v1/colors`, {color: {value: `${color}`}})
    }
  })
}
