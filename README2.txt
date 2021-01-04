1. What project you are working on
CONNECT 4

2. The name of both partners, if applicable
JEREMY PIERCE-LORD AND SAAJID ALIYAR

3. Instructions that specify how to setup, run, and test your server
In order to run node js, first install node js. After installing node js, you will need to go to connect4server.js,
and in console using (ctrl+tilda), type in npm innit. Afterwards, to run the node js server, type in node connect4server.js to run the server.
You MUST also have socket.io installed.
To do the socket.io installation, 
npm innit
>npm i socket.io
>npm i --save-dev nodemon // nodemon automatically refresshse
>npm run devStart

THESE MUST BE DONE IN ORDER TO RUN THE SERVER ^ 

Once this is done, you may proceed to login, and test the connect-4 game, as long as the chatbox.

4. A description of the files the TA should look at to evaluate your business logic code

Please view game.js, #mainPageTestStyle, #loginPageStyle css and html pages.
This is for the connect-4 pages.

In order to view the node js and socket io server, please open : 
connect4server.js
script.js


5. A description of anything the TA should look at to evaluate any of the additional
expectations that you have addressed in the submission

INSTEAD OF AJAX WE USED SOCKET.IO TO IMPLEMENT THE CHAT FEATURE AND CONSTANTLY REFRESH THE SITE TO UPDATE THE CHAT

script.js and connect4server.js - WE ADDED 2 FRAMEWORKS. EXPRESS AND SOCKET IO IN THIS PROJECT CHECKIN
script.js has all chat functionality inside the script.
connect4server.js has all node js servers and socket io servers. 
Chat works, however it refreshes the connect-4 game everytime and the socket session is cancelled.
In the next check-in we plan to use sessions in order to keep the same user within the same session so messages can be relayed back and forth.

Whoever is marking our project, if you can give us some insight as to why our socket.io framework keeps refreshing the entire page everytime it had been run
We'd really appreciate it, as we were lost on this part of the assignment and we would really benefit from a point in the right direction.
Thank you!

We plan on using a rest API in order to create an authentication system. 
Where users will type in their usernames and passwords and through this, 
they will be able to login securely. The API we will most likely go with is 
FUSIONAUTH which is an authentication system used to connect with our database. 
We will be using mySql to create the database.


//cha
