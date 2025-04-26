# ESP32 Configuration for Bonsai LED Controller (WiFi Version)

This directory contains the Arduino sketches and configurations for the Smart Bonsai Lights project using WiFi connectivity with an ESP32.

## Hardware Requirements

- ESP32 Development Board (NodeMCU, WROOM, DevKit, etc.)
- WS2812B LED strip (or similar addressable LEDs)
- Sound sensor module (analog)
- Power supply (5V, capacity depends on number of LEDs)
- Optional: Voltage divider for battery monitoring

## Circuit Connection

1. **LED strip connection**:

   ```
   LED Strip      ESP32
   -----------------------------
   VCC            External 5V (not from ESP32)
   GND            GND (common with ESP32)
   DIN            Pin 5 (GPIO5)
   ```

2. **Sound sensor connection**:

   ```
   Sound Sensor   ESP32
   -----------------------------
   VCC            3.3V
   GND            GND
   OUT            Pin 34 (GPIO34)
   ```

3. **Battery monitoring** (optional):
   ```
   Battery        ESP32
   -----------------------------
   +              Voltage divider → Pin 35 (GPIO35)
   -              GND
   ```

## Libraries

The following libraries need to be installed through the Arduino Library Manager:

- WiFi (built-in with ESP32)
- ESPAsyncWebServer (https://github.com/me-no-dev/ESPAsyncWebServer)
- AsyncTCP (https://github.com/me-no-dev/AsyncTCP)
- FastLED
- ArduinoJson

## Setup Instructions

1. Open the `BonsaiLights.ino` file in the Arduino IDE
2. Install the ESP32 board support package if you haven't already:

   - In Arduino IDE: File → Preferences → Additional Boards Manager URLs
   - Add: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   - Tools → Board → Boards Manager → Search for ESP32 and install

3. Select your ESP32 board model:

   - Tools → Board → ESP32 → (Your board model)

4. Update WiFi credentials in the sketch:

   ```cpp
   const char* ssid = "YourWiFiName";      // Update with your WiFi name
   const char* password = "YourPassword";   // Update with your WiFi password
   ```

5. Adjust LED configuration if needed:

   ```cpp
   #define LED_PIN     5
   #define NUM_LEDS    50
   #define BRIGHTNESS  150
   #define LED_TYPE    WS2812B
   #define COLOR_ORDER GRB
   ```

6. Calibrate the sound sensor threshold based on your environment:

   ```cpp
   #define SOUND_THRESHOLD 1800  // Adjust based on sensitivity
   ```

7. Upload the sketch to your ESP32
8. Open Serial Monitor (115200 baud) to see the assigned IP address
9. Update the frontend app with this IP address to connect

## API Endpoints

The ESP32 serves a RESTful API with the following HTTP endpoints:

- `GET /status` - Returns the current state (JSON with isOn, pattern, battery, sound)
- `GET /on` - Turns lights on
- `GET /off` - Turns lights off
- `GET /pattern/rainbow` - Sets rainbow pattern
- `GET /pattern/twinkle` - Sets twinkle pattern
- `GET /pattern/pulse` - Sets pulse pattern
- `GET /pattern/wave` - Sets wave pattern
- `GET /sound/on` - Enables sound activation
- `GET /sound/off` - Disables sound activation

## Testing the API

You can test the API using a web browser or tools like cURL:

1. Get status: `http://[ESP32-IP-ADDRESS]/status`
2. Turn on lights: `http://[ESP32-IP-ADDRESS]/on`
3. Set pattern: `http://[ESP32-IP-ADDRESS]/pattern/rainbow`

Example cURL command:

```
curl http://192.168.1.100/status
```

## Troubleshooting

- **WiFi Connection Issues**:

  - Check SSID and password in the sketch
  - Make sure the ESP32 is within range of your WiFi router
  - Some networks may block IoT devices, check your router settings

- **LED Issues**:

  - If the LED strip doesn't light up, check power connections and data pin
  - Verify power supply is adequate for the number of LEDs
  - ESP32 uses 3.3V logic, but WS2812B accepts this as a HIGH signal

- **Sound Detection Problems**:

  - ESP32 ADC is less linear than Arduino's, calibration is important
  - Adjust the threshold value based on your sound sensor sensitivity
  - Use Serial Monitor to print sound values and determine a good threshold

- **Server Issues**:
  - The AsyncWebServer library handles most stability issues
  - If the ESP32 becomes unresponsive, adding a watchdog timer can help
  - For production use, consider implementing OTA (Over-The-Air) updates
