#include <WiFiNINA.h>
#include <FastLED.h>

// WiFi network credentials
const char* ssid = "HouseofMen";
const char* password = "YourWiFiPassword";

// LED configuration
#define LED_PIN     6
#define NUM_LEDS    30
#define BRIGHTNESS  150
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

// HTTP Server
WiFiServer server(80);

// Sound sensor pin
const int soundSensorPin = A0;
const int soundThreshold = 700;  // Adjust based on your sensor's sensitivity

// Variables to keep track of state
bool isOn = false;
String currentPattern = "rainbow";
unsigned long lastSoundCheck = 0;
const int soundCheckInterval = 50;  // Check sound every 50ms

void setup() {
  Serial.begin(9600);
  
  // Initialize LED strip
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(BRIGHTNESS);
  
  // Connect to WiFi
  connectToWiFi();
  
  // Start HTTP server
  server.begin();
  Serial.println("HTTP server started");
  
  // Turn off all LEDs initially
  turnOff();
}

void loop() {
  // Check for sound if lights are off
  if (!isOn) {
    checkForSound();
  }
  
  // Run the current pattern if lights are on
  if (isOn) {
    if (currentPattern == "rainbow") {
      rainbowPattern();
    } else if (currentPattern == "pulse") {
      pulsePattern();
    } else if (currentPattern == "twinkle") {
      twinklePattern();
    } else if (currentPattern == "wave") {
      wavePattern();
    }
  }
  
  // Check for HTTP requests
  handleClient();
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("Failed to connect to WiFi");
  }
}

void handleClient() {
  WiFiClient client = server.available();
  if (client) {
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        
        if (c == '\n') {
          // If the current line is blank, you got two newline characters in a row.
          // That's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // Send standard HTTP response header
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:application/json");
            client.println("Access-Control-Allow-Origin: *");
            client.println();
            
            // Process the request based on the path
            if (currentLine.startsWith("GET /status")) {
              sendStatus(client);
            } else if (currentLine.startsWith("GET /on")) {
              turnOn();
              client.println("{\"status\":\"on\"}");
            } else if (currentLine.startsWith("GET /off")) {
              turnOff();
              client.println("{\"status\":\"off\"}");
            } else if (currentLine.startsWith("GET /pattern/rainbow")) {
              currentPattern = "rainbow";
              client.println("{\"pattern\":\"rainbow\"}");
            } else if (currentLine.startsWith("GET /pattern/pulse")) {
              currentPattern = "pulse";
              client.println("{\"pattern\":\"pulse\"}");
            } else if (currentLine.startsWith("GET /pattern/twinkle")) {
              currentPattern = "twinkle";
              client.println("{\"pattern\":\"twinkle\"}");
            } else if (currentLine.startsWith("GET /pattern/wave")) {
              currentPattern = "wave";
              client.println("{\"pattern\":\"wave\"}");
            } else {
              // Default response
              client.println("{\"status\":\"ok\"}");
            }
            
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
    client.stop();
  }
}

void sendStatus(WiFiClient client) {
  String json = "{";
  json += "\"isOn\":" + String(isOn ? "true" : "false") + ",";
  json += "\"pattern\":\"" + currentPattern + "\",";
  json += "\"battery\":85,"; // Simulate battery level (would be read from hardware)
  json += "\"connected\":true";
  json += "}";
  
  client.println(json);
}

void turnOn() {
  isOn = true;
  FastLED.setBrightness(BRIGHTNESS);
  FastLED.show();
}

void turnOff() {
  isOn = false;
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Black;
  }
  FastLED.show();
}

void checkForSound() {
  unsigned long currentMillis = millis();
  
  if (currentMillis - lastSoundCheck >= soundCheckInterval) {
    lastSoundCheck = currentMillis;
    
    int soundValue = analogRead(soundSensorPin);
    
    if (soundValue > soundThreshold) {
      Serial.println("Sound detected!");
      turnOn();
    }
  }
}

// LED Patterns
void rainbowPattern() {
  static uint8_t hue = 0;
  
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV(hue + (i * 10), 255, 255);
  }
  
  EVERY_N_MILLISECONDS(15) {
    hue++;
  }
  
  FastLED.show();
}

void pulsePattern() {
  static uint8_t brightness = 0;
  static bool increasing = true;
  
  EVERY_N_MILLISECONDS(20) {
    if (increasing) {
      brightness++;
      if (brightness == 255) increasing = false;
    } else {
      brightness--;
      if (brightness == 0) increasing = true;
    }
    
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(150, 255, brightness); // Purple hue
    }
  }
  
  FastLED.show();
}

void twinklePattern() {
  fadeToBlackBy(leds, NUM_LEDS, 10);
  
  EVERY_N_MILLISECONDS(100) {
    int pos = random16(NUM_LEDS);
    leds[pos] += CRGB(170, 220, 255); // Light blue sparkle
  }
  
  FastLED.show();
}

void wavePattern() {
  static uint8_t wavePos = 0;
  
  EVERY_N_MILLISECONDS(50) {
    fadeToBlackBy(leds, NUM_LEDS, 20);
    
    for (int i = 0; i < NUM_LEDS; i++) {
      int sinValue = sin8((i * 16) + wavePos);
      leds[i] = CHSV(110, 255, sinValue); // Green hue
    }
    
    wavePos++;
  }
  
  FastLED.show();
} 