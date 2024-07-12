# INSTRUCTIONS TO BE FOLLOWED FOR TESTING THIS WEBSITE........

Step 1. install node.js (https://nodejs.org/en/download/prebuilt-installer/current)
Step 2. install mongodb (https://www.mongodb.com/try/download/community-kubernetes-operator)
Step 3. Download any IDE (vs code).....
Download live server extension in vs code
Open your root folder containing all the code files in vs code
open terminal in vs code
change your current path to root folder (if it was not) using cd command
Step 4. install some npm packages using command given below (run command in terminal)
npm install express
npm install mongoose
npm install cors
Step 5. Run backend server using command "node server.mjs"
Step 6. Open mongodb and click on connect.
Step 7. now in mondodb click on e-libary/books. you can add all the books here.
Step 8. now open index.html in vs code, right click on it and click on open with live server.

Now you can run all the function in the website like, sighup, signin, admin login, adding and deleting books(only for admin), search and issue books ,etc...

Step 9. For seting admin Name and password => open mongosh => open terminal in bottom left cornor => and use command below......
"db.Admin.insertOne({Name:"Your name",Password:"your password"})
Now you can use above Name and Password for admin login...

    Registered user data stored in e-library/cre.
    user data who issued their book stored in e-library/issued.
