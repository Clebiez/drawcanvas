# Drawcanvas

Little ES6 drawing plugin without any dependencie and mobile friendly.

## Installation

```sh
npm install drawcanvas --save
yarn add drawcanvas
```

## Usage

First, import the plugin at the head of your JS file
```
import Drawcanvas from 'drawcanvas'
```

And invoke an object with this few options

```
const drawcanvas = new Drawcanvas({
    canvas: String (id of your canvas, required),
    size: Number (default: 3),
    color: String (default: #000)
});
```

If you want to clear the canvas, simply call

`drawcanvas.clear()`

## Dependencies

None (Yeah.)

## License

ISC
