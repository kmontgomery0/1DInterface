// This is used to aggregrate visual information from all objects before we display them. 
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'


class Display {

    constructor(_displaySize, _pixelSize) {
  
      this.displaySize = _displaySize;
      this.pixelSize = _pixelSize;
      this.initColor = color(' #FFFFFF');      // white color
      this.displayBuffer = [];

      // Assign black to all pixels. Black = off
      for(let i = 0; i < this.displaySize; i++){
        this.displayBuffer[i] = { color: this.initColor, shape: 'rectangle' };
      }
    }
  
     // Color a specific pixel in the buffer
    setPixel(  _index,  _color, _shape = 'rectangle') {
      this.displayBuffer[_index] = { color: _color, shape: _shape };
    }
  

    // Color all pixels in the buffer
    setAllPixels( _color) {
      for(let i = 0; i < displaySize; i++) { 
        display.setPixel(i, _color); 
      }
    }


    // Now write it to screen
    // This is the only function in the entire software that writes something directly to the screen. I recommend you keep it this way.
    show() {
      noStroke();
      for (let i = 0; i < this.displaySize; i++) {
        fill(this.displayBuffer[i].color);
        if (this.displayBuffer[i].shape === 'circle') {
          ellipse(i * this.pixelSize + this.pixelSize / 2, this.pixelSize / 2, this.pixelSize, this.pixelSize);
        } else {
          rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
        }
      }
    }

    
    // Let's empty the display before we start adding things to it again
    clear(_color = this.initColor) {
      for(let i = 0; i < this.displaySize; i++) {    
        this.displayBuffer[i] = { color: _color, shape: 'rectangle' };
      }
    }
    

  }