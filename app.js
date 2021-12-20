// Here JS Code
const IPIFY_API='at_5Kmiy5agVMtCidp33lQj4hjVLDsyX'
const MAP_API='pk.eyJ1IjoibG9haW1hc3JpIiwiYSI6ImNrd2dudWtiZzBxNmYzMXBtOGYxYm1jY24ifQ.s90TP5x2nJhNbPUW25ixNw'
//https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}
//test Gitconst IPIFY_API='at_NCrQUdaY64KrgHegDBl87doCY2hsS'
let IP1=document.querySelector('#IP')
let Locations=document.querySelector('#Location')
let TimeZone=document.querySelector('#TimeZone')
let ISP=document.querySelector('#ISP')
//window.addEventListener('load',GetYourIp)
window.addEventListener('load',GetYourIp)
document.getElementById('btn').addEventListener('click', getIP);

function GetYourIp(){
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data =>{
        IntialResult(data.ip)
})
}
function IntialResult(IP){

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}&ipAddress=${IP}`)
    .then(response => response.json()).then(data =>{
    IP1.textContent=data.ip,
    Locations.textContent=data.location.city,
    TimeZone.textContent=data.location.timezone,
    ISP.textContent=data.isp;
    let latt = data.location.lat;
    let lngg = data.location.lng;
        mapp(latt, lngg)
    }).catch(error => {
        console.log('ThereIs A Error');
    })
}
function mapp(latt,lngg){
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }
    let map = L.map('map').setView([latt, lngg], 13)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAP_API
 }).addTo(map);
var greenIcon = L.icon({
    iconUrl: './Images/icon-location.svg'
});
var marker =L.marker([latt, lngg], {icon: greenIcon}).addTo(map);
}

function getIP() {
    let input = document.getElementById('input').value;
    IntialResult(input);

}
