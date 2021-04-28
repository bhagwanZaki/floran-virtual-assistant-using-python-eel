"""
Entry Point to The App
"""

import logging
import os
import sys
from tkinter import Tk, messagebox
import eel
from camera import VideoCamera
import base64
import time
eel.init("web")

def show_error(title, msg):
    root = Tk()
    root.withdraw()  # hide main window
    messagebox.showerror(title, msg)
    root.destroy()


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield frame

x = VideoCamera()
@eel.expose
def video_feed():
    
    y = gen(x)
    for each in y:
        # Convert bytes to base64 encoded str, as we can only pass json to frontend
        blob = base64.b64encode(each)
        blob = blob.decode("utf-8")
        eel.updateImageSrc(blob)()
        # time.sleep(0.1)

@eel.expose
def capture_img():
    if x.capture():
        return "True"
        # os._exit(0)
        exit()

def start_app():
    eel.start('capture.html',port=8080,size=(600,600), suppress_error=True)


if __name__ == "__main__":
    start_app()