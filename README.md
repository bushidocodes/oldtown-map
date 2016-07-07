# oldtown-map
oldtown-map is a JavaScript application that renders historic locations in Old Town Alexandria Virginia on a Google Map as markers. It provides a sidebar with a list of these locations and a searchable filter list that filters both the list and the markers on the map. Selecting a marker or a location on the list opens an InfoView with static information about the location. If an item has a Wikipedia ID, then the application displays a link to the Wikipedia page for the location and the infoView loads and scales thumbnail versions of the images on the locaiton's wikipedia page.

## Dependencies
The Simpler-Sidebar Bootstrap theme is provided in this repo.

The following dependencies are managed with bower:
* jQuery
* Bootstrap
* Knockout
* Knockstrap (Knockout bindings for Bootstrap... not currently used by app, but useful)

To install these dependencies, run

`bower install`

## Built with love using
* Visual Studio Code

## Authors
* Sean McBride - [spmcbride1201](https://github.com/spmcbride1201)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details