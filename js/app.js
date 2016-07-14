/**
* @description Represents a site in Old Town Alexandria
* @constructor
* @param {string} name - The name of the site
* @param {string} address - The address of the site
* @param {number} lat - The latitude of the site
* @param {number} lng - The longitude of the site
* @param {string} description - A description of the site
* @param {string} wikipediaID - The unique wikipedia ID of the site if it has a Wikipedia page. Or null if it does not.
*/

class Site {
    constructor(name, address, lat, lng, description, wikipediaID) {
        var self = this;
        self.name = name;
        self.address = address;
        self.lat = lat;
        self.lng = lng;
        self.description = description;
        self.wikipediaID = wikipediaID;
    };
};

// Declare Google Maps UI elements
// infoWindow is a single global object in order to ensure that only one infoWindow is rendered at a time
// wasWarned is a boolean to make sure that the end user is only warned once about Wikipedia errors
// defaultIcon is a dynamically generated (during initMap()) custom icon that is used for markers
// highlightenIcon is a dynamically generated (during initMap()) custom icon that is used for markers when they are
// hovered over (via the marker itself or via the sidebar)

var infoWindow = null;
var markers = ko.observableArray();
var defaultIcon;
var highlightedIcon;

// Global variable that stores a boolean to indicate if the end-use has been warned about Wikipedia or not.
//This is to ensure an end-user is only warned once.

var wasWarnedAboutWikipedia = false;

// Custom Google Maps Style

var styles =
    [
        {
            "featureType": "all", "elementType": "labels.text.fill",
            "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }]
        },
        {
            "featureType": "all", "elementType": "labels.text.stroke",
            "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }]
        },
        {
            "featureType": "all", "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative", "elementType": "geometry.fill",
            "stylers": [{ "color": "#000000" }, { "lightness": 20 }]
        },
        {
            "featureType": "administrative", "elementType": "geometry.stroke",
            "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }]
        },
        {
            "featureType": "landscape", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 20 }]
        },
        {
            "featureType": "poi", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 21 }]
        },
        {
            "featureType": "road.highway", "elementType": "geometry.fill",
            "stylers": [{ "color": "#000000" }, { "lightness": 17 }]
        },
        {
            "featureType": "road.highway", "elementType": "geometry.stroke",
            "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }]
        },
        {
            "featureType": "road.arterial", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 18 }]
        },
        {
            "featureType": "road.local", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 16 }]
        },
        {
            "featureType": "transit", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 19 }]
        },
        {
            "featureType": "water", "elementType": "geometry",
            "stylers": [{ "color": "#000000" }, { "lightness": 17 }]
        }
    ]

// initMap() is the main function for creating the Google Map
// It generates the Google Map, generates the custom icons, generates an array of markers with listeners.

function initMap() {
    // Declare and instatiate Google Map object using desired view zoom, custom styling and map type
    self.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.806, lng: -77.045 },
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    });

    defaultIcon = makeMarkerIcon('ffffff');
    highlightedIcon = makeMarkerIcon('ff661a');

    /* Iterate through the array of sites, create a marker for each site, add a listener on the marker that bounces the
    marker twice and renders the infowindow for this marker, and add the marker to the markers array. All markers are
    diplayed on the map upon initial load*/

    for (var i = 0; i < vm.sites().length; i++) {
        let site = vm.sites()[i];
        let marker = new google.maps.Marker({
            position: { lat: site.lat, lng: site.lng },
            map: map,
            title: site.name,
            icon: defaultIcon
        });
        marker.addListener('click', function () {
            vm.selectMarker(marker);
        });
        //Event Listeners for mouseover and mouseout that modify the marker colors upon hover
        marker.addListener('mouseover', function () {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function () {
            this.setIcon(defaultIcon);
        });
        markers.push(marker);
    };
};

// clearInfoWindow() gracefully closes the infoWindow if it is open

function clearInfoWindow() {
    if (infoWindow) {
        infoWindow.close();
    };
};

/* generateInfoWindow() issues API calls to Wikipedia for images, generates a content string and infoWindow, and then
opens the infoWindow after a delay.  The delay gives the Wikipedia JSONP API functions to complete and append data to
the contentString before being opened, with helps ensures the infoWindow auto-pans properly*/

