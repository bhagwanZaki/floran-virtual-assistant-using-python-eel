# Floran Virtual Assistant

Floran virtual assistant is a desktop assistant that can you in many tasks like search some information, doing mathematical equation, even tell you a joke or take a picture.

In python eel the frontend is handle by the html js and the backend is handle by python<br>
For more info go to <a href="https://github.com/ChrisKnott/Eel">here</a>

In floran virtual assistant the voice to text is done by javascript instead of python and opencv is used for taking the picture and storing them. It also read the message for you


## Library use
<ul>
    <li>Python eel</li>
    <li>Wolframalpha</li>
    <li>Wikipedia</li>
    <li>pyjokes</li>
    <li>Opencv</li>
    
</ul>

## Feature

### Greeting

Try Saying "hey" or "hey floran" or "nice to meet you"

### Get information

To get information just say the query like 
<br> If you want to get information about naruto Try saying Naruto uzumaki and the floran will give you information.<br> you can also ask time or temperature like what is time or what is temperature of mumbai

### Telling jokes

Try to say 'tell me a joke','can you say me some joke','can you say me some jokes' 

### To take picture

Try to say launch camera

### To search something on google

Try to say search / search for `<your query>`

### Solve maths

you can enter your equation 

### Change theme

you can either toggle or say change theme

### Change voice

You can also change the voice of floran from setting

### To stop floran from saying the message 

just type or say stop 

## Installation 

```python
  pip install Eel, wikipedia, wolframalpha, opencv-python, pyjokes
 ```

Now in order to use the wolframaplha you need wolframalpha api id
I am not included my api id

Follow the step to get the api id and replace `<<YOUR API ID>>` 
<ol>
    <li><p>To get started, you must register a Wolfram ID and sign in to the <a href="https://developer.wolframalpha.com/portal/">Wolfram|Alpha Developer Portal</a>..</p></li>
    <li> Upon logging in, go to the My Apps tab to start creating your first app</li>
    <li>Click the Sign up to get your first AppID button to start the app creation process.</li>
    <li>After a one-time survey about intended usage, the AppID creation dialog will appear.</li>
    <li> Give your application a name and a simple description to register an AppID.</li>
    <li> Each application must have its own unique AppID</li>
</ol>

then 
```python
    python main.py
```

## Important point

There is an issue in the wikipedia module which has been solved but the developer as not yet launch its new version so they might be some issue you face. Like if you say india or naruto it will give you an error but program will not crash

