import eel
import wikipedia
import wolframalpha
import random
import tkinter as tk
import pyjokes
import os
import capture
from db import *

#### initializing eel web folder ####
eel.init('web')
#### connecnting to database #### 
db = database()

########## commands ###############
greeting_messge = ['hi','hello','hey','good morning','good morning','good evening','good afternoon','nice to meet you','pleased to meet you','how have you been','how’s it going','Nice to see you ','it’s great to see you','good to see you','long time no see']
manufacturer = ['who made you','what is your developer name','developer name','who created you']
joke_commands = ['tell me a joke','can you say me some joke','can you say me some jokes','joke','jokes']
greetings = ['hello there how are you ','nice to meet you ','hello ','hey ']
camera = ['launch camera','take a photo','take a picture','take a pic','open camera','capture a photo','capture a pic','capture a picture','take photo','take pic','take picture']
search_commands = ['search','search for']
help_commands = ['help','commands','hey floran what are the commands to use']

@eel.expose
def initFun():
   try:
      mode = db.get_mode()[0]
   except:
      mode = 0
   if db.count()[0] == 0:
      return 0,0

   return 1,mode
   



def check_message(text):
   if text in greeting_messge:
      return random.choice(greetings) + 'I am floran a voice assistant. How may I help you'
   elif text in manufacturer:
      return "I am created by Khan Zaki Ur Rahman a Full stack web developer"
   elif text in joke_commands:
      return jokes()
   elif text in camera:
      launch_capture()
   elif text.split(' ')[0] in search_commands:
      return browse(text)
   else:
      try:
         return wolframalpha(text)
      except:
         try:
            return wiki(text)
         except:
            return "no data found"

@eel.expose
def search(text):
   return check_message(text)

@eel.expose
def take_input(text,start=0):
   if db.count()[0] == 0:
      print("name added")
      return db.insert_username(text)
   else:
      print("name updated")
      return db.update_username(text)
      
@eel.expose
def change_theme():
   # print("theme change")
   if db.get_mode()[0] == 0:
      print("changed to dark mode")
      db.update_mode(1)
      return 1
      pass
   else:
      print("changed to light mode")
      db.update_mode(0)
      return 0
      pass


def jokes():
   return pyjokes.get_joke()

def wolframalpha(text):
   app_id = "L6YYUT-QWJLQ3KA48"
   client = wolframalpha.Client(app_id)
   res = client.query(text)
   return next(res.results).text

def wiki(text):
   return wikipedia.summary(text)

def launch_capture():
   capture.start_app()
   # os.system('python test2.py')
   pass

def browse(text):
   for i in search:
      if i in text:
         result = text.split(i)
   return result[0]



if __name__ == "__main__":
   eel.start('index.html',port=8000,cmdline_args=['--start-fullscreen'], suppress_error=True)