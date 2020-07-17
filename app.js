var header = document.getElementById("top-menu")
var btns = header.querySelectorAll("li a")


var months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember"]
var main = document.getElementById("content")
const alerting = (paraminput,paramvalue)=>{
  var d = new Date()
  var minutes
  let fullDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} / ${d.getHours()<10?'0':''}${d.getHours()}:${d.getMinutes()<10?'0':''}${d.getMinutes()}`
  let article = document.createElement("article")
  let div_alert =  document.createElement("div")
  div_alert.appendChild(document.createTextNode("Information"))
  div_alert.className += "alert"
  article.appendChild(div_alert)
  let div_info =  document.createElement("div")
  let list =  ["item-article key","item-article sep","item-article val"]
  let list2 = [["Date/Time","Parameter","Value","Operator"],[":",":",":",":"],[fullDate,paraminput,paramvalue,"Alvin Mantovani"]]
  let i = 0
  list.forEach(a => {
    let div_item =  document.createElement("div")
    list2[i].forEach(e => {
      div = document.createElement("div")
      div.innerHTML = e
      div_item.appendChild(div)
    })
    i +=1
    div_item.className += a
    div_info.appendChild(div_item)
  })
  div_info.className += "info"
  article.appendChild(div_info)
  main.appendChild(article)
}

const generate = () =>{
  currentPH = Math.floor(Math.random() * (parseInt(maxPH) - (maxPH*20/100)) + 1) + 1
  currentTemp = Math.floor(Math.random() * (parseInt(maxTemp) - (maxTemp*20/100)) + 1) + 5
  currentPower = Math.floor(Math.random() * (parseInt(maxPower) - (maxPower*20/100)) + 1) + 10
  currentWater = Math.floor(Math.random() * (parseInt(maxWater) - (maxWater*20/100)) + 1) + 50
  
  document.querySelector('.param-value.ph-level').innerHTML = `${currentPH}/${maxPH}`
  setLevel(currentPH,maxPH,'ph-level')

  document.querySelector('.param-value.temperature').innerHTML = `${currentTemp}/${maxTemp}`
  setLevel(currentTemp,maxTemp,'temperature')

  document.querySelector('.param-value.power-level').innerHTML = `${currentPower}/${maxPower}`
  setLevel(currentPower,maxPower,'power-level')

  document.querySelector('.param-value.water-level').innerHTML = `${currentWater}/${maxWater}`
  setLevel(currentWater,maxWater,'water-level')

  currentPH < 5.5
    ? alerting("<b><a style='color:#a19173'>PH Level</a></b>",`<a><strong>${currentPH}</strong> PH Level too <b style='color:blue'>Low</b></a>`)
    : currentPH > 9
      ? alerting("<b><a style='color:#a19173'>PH Level</a></b>",`<a><strong>${currentPH}</strong> PH Level too <b style='color:red'>Hi</b></a>`)
      : null
  
  currentTemp <= 18
    ? alerting("<b><a style='color:#3ca31d'>Temperature</a></b>",`<strong>${currentTemp}°C</strong> is to <b style='color:blue'>Cold</b>`) 
    : currentTemp >= 24
      ? alerting("<b><a style='color:#3ca31d'>Temperature</a></b>",`<strong>${currentTemp}°C</strong> is to <b style='color:red'>Warm</b>`) 
      : null
  
  currentPower <= 70/100 * maxPower
  ? alerting("<b><a style='color:#ee591e'>Power Level</a></b>",`<strong>Battery</strong> left is <b style='color:#79b701'>${Math.floor(currentPower/maxPower*100)}%</b>`)
  : currentPower <= 50/100 * maxPower
    ? alerting("<b><a style='color:#ee591e'>Power Level</a></b>",`<strong>Battery</strong> left is <b style='color:#ff7600'>${Math.floor(currentPower/maxPower*100)}%</b>`)
    : currentPower < 25/100 * maxPower
      ? alerting("<b><a style='color:#ee591e'>Power Level</a></b>",`Need Charge under <b style='color:red'>25%</b>`)
      : null
  
  currentWater <= 70/100 * maxWater
  ? alerting("<b><a style='color:#2bb5ff'>Water Level</a></b>",`<strong>Water level</strong> is <b style='color:#0475ea'>${Math.floor(currentWater/maxWater*100)}%</b>`)
  : currentWater <= 50/100 * maxWater
    ? alerting("<b><a style='color:#2bb5ff'>Water Level</a></b>",`<strong>Water level</strong> is <b style='color:#33abe4'>${Math.floor(currentWater/maxWater*100)}%</b>`)
    : currentWater < 25/100 * maxWater
      ? alerting("<b><a style='color:#2ebcdc'>Water Level</a></b>",`Need to fill Water it's under <b style='color:#0475ea'>25%</b>`)
      : null
}

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  document.getElementsByTagName("h4")[0].innerHTML = current[0].children[1].innerHTML
  console.log(window.innerWidth)
  if (current[0].children[1].innerHTML == " Generate"){
    generate()
    document.querySelector(".parameter-level").style.display = "flex"
    document.getElementById("#profile").style.display = "none"
  }else if(current[0].children[1].innerHTML == " Profile"){
    document.querySelector(".parameter-level").style.display = "none"
    document.getElementById("#profile").style.display = "flex"
  }else if(current[0].children[1].innerHTML == " Home"){
    document.querySelector(".parameter-level").style.display = "flex"
    document.getElementById("#profile").style.display = "none"
  }
  });
}

