// Here JS Code
'use strict';
(function(){
    const IPIFY_API='at_5Kmiy5agVMtCidp33lQj4hjVLDsyX'
    const MAP_API='pk.eyJ1IjoibG9haW1hc3JpIiwiYSI6ImNrd2dudWtiZzBxNmYzMXBtOGYxYm1jY24ifQ.s90TP5x2nJhNbPUW25ixNw'
    const IP1=qs('#IP')
    const Locations=qs('#Location')
    const TimeZone=qs('#TimeZone')
    const ISP=qs('#ISP')
    const SearchBtn=qs('#locationbutton')
    const TextBox = qs('#input');
    
    window.addEventListener('load',GetMyIP)
    SearchBtn.addEventListener('click', getIP)
    TextBox.addEventListener('keypress',HitEnter)
    
    async function GetMyIP(){
        let response=await fetch('https://api.ipify.org?format=json')
        let data= await response.json()
        Result(data.ip)
    }
    
    async function Result(IP){
        try {
            let response =await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}&ipAddress=${IP}`)
            let data=await response.json()
            SetValue(data)
        } catch (err) {
            alert('Please Input A Valid IP')
            console.error(err)
        }
    }
    
    function mapp(latt,lngg){
        let container = L.DomUtil.get('map');
        if (container != null) {container._leaflet_id = null;}
        let map = L.map('map',{ zoomControl: false }).setView([latt, lngg], 13)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: MAP_API
        }).addTo(map);
        let myIcon = L.icon({
            iconUrl: './Images/icon-location.svg',
            iconSize: [40, 50],
            iconAnchor: [17, 50]
        });
        let marker =L.marker([latt, lngg], {icon: myIcon}).addTo(map);
    }
    
    function SetValue(data){
        IP1.textContent=data.ip
        Locations.textContent=`${data.location.city},${data.location.country} ${data.location.postalCode}`
        TimeZone.textContent=`UTC ${data.location.timezone}`
        ISP.textContent=data.isp
        let latt = data.location.lat
        let lngg = data.location.lng
        mapp(latt, lngg)
    }
    
    function HitEnter(event){
        if(event.keyCode===13){
            event.preventDefault()
            getIP();
        }
    }
    
    function getIP() {
        event.preventDefault()
        let text=TextBox.value;
        Result(text);
    }
    
    
    function qs(element) {
        return document.querySelector(element)
    }
    
})()