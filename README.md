# Smart Bonsai Lights Controller

A modern web application to control LED lights on a bonsai tree, with sound activation and multiple lighting patterns.

![Bonsai Tree Lights](https://via.placeholder.com/800x400?text=Smart+Bonsai+Lights)

## Features

- 🌈 Multiple lighting patterns: Rainbow, Pulse, Twinkle, and Wave
- 🔊 Sound-activated light control (clap to turn on)
- 📱 Modern, responsive web interface
- 🎄 Real-time status indicators
- 📡 WiFi connectivity through Arduino

## Project Structure

- **client/** - React frontend application with Tailwind CSS and shadcn/ui
- **infra/** - Arduino code for controlling the LED strip and running the API server

## Getting Started

### Frontend Setup

1. Install dependencies:

   ```
   cd client
   npm install
   ```

2. Update the Arduino IP address in `client/src/App.tsx`:

   ```javascript
   const API_URL = "http://192.168.1.100"; // Change to your Arduino's IP
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

### Arduino Setup

1. Follow the setup instructions in [`infra/README.md`](./infra/README.md)
2. Connect the hardware as specified
3. Upload the sketch to your Arduino board
4. Note the IP address from Serial Monitor

## How it Works

### Communication Flow

```
Web UI <-> HTTP Requests <-> Arduino Server <-> LED Controls
```

The web application communicates with the Arduino via simple HTTP GET requests:

- `/on` - Turn on the lights
- `/off` - Turn off the lights
- `/pattern/rainbow` - Set the pattern to rainbow
- `/pattern/pulse` - Set the pattern to pulse
- `/pattern/twinkle` - Set the pattern to twinkle
- `/pattern/wave` - Set the pattern to wave
- `/status` - Get current status

### Hardware Requirements

- Arduino MKR WiFi 1010 (recommended) or ESP8266/ESP32 board
- WS2812B LED strip
- Analog sound sensor (microphone)
- USB power source

### Network Requirements

This setup works only when both devices (your computer/phone and the Arduino) are on the same WiFi network. To access remotely, you would need to implement:

- Port forwarding on your router
- MQTT messaging
- A cloud relay service like Ngrok

## Customization

- Adjust the number of LEDs in `infra/BonsaiLights.ino`
- Change colors and patterns by modifying the pattern functions
- Tweak the UI styling in the React components

## Limitations

- Works only on local WiFi network
- Requires manual IP configuration
- No persistent storage of settings

## License

MIT