function generateInfoWindow(site, map, marker, delay) {
    if (site.wikipediaID) pullImagesFromWikipedia(site, site.wikipediaID);
    var contentString = '<strong>' + site.name + '</strong>' + '<p>' + site.description + '</p>'
    if (site.wikipediaID) {
        contentString += '<strong>Images From <a href="https://en.wikipedia.org/?curid=' + site.wikipediaID +
            '">Wikipedia Page</a></strong><br>';
    };
    infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    setTimeout(function () { infoWindow.open(map, marker); }, delay);
};

// bounce() helper function bounced a marker a set number of times

function bounce(marker, numberOfBounces) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    };
    // The BOUNCE animation lasts 700ms, so calculate duration and then use setTimeout()
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () { marker.setAnimation(null); }, 700 * numberOfBounces);
}

/*makeMarkerIcon(markerColor) takes in a color in hexidecimal notation and creates a new marker icon of that color.
This function was presented in the Google Maps Udacity course, but I have updated it for version 3.11 of the maps API*/

function makeMarkerIcon(markerColor) {
    var markerIcon = {
        url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
        size: new google.maps.Size(21, 34), //dimensions of marker icon
        origin: new google.maps.Point(0, 0), //origin of marker icon
        anchor: new google.maps.Point(10, 34), //anch
        scaledSize: new google.maps.Size(21, 34)
    };
    return markerIcon;
};

/*pullImagesFromWikipedia() is a function that issues a JSONP format Ajax request to the Wikipedia Mediawiki API.
It retrieves all images displayed on the site's Wikipedia page, filters out known junk images based on the name of the
image, and then calls the helper function resolveWikipediaImageURL for iamges that pass the filter.*/

// TODO: Investigate Why does this function need to take a seperate wikipediaID if wikipediaID is an attribute of Site?

function pullImagesFromWikipedia(site, wikipediaID) {
    var wikipediaEndpoint = 'https://en.wikipedia.org/w/api.php';
    // Start a timeout that triggers a wikipedia warning alert if eight seconds elapse without a successful response.
    // This checks wasWarnedAboutWikipedia to make sure that the alert only occurs once
    var wikiRequestTimeout;
    if (!wasWarnedAboutWikipedia) {
        wikiRequestTimeout = setTimeout(function () {
            $('#wikipedia-alert').css({ 'visibility': 'visible' });
            wasWarnedAboutWikipedia = true;
        }, 8000);
    };
    $.ajax({
        url: wikipediaEndpoint,
        cache: true,
        data: {
            action: 'query',
            pageids: wikipediaID,
            prop: 'images',
            format: 'json'
        },
        dataType: 'jsonp',
        success: (function (data) {
            clearTimeout(wikiRequestTimeout);
            var imageNames = [];
            var imageURLs = [];
            for (var i = 0; i < data.query.pages[wikipediaID].images.length; i++) {
                let imageName = data.query.pages[wikipediaID].images[i].title;
                let process = true;
                /*The following statements prevent rendering of common junk images returned by Wikipedia
                The syntax
                      if (imageName.includes('map')) process = false;
                Was replaced by
                      if (imageName.indexOf('map') >= 0) process = false;
                Specifically to support IE11. **shakes fist at IE continuously until January 2023 EOL date** */
                if (imageName.indexOf('map') >= 0) process = false;
                if (imageName.indexOf('Map') >= 0) process = false;
                if (imageName.indexOf('logo') >= 0) process = false;
                if (imageName.indexOf('Logo') >= 0) process = false;
                if (imageName.indexOf('pog') >= 0) process = false;
                if (imageName.indexOf('Flag') >= 0) process = false;
                if (imageName.indexOf('book') >= 0) process = false;
                if (imageName.indexOf('question') >= 0) process = false;
                if (imageName.indexOf('Ambox') >= 0) process = false;
                if (imageName.indexOf('Nuvola') >= 0) process = false;
                if (imageName.indexOf('btn') >= 0) process = false;
                if (process) resolveWikipediaImageURL(site, imageName);
            };
        })
    });

    /* resolveWikipediaImageURL is a helper function that issues a second Ajax request in JSONP format to retrieve the
    image URL, formats an <img> tag with style information, and then appends the tag to the current infoWindow.*/
    function resolveWikipediaImageURL(site, imageName) {
        $.ajax({
            url: wikipediaEndpoint,
            cache: true,
            data: {
                action: 'query',
                prop: 'imageinfo',
                iiprop: 'url',
                titles: imageName,
                format: 'json'
            },
            dataType: 'jsonp',
            success: (function (data) {
                var imageHTML = '<a href="' + data.query.pages[Object.keys(data.query.pages)].imageinfo[0].url + '">' +
                    '<img class="wiki-img img-circle" src="' +
                    data.query.pages[Object.keys(data.query.pages)].imageinfo[0].url + '" height="20%" width="20%">' +
                    '</a>';
                infoWindow.setContent(infoWindow.content + imageHTML);
            })
        });
    };

};

