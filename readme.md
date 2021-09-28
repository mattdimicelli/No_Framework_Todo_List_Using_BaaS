# Readme

The purpose of this assignment was to give backend functionality to my existing ToDo app.  This would allow the ToDo lists to be accessed from any computer, not just one.  I replaced the localStorage functionality in my previous ToDo app with an implementation of a Firebase Firestore database.  I also enabled "database persistence", which essentially replicates the functionality of localStorage, since it uses a cached version of the data from the online Firestore database (if there is in fact data in the database) when the internet connection is dropped, and it updates the Firestore database once and internet connection is reestablished.

This was the first project in which I have used a backend.  I also learned about additional services that Firebase offers on the backend, such as authentification services which could allow a user to login with email/password, social media accounts, Google, etc.  A future feature of this app might be such authentification.

