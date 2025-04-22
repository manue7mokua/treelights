# Arduino Configuration for Bonsai LED Controller

This directory contains the Arduino sketches and configurations for the Smart Bonsai Lights project.

## Hardware Requirements

- Arduino MKR WiFi 1010 (or compatible ESP8266/ESP32 board)
- WS2812B LED strip (or similar addressable LEDs)
- Sound sensor module (analog)
- Power supply (5V, capacity depends on number of LEDs)
- Resistors, capacitors, and wires for connecting components

## Circuit Connection

1. Connect the LED data pin to digital pin 6 on the Arduino
2. Connect the sound sensor output to analog pin A0
3. Connect power (5V) and ground to both LED strip and sound sensor

## Libraries

The following libraries need to be installed through the Arduino Library Manager:

- WiFiNINA (for MKR WiFi 1010)
- FastLED

## Setup Instructions

1. Open the `BonsaiLights.ino` file in the Arduino IDE
2. Update the WiFi credentials:
   ```cpp
   const char* ssid = "YourWiFiSSID";
   const char* password = "YourWiFiPassword";
   ```
3. Adjust LED configuration if needed:
   ```cpp
   #define LED_PIN     6
   #define NUM_LEDS    30
   #define BRIGHTNESS  150
   #define LED_TYPE    WS2812B
   #define COLOR_ORDER GRB
   ```
4. Calibrate the sound sensor threshold based on your environment:
   ```cpp
   const int soundThreshold = 700;  // Adjust based on sensitivity
   ```
5. Upload the sketch to your Arduino
6. Open the Serial Monitor to view the assigned IP address
7. Update the frontend config with this IP address

## API Endpoints

The Arduino acts as a web server with the following HTTP endpoints:

- `GET /status` - Returns the current state (on/off, pattern, battery)
- `GET /on` - Turns lights on
- `GET /off` - Turns lights off
- `GET /pattern/rainbow` - Sets rainbow pattern
- `GET /pattern/pulse` - Sets pulse pattern
- `GET /pattern/twinkle` - Sets twinkle pattern
- `GET /pattern/wave` - Sets wave pattern

## Troubleshooting

- If the LED strip doesn't light up, check power connections and data pin
- If WiFi fails to connect, verify credentials and check if the network is visible
- If sound detection doesn't work, adjust the threshold value or check sensor connections
