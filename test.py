import requests
import json

pushData = {
    "guildId": 1,
    "vcId": 123,
    "gameState": "lobby",
    "roomCode": "TESTER",
    "players": {
        "red": "alive",
        "blue": "alive",
        "green": "alive",
        "pink": "alive",
        "orange": "alive",
        "yellow": "alive",
        "black": "alive",
        "white": "alive",
        "purple": "alive",
        "brown": "alive",
        "cyan": "alive",
        "lime": "alive"
    }
}

response = requests.post('http://127.0.0.1/push', json=pushData)

print("Status code: ", response.status_code)
