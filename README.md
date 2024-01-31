# LibreTexts Support Widget
A common widget for all LibreTexts applications to use to easily navigate users to the LibreTexts Support Center

## Usage
The minified script is hosted on the LibreTexts CDN:

```https://cdn.libretexts.net/libretexts-support-widget.min.js```

- Create a div element in the desired location with the id ```support-widget-container```
- Add the following CSS to the container: 
```
position: fixed;
z-index: 9999;
display: inline-flex;
bottom: 0px; /* margins will be automatically added */
left: 0px; /* margins will be automatically added */
```
- Import the widget script from the CDN. Make sure to add the "defer" attribute to the script tag, as we need to wait for the DOM content to load in order to atttach to the ```support-widget-container``` element.

## Example
A demo page is available in this repository (```demo.html```)