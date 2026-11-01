#include "home_assistant.h"

HomeAssistantClient::HomeAssistantClient()
    : wifiSsid(nullptr),
      wifiPassword(nullptr),
      haHost(nullptr),
      haPort(8123),
      haToken(nullptr),
      wifiConnected(false),
      wsConnected(false),
      authenticated(false),
      messageId(1),
      lastPingTime(0),
      lastReconnectAttempt(0),
      onStateChange(nullptr) {}

void HomeAssistantClient::begin(const char* ssid, const char* password, const char* host, uint16_t port, const char* token) {
    wifiSsid = ssid;
    wifiPassword = password;
    haHost = host;
    haPort = port;
    haToken = token;

    connectWiFi();

    wsClient.onMessage([this](websockets::WebsocketsMessage msg) {
        this->handleMessage(msg);
    });

    wsClient.onEvent([this](websockets::WebsocketsEvent event, String data) {
        if (event == websockets::WebsocketsEvent::ConnectionOpened) {
            wsConnected = true;
        } else if (event == websockets::WebsocketsEvent::ConnectionClosed) {
            wsConnected = false;
            authenticated = false;
        }
    });
}

void HomeAssistantClient::setStateCallback(StateChangeCallback cb) {
    onStateChange = cb;
}

void HomeAssistantClient::connectWiFi() {
    if (WiFi.status() == WL_CONNECTED) {
        wifiConnected = true;
        return;
    }

    WiFi.mode(WIFI_STA);
    WiFi.begin(wifiSsid, wifiPassword);
}

void HomeAssistantClient::connectWebSocket() {
    if (!wifiConnected || wsConnected) return;

    char url[128];
    snprintf(url, sizeof(url), "ws://%s:%d/api/websocket", haHost, haPort);
    wsClient.connect(url);
}

void HomeAssistantClient::sendAuth() {
    StaticJsonDocument<256> doc;
    doc["type"] = "auth";
    doc["access_token"] = haToken;

    String json;
    serializeJson(doc, json);
    wsClient.send(json);
}

void HomeAssistantClient::startVoiceSession() {
    if (!authenticated) return;

    StaticJsonDocument<256> doc;
    doc["id"] = messageId++;
    doc["type"] = "assist_pipeline/run";
    doc["start_stage"] = "stt";
    doc["end_stage"] = "tts";
    doc["input"]["sample_rate"] = MIC_SAMPLE_RATE;

    String json;
    serializeJson(doc, json);
    wsClient.send(json);

    if (onStateChange) onStateChange(STATE_LISTENING);
}

void HomeAssistantClient::sendAudioChunk(const int16_t* samples, size_t count) {
    if (!wsConnected || !authenticated) return;
    wsClient.sendBinary((const char*)samples, count * sizeof(int16_t));
}

void HomeAssistantClient::stopVoiceSession() {
    if (!authenticated) return;

    StaticJsonDocument<128> doc;
    doc["id"] = messageId++;
    doc["type"] = "assist_pipeline/finish";

    String json;
    serializeJson(doc, json);
    wsClient.send(json);

    if (onStateChange) onStateChange(STATE_THINKING);
}

void HomeAssistantClient::handleMessage(websockets::WebsocketsMessage message) {
    if (message.isText()) {
        StaticJsonDocument<1024> doc;
        DeserializationError error = deserializeJson(doc, message.data());
        if (error) return;

        const char* type = doc["type"];
        if (!type) return;

        if (strcmp(type, "auth_required") == 0) {
            sendAuth();
        } else if (strcmp(type, "auth_ok") == 0) {
            authenticated = true;
            if (onStateChange) onStateChange(STATE_IDLE);
        } else if (strcmp(type, "event") == 0) {
            const char* eventType = doc["event"]["type"];
            if (!eventType) return;

            if (strcmp(eventType, "stt-start") == 0) {
                if (onStateChange) onStateChange(STATE_LISTENING);
            } else if (strcmp(eventType, "stt-end") == 0) {
                if (onStateChange) onStateChange(STATE_THINKING);
            } else if (strcmp(eventType, "tts-start") == 0) {
                if (onStateChange) onStateChange(STATE_SPEAKING);
            } else if (strcmp(eventType, "tts-end") == 0) {
                if (onStateChange) onStateChange(STATE_SUCCESS);
            }
        }
    }
}

void HomeAssistantClient::update() {
    uint32_t now = millis();

    // Check Wi-Fi state
    if (WiFi.status() == WL_CONNECTED) {
        wifiConnected = true;
    } else {
        wifiConnected = false;
        wsConnected = false;
        authenticated = false;
        if (now - lastReconnectAttempt > 5000) {
            lastReconnectAttempt = now;
            WiFi.reconnect();
        }
        return;
    }

    // Check WebSocket state
    if (!wsConnected) {
        if (now - lastReconnectAttempt > 3000) {
            lastReconnectAttempt = now;
            connectWebSocket();
        }
    } else {
        wsClient.poll();

        // Keep-alive ping every 15 seconds
        if (now - lastPingTime > 15000) {
            lastPingTime = now;
            wsClient.ping();
        }
    }
}

bool HomeAssistantClient::isConnected() const {
    return wifiConnected && wsConnected && authenticated;
}
