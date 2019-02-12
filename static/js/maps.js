var map;
function initMap() {
    console.log("vai iniciar mapa" + base_url);
    if ("geolocation" in navigator) {
        console.log("entrou if");
        navigator.geolocation.getCurrentPosition(function (position) {
            centro = { lat: position.coords.latitude, lng: position.coords.longitude };
            show_map(centro);
            add_markers();
        });
    } else {
        alert("I'm sorry, but geolocation services are not supported by your browser.");
        console.log("entrou else");
        centro = { lat: -34.397, lng: 150.644 };
        show_map(centro);
    }
}
function show_map(centro) {
    console.log("vai mostrar mapa", document.getElementById('map'))
    map = new google.maps.Map(document.getElementById('map'), {
        center: centro,
        zoom: 12
    });
}
let url = base_url + 'path/detalhes';
console.log('url', url)
function add_markers() {
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            let markers = []
            out.forEach(path => {
                // console.log(out)
                var flightPlanCoordinates = justLatLng(path.gps)
                var flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                flightPath.setMap(map);
            });
        })
        .catch(err => { throw err });

}
function justLatLng(data) {
    let LatLng = []
    data.forEach(piece => {
        LatLng.push({ lat: parseFloat(piece.lat), lng: parseFloat(piece.lng) })
    })
    return LatLng;
}
