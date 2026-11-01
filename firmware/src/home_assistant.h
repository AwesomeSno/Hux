#pragma once

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>
#include "../include/config.h"

typedef void (*StateChangeCallback)(HuxState newState);

class HomeAssistantClient {
public:
    HomeAssistantClient();
    void begin(const char* ssid, const char* password, const char* host, uint16_t port, const char* token);
    void update();
    void setStateCallback(StateChangeCallback cb);
    void startVoiceSession();
    void sendAudioChunk(const int16_t* samples, size_t count);
    void stopVoiceSession();
    bool isConnected() const;

private:
    websockets::WebsocketsClient wsClient;
    const char* wifiSsid;
    const char* wifiPassword;
    const char* haHost;
    uint16_t haPort;
    const char* haToken;

    bool wifiConnected;
    bool wsConnected;
    bool authenticated;
    uint32_t messageId;
    uint32_t lastPingTime;
    uint32_t lastReconnectAttempt;

    StateChangeCallback onStateChange;

    void handleMessage(websockets::WebsocketsMessage message);
    void connectWiFi();
    void connectWebSocket();
    void sendAuth();
};
