#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// LED macros
#define LED_PIN     4
#define NUM_LEDS    30
CRGB leds[NUM_LEDS];
// ——— HTTP CONFIG ———
const char* ssid     = "HU-Guests";      // SSID
ESP8266WebServer server(80);             // HTTP server on port 80

// Handler for POST /led
void handleLedPost() {
  String body = server.hasArg("plain") ? server.arg("plain") : "";
  body.trim();
  
  // turn the Arduino String into a C‐string
  char buf[128];
  body.toCharArray(buf, sizeof(buf));
  
  // variables to hold parsed data
  char cmd[16];
  int idx, r, g, b;
  
  // try to scan: a word + four ints
  int got = sscanf(buf, "%15s %d %d %d %d", cmd, &idx, &r, &g, &b);
  if (got < 2) {
    server.send(400, "text/plain", "Invalid format");
    return;
  }
  
  if (strcasecmp(cmd, "led") == 0) {
    if (got != 5 || idx < 0 || idx >= NUM_LEDS) {
      server.send(400, "text/plain", "led requires idx R G B");
      return;
    }
    // set one LED to the given color
    leds[idx] = CRGB(r, g, b);
    FastLED.show();
    server.send(200, "text/plain", 
                "LED " + String(idx) + 
                " = (" + String(r) + "," + String(g) + "," + String(b) + ")");
    
  } else if (strcasecmp(cmd, "pattern") == 0) {
    if (got < 2) {
      server.send(400, "text/plain", "pattern requires at least idx");
      return;
    }
    // idx is your pattern number; you can ignore r,g,b or reserve them
    // applyPattern(idx);
    server.send(200, "text/plain", 
                "pattern " + String(idx) + " loaded");
    
  } else {
    server.send(400, "text/plain", "Unknown command");
  }
}

void setup() {
  Serial.begin(115200);
  // Connect to WiFi
  WiFi.begin(ssid /*, pass*/);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Define route
  server.on("/led", HTTP_POST, handleLedPost);
  server.begin();
  Serial.println("HTTP server started");

  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
}

void loop() {
  server.handleClient();
}
