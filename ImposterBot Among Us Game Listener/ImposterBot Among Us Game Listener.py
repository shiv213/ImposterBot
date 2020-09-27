from ReadWriteMemory import ReadWriteMemory
from ReadWriteMemory import ReadWriteMemoryError
import pymem
from gooey import Gooey, GooeyParser
import time
from colored import stylize, attr, fg
import logging
import requests
from enum import Enum


class VoteState(Enum):
    GAME = 0
    DISCUSSION = 1
    DISCUSSION = 2
    DISCUSSION = 3
    DISCUSSION = 4


process = None
raw_pointer1 = None
raw_pointer2 = None
previous_pointer1 = None
previous_pointer2 = None
did_vote_run = None
current_state = None
previous_state = VoteState(0)
ejected = False
running = True
handle = None
pushData = {}

logging.disable(40)
try:
    handle = pymem.Pymem("Among Us.exe")
except pymem.exception.ProcessNotFound:
    exit("Among Us is not running!")

client_dll = pymem.process.module_from_name(handle.process_handle, "GameAssembly.dll").lpBaseOfDll
logging.disable(logging.NOTSET)
rwm = ReadWriteMemory()
try:
    process = rwm.get_process_by_name('Among Us.exe')
except ReadWriteMemoryError as error:
    print(error)

process.open()


# TODO Check if in game or in lobby
# TODO Save server id's to appdata
# TODO Get room code to send to db
# TODO Only mute players


# Voting States:
# -----------
# 0 - Not in voting
# 1 - Discussion/NotVoted
# 2 - Discussion/Voted // only applies for alive player
# 3 - Results
# 4 - Proceeding // looks like this doesn't happen in custom lobbies
# -----------


def pointer_loop():
    global raw_pointer1, raw_pointer2
    raw_pointer1 = VoteState(process.read(
        process.get_pointer(client_dll + 0x00DAC5B4, offsets=[0x5C, 0x48, 0xB8, 0xC, 0xC, 0x3C, 0xDB4])))
    raw_pointer2 = VoteState(process.read(
        process.get_pointer(client_dll + 0x00DA1284, offsets=[0x5C, 0x48, 0xB8, 0xC, 0xC, 0x3C, 0xE6C])))


def changes_loop():
    global previous_pointer1, previous_pointer2, current_state, previous_state, ejected
    if previous_state != current_state:
        previous_state = current_state
    if previous_pointer1 != raw_pointer1:
        previous_pointer1 = raw_pointer1
        current_state = raw_pointer1
    if previous_pointer2 != raw_pointer2:
        previous_pointer2 = raw_pointer2
        current_state = raw_pointer2
    if current_state == VoteState(3) or current_state == VoteState(4):
        current_state = VoteState(0)
        time.sleep(10)


@Gooey(program_name='ImposterBot Among Us Game Listener', image_dir='images', richtext_controls=True,
       menu=[{
           'name': 'File',
           'items': [{
               'type': 'AboutDialog',
               'menuTitle': 'About',
               'name': 'ImposterBot Among Us Game Listener',
               'description': 'Game listener to send Among Us game information to ImposterBot',
               'version': '0.0.3',
               'copyright': '2020',
               'website': 'https://github.com/shiv213/ImposterBot',
               'developer': 'https://shivvtrivedi.com/',
               'license': 'MIT'
           }]
       }, {
           'name': 'Help',
           'items': [{
               'type': 'Link',
               'menuTitle': 'ImposterBot GitHub',
               'url': 'https://github.com/shiv213/ImposterBot'
           }]
       }])
def main():
    # TODO Add option to load previous guild id
    parser = GooeyParser(description='Game listener')

    parser.add_argument(
        'guild_id',
        metavar='Server ID',
        help='Can be found using the .info command!'
    )

    parser.add_argument(
        'vc_id',
        metavar='Voice Channel ID',
        help='Can be found using the .info command!'
    )

    args = parser.parse_args()
    print(stylize("-----------------------------------------------------------------------------", attr("bold")))
    print(stylize("Thanks for checking out ImposterBot!", attr("underlined")))
    print(stylize("================================================", attr("bold")))
    print(stylize("ImposterBot is an ongoing project and is open source.", fg("green")))
    print("If you have any questions or issues or would like to learn more, check it out here:")
    print(stylize("ImposterBot GitHub.", fg("blue") + attr("bold")))
    print(stylize("https://github.com/shiv213/ImposterBot", fg("blue")))
    print(stylize("Made with <3 by Shiv Trivedi.", fg("violet") + attr("bold")))
    print(stylize("-----------------------------------------------------------------------------", attr("bold")))

    while running:
        pointer_loop()
        time.sleep(1)
        changes_loop()
        if previous_state != current_state:
            pushData["serverID"] = args.guild_id
            pushData["vcID"] = args.vc_id
            pushData["gameState"] = current_state.name
            # pushData["roomCode"] = "TESTER"
            # pushData["players"] = {}
            # pushData["players"]["red"] = "alive"
            # pushData["players"]["blue"] = "alive"
            # pushData["players"]["green"] = "alive"
            # pushData["players"]["pink"] = "alive"
            # pushData["players"]["orange"] = "alive"
            # pushData["players"]["yellow"] = "alive"
            # pushData["players"]["black"] = "alive"
            # pushData["players"]["white"] = "alive"
            # pushData["players"]["purple"] = "alive"
            # pushData["players"]["brown"] = "alive"
            # pushData["players"]["cyan"] = "alive"
            # pushData["players"]["lime"] = "alive"

            if current_state == VoteState(0):
                print(stylize("MUTED", fg("red") + attr("bold")))
            else:
                print(stylize("UNMUTED", fg("green") + attr("bold")))

            response = requests.post('https://imposter-bot.herokuapp.com/push', json=pushData)
            print("Status code: ", response.status_code)
            # db.child("guilds/" + args.guild_id).child("voteState").set(current_state)


if __name__ == '__main__':
    main()