/*updateMarkers() is a custom Knockout binding handler that performs real time processing on the menu search field
It clears the infoWindow if open and then iterates through the markers array.
If a marker is in the filderedSites array, meaning that it meets the search criteria provided by the user,
attach the marker to the map. Otherwise, detach the marker from the map.*/

ko.bindingHandlers.updateMarkers = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        clearInfoWindow();
        for (var i = 0; i < markers().length; i++) {
            let marker = markers()[i];
            let markerInFilteredSites = false;
            for (var j = 0; j < vm.filteredSites().length; j++) {
                let site = vm.filteredSites()[j];
                if (marker.title === site.name) {
                    markerInFilteredSites = true;
                };
            };
            markerInFilteredSites ? marker.setMap(map) : marker.setMap(null)
        };
    }
};

//Knockout Functionality
var ViewModel = function () {

    // ViewModel Data
    var self = this;

    // Intially set searchString, which is bound to sidebar search field, to an empty string
    self.searchString = ko.observable('');

    /*Create a Knockout Observable Array of instances of Site with prepopulated lats and lngs and wikipediaIDs
    Site descriptions are pulled from Frommer's at http://www.frommers.com/destinations/alexandria-va/623095 and
    from the Extraordinary Alexandria tourism site at
    http://www.visitalexandriava.com/things-to-do/historic-attractions-and-museums/*/

    self.sites = ko.observableArray([
        new Site(
            "Ramsay House & Visitor's Center",
            "221 King St, Alexandria, VA 22314",
            38.804628,
            -77.042357,
            "Alexandria’s Visitor's Center was originally the home of William Ramsay, one of the three original " +
            "Scottish settlers that settled the area in November 1748 and petitioned the House of Burgesses to " +
            "establish a town.",
            null
        ),
        new Site(
            "Carlyle House",
            "121 N Fairfax St, Alexandria, VA 22314",
            38.805228,
            -77.042012,
            "A Georgian Palladian manor house built in 1753 by merchant and city founder John Carlyle. Here, five " +
            "royal governors and General Braddock met to discuss funding of the French and Indian War. Daily " +
            "tours, youth programs, special events, exhibits and lectures offer visitors a chance to experience " +
            "eighteenth century life through the eyes of one man and his family as he made the journey from " +
            "English citizen to American patriot. The story of Carlyle House parallels the early history of " +
            "Alexandria, colonial Virginia, and America and is brought to life through costumed interpreters, " +
            "guides and fun family programs. Tues.-Sat. 10 a.m.-4 p.m.; Sun. noon-4 p.m. (tours on the hour and " +
            "half hour, last tour at 4).",
            12593872
        ),
        new Site(
            "Gadsby's Tavern Museum",
            "134 N Royal St, Alexandria, VA 22314",
            38.805554,
            -77.043619,
            "Discover Alexandria’s five-star hotel of the 18th century! The Museum consists of the c. 1785 tavern " +
            "and the 1792 City Tavern and Hotel. Both were constructed by John Wise but made famous by " +
            "tavernkeeper John Gadsby. His establishment was the center of political, business, and social " +
            "life in Alexandria and in the new federal city of Washington, D.C. The City Tavern’s Ballroom was " +
            "the location of George Washington’s Birthnight Ball in 1798 and 1799, as well as Thomas Jefferson’s " +
            "Inaugural Banquet in 1801. The museum offers tours, programs and special events. " +
            "Apr.-Oct.: Sun. & Mon. 1-5 p.m., Tues.-Sat. 10 a.m.-5 p.m.; " +
            "Nov.-March.: Wed.-Sat. 11 a.m.-4 p.m., Sun. 1-4 p.m",
            3903736
        ),
        new Site(
            "Spite House",
            "523 Queen St, Alexandria, VA 22314",
            38.807307,
            -77.045064,
            "The Spite House was built by John Hollensbury in 1830 to keep horse drawn wagons and loiterers out of " +
            "his alley. At seven feet wide and 25 feet deep, the home is 325 square feet over two floors.",
            null
        ),
        new Site(
            "Revolutionary War Cobblestones",
            "607 Princess St, Alexandria, VA 22314",
            38.808553,
            -77.045503,
            "The 600 block of Princess Street retains the historic Revolutionary War cobblestone streets that once " +
            "lined much of Old Town. Local folklore says the cobblestones were brought from England in ships as " +
            "ballast and were laid by captured Hessians, the German mercenaries hired to fight for the British " +
            "during the Revolutionary War.",
            null
        ),
        new Site(
            "Robert E. Lee's Boyhood Home",
            "607 Oronoco Street, Alexandria, Virginia 22314",
            38.809808,
            -77.045208,
            "Robert E. Lee left this home that he loved so well to enter West Point. After Appomattox he returned " +
            "and climbed the wall to see if the snowballs were in bloom. George Washington dined here when it was " +
            "the home of William Fitzhugh, Lee’s kinsman and his wife’s grandfather. Lafayette visited here in 1824.",
            30089861
        ),
        new Site(
            "Lee-Fendall House",
            "614 Oronoco St, Alexandria, VA 22314",
            38.809437,
            -77.045725,
            "The Lee-Fendall House is a historic house museum and garden located in Old Town Alexandria, Virginia. " +
            "Since its construction in 1785 the house has served as home to thirty-seven members of the Lee family " +
            "(1785–1903), hundreds of convalescing Union soldiers (1863–1865), the prominent Downham family " +
            "(1903–1937), and powerful labor leader John L. Lewis (1937–1969).",
            9032278
        ),
        new Site(
            "Lloyd House",
            "220 N Washington St, Alexandria, VA 22314",
            38.807214,
            -77.046751,
            "Constructed around 1796-1797, Lloyd House is one of the best examples of Alexandria’s late " +
            "eighteenth-century Georgian style, and one of five buildings of the Georgian style remaining in the " +
            "city. Lloyd House is particularly important to the streetscape of Washington Street, part of the George " +
            "Washington Memorial Parkway.",
            26657462
        ),
        new Site(
            "Christ Church",
            "118 North Washington St, Alexandria, Virginia 22314",
            38.806271,
            -77.047460,
            7769126
        ),
        new Site(
            "Friendship Firehouse",
            "107 S Alfred St, Alexandria, VA 22314",
            38.804955,
            -77.049491,
            "Established in 1774, the Friendship Fire Company was the first volunteer fire company in Alexandria. " +
            "The current firehouse was built in 1855 and now houses historic firefighting equipment and exhibits. " +
            "Sat. and Sun. 1-4 p.m.",
            null
        ),
        new Site(
            "Lyceum",
            "201 S Washington St, Alexandria, VA 22314",
            38.803759,
            -77.047537,
            "The 1839 Greek Revival building serves as the City's history museum. An ongoing exhibition tells the " +
            "story of Alexandria, once one of the busiest ports in America. Archaeological finds, old photographs, " +
            "maps, original art works and a wide variety of historic artifacts provide the visitor with a picture of " +
            "the City's past. Changing exhibitions explore special themes, people, places or events within " +
            "Alexandria's history. Mon.-Sat. 10 a.m.-5 p.m., Sun. 1-5 p.m.",
            23047751
        ),
        new Site(
            "Appomattox Statue",
            "201 S Washington St, Alexandria, VA 22314",
            38.803911,
            -77.047210,
            "Appomattox is a bronze statue created by sculptor M. Caspar Buberl and commissioned and erected by the " +
            "Robert E. Lee camp of the United Confederate Veterans in 1889. The form of the soldier was designed by " +
            "John Adams Elder and shows a lone Confederate viewing the aftermath of the battle of Appomattox Court " +
            "House, where Gen. Robert E. Lee ultimately surrendered to Union general Ulysses S. Grant. The soldier " +
            "is facing south, the direction which the soldiers from Alexandria would have marched to meet their Union " +
            "foes in battle in 1861, and also the direction of the former CSA.",
            27208344
        ),
        new Site(
            "City Hall and Market Square",
            "301 King St, Alexandria, VA 22314",
            38.805406,
            -77.042894,
            "The Alexandria City Hall also known as the Alexandria Market House & City Hall, in Alexandria, " +
            "Virginia, is a building built in 1871 and designed by Adolph Cluss. It was listed on the U.S. National " +
            "Register of Historic Places in 1984. The original city hall was something of a complex, containing the " +
            "Masonic Lodge, court facility, and both the principal police and fire stations of Alexandria. Market " +
            "stalls were once situated on the first floors of the west and north wings and in the courtyard which " +
            "are absent today. A new building was constructed in 1817 but after an extensive fire in 1871 it was " +
            "rebuilt as a replica of the former building.",
            23888997
        ),
        new Site(
            "Stabler-Leadbeater Apothecary",
            "107 S Fairfax St, Alexandria, VA 22314",
            38.804238,
            -77.042773,
            "The Stabler-Leadbeater Apothecary Museum was a family business founded in 1792 and operated in this " +
            "location from 1805 until 1933.  It represents one of Alexandria's oldest continuously run businesses " +
            "that combined retailing, wholesaling, and manufacturing. The museum boasts a vast collection of herbal " +
            "botanicals, handblown glass, and medical equipment.  It also has a spectacular collection of archival " +
            "materials, including journals, letters and diaries, prescription and formula books, ledgers, orders " +
            "and invoices. The names of famous customers appear in these documents, including Martha Washington, " +
            "Nelly Custis and Robert E. Lee.",
            16173672
        ),
        new Site(
            "Old Presbyterian Meeting House",
            "323 S Fairfax St, Alexandria, VA 22314",
            38.801352,
            -77.043419,
            "Erected in 1775, the Old Presbyterian Meeting House was the place of worship of the Scottish merchants " +
            "that founded Alexandria. The Burial Ground adjoining the Church is the final resting place of many " +
            "patriots of the Revolutionary War, including the Tomb of an Unknown Soldier of the American Revolution" +
            ", John Carlyle, founder and first overseer of Alexandria; Dr. James Craik, Physician General of the " +
            "Continental Army and close friend of George Washington, and William Hunter, Jr., mayor of Alexandria " +
            "and founder of the St. Andrew's Society.",
            23439578
        ),
        new Site(
            "Gentry Row",
            "212 Prince St, Alexandria, VA 22314",
            38.803181,
            -77.042304,
            "Gentry Row has many historic home that were once owned by prominent figures as William Fairfax, one of " +
            "Alexandria's founding trustees, and Dr. James Craik, surgeon-general during the American Revolution as " +
            "well as George Washington's personal physician.",
            null
        ),
        new Site(
            "Athenaeum",
            "201 Prince St, Alexandria, VA 22314",
            38.803438,
            -77.041821,
            "A Greek Revival building built in 1851, it was home to the Bank of the Old Dominion, where Robert E. " +
            "Lee did his banking. During the Civil War occupation of Alexandria, Federal troops commandeered the " +
            "building, which they used as Commissary Headquarters for the Union Army. After the Battle of Bull Run/" +
            "First Manassas, the building served as a triage facility for wounded Union soldiers. One of the few " +
            "remaining examples of neo-classical Greek revival architecture in historic Alexandria, the Athenaeum " +
            "is on both the Virginia Trust and National Register of Historic Places. Today it is an art gallery and " +
            "home of the Northern Virginia Fine Arts Association. Open  Thurs.-Sun. noon-4 p.m. Closed major holidays.",
            32040345
        ),
        new Site(
            "Captain's Row",
            "115 Prince St, Alexandria, VA 22314",
            38.803433,
            -77.041098,
            "Captain’s Row is a line of homes once heavily inhabited by sea captains in the days when Alexandria " +
            "was a major commercial port and clipper ships and brigs lined the Potomac waterfront. The homes were " +
            "mostly rebuilt in 1827 after a fire. The street retains the historic Revolutionary War cobblestone " +
            "streets that once lined much of Old Town. Local folklore says the cobblestones were brought from " +
            "England in ships as ballast and were laid by captured Hessians, the German mercenaries hired to fight " +
            "for the British during the Revolutionary War.",
            null
        ),
        new Site(
            "Black History Museum",
            "115 Prince St, Alexandria, VA 22314",
            38.812054,
            -77.048045,
            "Originally the segregated library for Alexandria's African American residents, the museum documents the " +
            "local and national history, culture and contributions of Black America. Tues.-Sat. 10 a.m.-4 p.m. The " +
            "Museum's permanent exhibition, Securing the Blessings of Liberty, seeks to document how the area " +
            "African Americans survived slavery, helped to destroy it and eventually helped shape the community " +
            "that we know today.",
            null
        ),
        new Site(
            "Torpedo Factory",
            "105 N Union St, Alexandria, VA 22314",
            38.804892,
            -77.039802,
            "The Torpedo Factory Art Center was once a torpedo factory!<br>The U.S. Naval Torpedo Station opened in " +
            "1919 and operated for five years before becoming munitions storage. With the onset of WWII, it " +
            "produced Mark III and Mark IV torpedoes. By the war's end, it was converted to government storage " +
            "until the City of Alexandria bought it in 1969. In 1974, a group of visionary artists proposed to " +
            "renovate part of the neglected factory into usable studio spaces. One of the country's earliest " +
            "examples of creative reuse of industrial space, the Torpedo Factory Art Center became a catalyst " +
            "for the revitalization of the Potomac riverfront and the historic preservation of Old Town Alexandria " +
            "as a thriving visitor destination. Today, it continues to be a prototype for other visual arts " +
            "organizations around the world.",
            21469711
        ),
    ]);

    // filteredSites is a Knockout Computed object that stores all sites with a title that matches searchString
    // without regard to case. This filter implementation is based on Ryan Niemeyer's Array Filtering section
    // found at http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    self.filteredSites = ko.computed(function () {
        if (self.searchString() === '') {
            return self.sites();
        } else if (self.searchString() !== '') {
            var filter = self.searchString().toLowerCase();
            return ko.utils.arrayFilter(self.sites(), function (site) {
                var siteNoCase = site.name.toLowerCase();
                //Changed syntax from return siteNoCase.includes(filter); to support IE11
                if (siteNoCase.indexOf(filter) >= 0) return true;
            });
        };
    });


    // Behaviors

    // selectSite is called when a specific site is selected from the filtered list of sites in the sidebar
    // It finds the marker with a title that matches the name of the selected site, bounces that marker twice, and
    // then renders the infoWindow on that marker using the data from the selected site.
    self.selectSite = function (site) {
        var markerOfSelectedSite = jQuery.grep(markers(), function (marker) {
            return (marker.title === site.name);
        });
        clearInfoWindow();
        bounce(markerOfSelectedSite[0], 2);
        generateInfoWindow(site, map, markerOfSelectedSite[0], 1400);
    };

    // highlightMarkerOfSite() and unhighlightMarkerOfSite() are used to allow the end user to hover over sites in
    // the side bar and see the associated marker of that site highlighted on the map.
    self.highlightMarkerOfSite = function (site) {
        var markerOfSelectedSite = jQuery.grep(markers(), function (marker) {
            return (marker.title === site.name);
        });
        markerOfSelectedSite[0].setIcon(highlightedIcon);
    };

    self.unhighlightMarkerOfSite = function (site) {
        var markerOfSelectedSite = jQuery.grep(markers(), function (marker) {
            return (marker.title === site.name);
        });
        markerOfSelectedSite[0].setIcon(defaultIcon);
    };

    // selectMarker() is used to override the default behavior of when a marker is clicked. This ensures uniform
    // behavior between the sidebar and the map
    self.selectMarker = function (marker) {
        var siteOfSelectedMarker = jQuery.grep(self.filteredSites(), function (site) {
            return (site.name === marker.title);
        });
        clearInfoWindow();
        bounce(marker, 2);
        generateInfoWindow(siteOfSelectedMarker[0], map, marker, 1400);
    };
}; //endViewModel

var vm = new ViewModel;
ko.applyBindings(vm);