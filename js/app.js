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
    //site pulled from Frommer's at http://www.frommers.com/destinations/alexandria-va/623095
    self.sites = ko.observableArray([
        new Site("Ramsay House","221 King St, Alexandria, VA 22314",""),
        new Site("Carlyle House","121 N Fairfax St, Alexandria, VA 22314",""),
        new Site("Gadsby's Tavern","134 N Royal St, Alexandria, VA 22314",""),
        new Site("523 Queen St, Alexandria, VA 22314","",""),
        new Site("Revolutionary War Cobblestones","607 Princess St, Alexandria, VA 22314",""),
        new Site("Robert E. Lee's Boyhood Home","607 Oronoco Street, Alexandria, Virginia 22314",""),
        new Site("Lee-Fendall House","614 Oronoco St, Alexandria, VA 22314",""),
        new Site("Lloyd House","220 N Washington St, Alexandria, VA 22314",""),
        new Site("Christ Church","118 North Washington St, Alexandria, Virginia 22314",""),
        new Site("Friendship Firehouse","107 S Alfred St, Alexandria, VA 22314",""),
        new Site("The Lyceum","201 S Washington St, Alexandria, VA 22314",""),
        new Site("Appomattox Statue","201 S Washington St, Alexandria, VA 22314",""),
        new Site("Market Square","301 King St, Alexandria, VA 22314",""),
        new Site("Stabler-Leadbeater Apothecary Shop","107 S Fairfax St, Alexandria, VA 22314",""),
        new Site("Old Presbyterian Meeting House","323 S Fairfax St, Alexandria, VA 22314",""),
        new Site("Gentry Row","212 Prince St, Alexandria, VA 22314",""),
        new Site("The Athenaeum","201 Prince St, Alexandria, VA 22314",""),
        new Site("Captain's Row","115 Prince St, Alexandria, VA 22314",""),
        new Site("Torpedo Factory","105 N Union St, Alexandria, VA 22314",""),
    ]);
};

ko.applyBindings(new ViewModel());