const maxPH = document.getElementsByClassName('param-value ph-level')[0].innerText.split('/')[1]
const maxTemp = document.getElementsByClassName('param-value temperature')[0].innerText.split('/')[1]
const maxPower = document.getElementsByClassName('param-value power-level')[0].innerText.split('/')[1]
const maxWater = document.getElementsByClassName('param-value water-level')[0].innerText.split('/')[1]

var currentPH = document.getElementsByClassName('param-value ph-level')[0].innerText.split('/')[0]
var currentTemp = document.getElementsByClassName('param-value temperature')[0].innerText.split('/')[0]
var currentPower = document.getElementsByClassName('param-value power-level')[0].innerText.split('/')[0]
var currentWater = document.getElementsByClassName('param-value water-level')[0].innerText.split('/')[0]
var styleRadius = 30
const setLevel = (x,y,param) => {
  /**
   * x = current value
   * y = max value
   * param = parameter
  **/
  x/y >= 0.8
    ? styleRadius = (x/y - 0.8) * 300
    : styleRadius = 0
  document.getElementsByClassName(`value ${param}`)[0].style.height = `${x/y *100}%`
  document.getElementsByClassName(`value ${param}`)[0].style.borderRadius = `${styleRadius}px ${styleRadius}px 60px 60px`
}

setLevel(currentPH,maxPH,'ph-level')
setLevel(currentTemp,maxTemp,'temperature')
setLevel(currentPower,maxPower,'power-level')
setLevel(currentWater,maxWater,'water-level')

window.getComputedStyle(document.getElementById("content")).display == "block"
  ? document.getElementsByClassName("button right")[0].style.display = "none" 
  : window.getComputedStyle(document.getElementById("content")).display == "none" 
    ? document.getElementsByClassName("button right")[0].style.display = "none" 
    : document.getElementsByClassName("button left")[0].style.display = "none"

const showContent = (x) => {
  if (x=="left"){
    document.getElementsByTagName("aside")[0].style.display = "none"
    document.getElementById("content").style.display = "block"
    document.querySelector(".button.left").style.display = "none"
    document.querySelector(".button.right").style.display = null
  }else{
    document.getElementsByTagName("aside")[0].style.display = null
    document.getElementById("content").style.display = "none"
    document.querySelector(".button.left").style.display = null
    document.querySelector(".button.right").style.display = "none"
  }
}
