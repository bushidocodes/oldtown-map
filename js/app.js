//Site Class
class Site {
    constructor(name, address, description){
        var self = this;
        self.name = name;
        self.address = address;
        self.description = description;
    };
};

//Google Maps Functionality
var map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.805, lng: -77.05},
    zoom: 15
});
}

//Knockout Functionality
var ViewModel = function () {
    var self = this;
    self.sites = ko.observableArray([
        new Site("Ramsay House","",""),
        new Site("Carlyle House","",""),
        new Site("Gadsby's Tavern","",""),
        new Site("Spite House","",""),
        new Site("Revolutionary War Cobblestones","",""),
        new Site("Robert E. Lee's Boyhood Home","",""),
        new Site("Lee-Fendall House","",""),
        new Site("Lloyd House","",""),
        new Site("Christ Church","",""),
        new Site("Friendship Firehouse","",""),
        new Site("The Lyceum","",""),
        new Site("The Confederate Soldier","",""),
        new Site("Market Square","",""),
        new Site("Stabler-Leadbeater Apothecary Shop","",""),
        new Site("Old Presbyterian Meeting House","",""),
        new Site("Gentry Row","",""),
        new Site("The Athenaeum","",""),
        new Site("Captain's Row","",""),
        new Site("Torpedo Factory","",""),
    ]);
};

ko.applyBindings(new ViewModel());