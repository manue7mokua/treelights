# Smart Bonsai Lights Controller

A modern web application to control LED lights on a bonsai tree, with proximity activation and multiple lighting patterns.

![Bonsai Tree Lights](https://via.placeholder.com/800x400?text=Smart+Bonsai+Lights)

## Features

- 🌈 Multiple lighting patterns: Rainbow, Chase, Fire, and Noise
- 👋 Proximity-activated light control (wave to turn on)
- 📱 Simple web interface
- 📡 WiFi connectivity through Arduino
- ⏱️ Auto-off after 60 seconds of inactivity

## Project Structure

- **frontend/** - HTML frontend application
- **infra/** - Arduino code for controlling the LED strip and running the API server

## Getting Started

### Frontend Setup

1. Open `frontend/index.html` in your web browser
2. Update the Arduino IP address in the JavaScript code if needed

### Arduino Setup

1. Install required libraries:

   - WiFi101
   - Adafruit NeoPixel
   - SPI

2. Hardware Connections:

   - Connect LED strip to pin 6
   - Connect ultrasonic sensor:
     - TRIG to pin 3
     - ECHO to pin 4
   - Connect WiFi module

3. Update WiFi credentials in `infra/main.ino`:

   ```cpp
   char ssid[] = "YOUR_WIFI_SSID";
   char pass[] = "YOUR_WIFI_PASSWORD";
   ```

4. Upload the sketch to your Arduino board
5. Note the IP address from Serial Monitor

## How it Works

### Communication Flow

```
Web UI <-> HTTP Requests <-> Arduino Server <-> LED Controls
```

The web application communicates with the Arduino via HTTP requests:

- `/all_on` - Turn on all LEDs white
- `/all_off` - Turn off all LEDs
- `/pattern/rainbow` - Set the pattern to rainbow
- `/pattern/chase` - Set the pattern to chase
- `/pattern/fire` - Set the pattern to fire
- `/pattern/noise` - Set the pattern to noise
- `/led/{index}?r={red}&g={green}&b={blue}` - Set individual LED color

### Hardware Requirements

- Arduino MKR WiFi 1010
- WS2812B LED strip (60 LEDs)
- Ultrasonic sensor (HC-SR04)
- USB power source

### Network Requirements

This setup works only when both devices (your computer/phone and the Arduino) are on the same WiFi network.

## Customization

- Adjust the number of LEDs in `infra/main.ino`:
  ```cpp
  #define NUM_LEDS 60
  ```
- Change patterns by modifying the pattern functions
- Adjust auto-off timeout:
  ```cpp
  const unsigned long AUTO_OFF_TIME = 60000; // 60 seconds
  ```

## Limitations

- Works only on local WiFi network
- Requires manual IP configuration
- No persistent storage of settings

## License

MIT
