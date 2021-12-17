// Here JS Code
const IPIFY_API='at_5Kmiy5agVMtCidp33lQj4hjVLDsyX'
const MAP_API='pk.eyJ1IjoibG9haW1hc3JpIiwiYSI6ImNrd2dudWtiZzBxNmYzMXBtOGYxYm1jY24ifQ.s90TP5x2nJhNbPUW25ixNw'
//https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}
//test Gitconst IPIFY_API='at_NCrQUdaY64KrgHegDBl87doCY2hsS'
const MyIP = localStorage.getItem('MyIP');
const latt = localStorage.getItem('lat');
const lngg = localStorage.getItem('lng');
//window.addEventListener('load',GetYourIp)
window.addEventListener('load',IntialResult)

function GetYourIp(){
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data =>{
        localStorage.setItem('MyIP', data.ip)
})
}
function IntialResult(){
    let IP=document.querySelector('#IP')
    let Locations=document.querySelector('#Location')
    let TimeZone=document.querySelector('#TimeZone')
    let ISP=document.querySelector('#ISP')
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}`)
    .then(response => response.json()).then(data =>{
    localStorage.setItem('MyIP', data.ip),
    localStorage.setItem('lat', data.location.lat),
    localStorage.setItem('lng', data.location.lng),
    IP.textContent=data.ip,
    Locations.textContent=data.location.city,
    TimeZone.textContent=data.location.timezone,
    ISP.textContent=data.isp
    }).catch(error => {
        console.log('ThereIs A Error');
    })
}