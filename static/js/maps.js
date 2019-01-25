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
    map = new google.maps.Map(document.getElementById('map'), {
        center: centro,
        zoom: 12
    });
}
let url = base_url + 'oscilacao';
function add_markers() {
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            let markers = []
            out['resultado'].forEach(buraco => {
                console.log(buraco)
                let marcador = new google.maps.Marker({
                    position: { lat: parseFloat(buraco.lat), lng: parseFloat(buraco.lng) },
                    map: this.map,
                    // icon: './assets/imgs/icon.png'
                });
                if (marcador) {
                    marcador.addListener('click', function () {
                        window.open('https://maps.google.com/maps/?f=q&q=' + buraco.lat + ',' + buraco.lng, '_blank');
                        map.setCenter(marcador.getPosition());
                    });
                    markers.push(marcador);
                }
            });
            // let cluster = new MarkerClusterer(this.map, markers);
        })
        .catch(err => { throw err });

}
