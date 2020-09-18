import ctypes
from ctypes import wintypes
from ReadWriteMemory import ReadWriteMemory
from ReadWriteMemory import ReadWriteMemoryError
import struct
import win32gui
import win32process
import pymem
import time
from multiprocessing import Process

# import psutil
#
# for proc in psutil.process_iter(['pid', 'name', 'username']):
#     if proc.info['name'] == 'Among Us.exe':
#         amongus_pid = proc.info['pid']
#
# print(amongus_pid)

process = None
client_dll = None
raw_pointer1 = None
raw_pointer2 = None
previous_pointer1 = None
previous_pointer2 = None
did_vote_run = None
current_state = None
previous_state = None
ejected = False

hWnd = win32gui.FindWindow(0, "Among Us")
pid = win32process.GetWindowThreadProcessId(hWnd)
handle = pymem.Pymem()
handle.open_process_from_id(pid[1])

list_of_modules = handle.list_modules()
while list_of_modules is not None:
    tmp = next(list_of_modules)
    # print(tmp.name)
    if tmp.name == "GameAssembly.dll":
        # print(tmp)
        client_dll = tmp.lpBaseOfDll
        break

rwm = ReadWriteMemory()
try:
    process = rwm.get_process_by_name('Among Us.exe')
except ReadWriteMemoryError as error:
    print(error)

process.open()

VoteStates = {1: "NotVoted", 2: "Voted", 3: "Results", 4: "Proceeding"}


# -----------
# 1 - Discussion/NotVoted
# 2 - Discussion/Voted
# 3 - Results
# 4 - Proceeding

def pointer_loop():
    global raw_pointer1, raw_pointer2
    raw_pointer1 = process.read(
        process.get_pointer(client_dll + 0x00DAC5B4, offsets=[0x5C, 0x48, 0xB8, 0xC, 0xC, 0x3C, 0xDB4]))
    raw_pointer2 = process.read(
        process.get_pointer(client_dll + 0x00DA1284, offsets=[0x5C, 0x48, 0xB8, 0xC, 0xC, 0x3C, 0xE6C]))
    time.sleep(1)


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

    if current_state == 4 and previous_state == 3:
        time.sleep(7)
        current_state = 0


while True:
    pointer_loop()
    changes_loop()
    # print("previous, current")
    # print(previous_pointer1, "       ", raw_pointer1)
    # print(previous_pointer2, "       ", raw_pointer2)
    # print(previous_state, "       ", current_state)
    # print('=====')
    print(current_state)
    print('-')


# print(value.to_bytes(4, 'little'))
# print(struct.unpack('f', value.to_bytes(4, 'little')))
process.close()
