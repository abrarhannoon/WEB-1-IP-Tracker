// Here JS Code
'use strict';
(function () {
    // Variables Start
    const IPIFY_API = 'at_VA2TbBaBOg4XUmDsvdKM0eLwQqMko'
    const MAP_API = 'pk.eyJ1IjoibG9haW1hc3JpIiwiYSI6ImNrd2dudWtiZzBxNmYzMXBtOGYxYm1jY24ifQ.s90TP5x2nJhNbPUW25ixNw'
    const IP1 = qs('#IP')
    const Locations = qs('#Location')
    const TimeZone = qs('#TimeZone')
    const ISP = qs('#ISP')
    const SearchBtn = qs('form')
    const TextBox = qs('#inputArea');
    const filterBtn1 = qs('#filter1');
    const filterBtn2 = qs('#filter2');
    // Variables End

    // Events Start
    window.addEventListener('load', GetMyIP)
    SearchBtn.addEventListener('submit', getIP)
    TextBox.addEventListener('keypress', HitEnter)
    filterBtn1.addEventListener('click', filter11)
    filterBtn2.addEventListener('click', filter22);
    // Events End

    // this function to get your ip
    async function GetMyIP() {
        let response = await fetch('https://api.ipify.org?format=json')
        let data = await response.json()
        Result(data.ip)
    }

    // this function to get information about any ip you entered to
    async function Result(IP) {
        try {
            let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API}&ipAddress=${IP}`)
            let data = await response.json()
            SetValue(data)
        } catch (err) {
            alert('Please Input A Valid IP')
            console.error(err)
        }
    }

    //this function to initialize map
    function mapp(latt, lngg) {
        let container = L.DomUtil.get('map');
        if (container != null) { container._leaflet_id = null; }
        let map = L.map('map', { zoomControl: false }).setView([latt, lngg], 13)
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
        let marker = L.marker([latt, lngg], { icon: myIcon }).addTo(map);
    }

    // this function to set values from api to my form
    function SetValue(data) {
        IP1.textContent = data.ip
        Locations.textContent = `${data.location.city},${data.location.country} ${data.location.postalCode}`
        TimeZone.textContent = `UTC ${data.location.timezone}`
        ISP.textContent = data.isp
        let latt = data.location.lat
        let lngg = data.location.lng
        mapp(latt, lngg)
    }

    // this function to search when iam hitting Enter btn
    function HitEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            getIP(event);
            
        }
    }

    // this function will get the text box value (IP) and give it to Result function
    function getIP(event) {
        event.preventDefault()
        let text = TextBox.value;
        Result(text);
    }

    //Filters For Map Start
    function filter11() {
        qs('#map').classList.toggle('filter3');

        document.body.classList.remove('filter2');
        document.body.classList.toggle('filter1');
    }
    function filter22() {
        qs('#map').classList.remove('filter3');
        document.body.classList.remove('filter1');
        document.body.classList.toggle('filter2');
    }
    //Filters For Map End

    function qs(element) {
        return document.querySelector(element)
    }
})()