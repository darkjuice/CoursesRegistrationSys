#  Course Tool 
project-bonanyinteam created by GitHub Classroom

Due to unexpected issue, I have to rewrite the whole project to make my features work. Time is quite tight(nearly 10 hours) so that some features may be
not fully considered but basiclly functioning at least. Thanks Brandon for the csv files.



There are currently 12 features for my version. 
On server side : 
                1. add/drop courses  
                2. user registration
                3. email system for informing course update
                4. email system for verifying user by security code
                5. user account logging in and out
                6. password reset
             
On client side:
               1. homepage
               2. log in and out 
               3. registration
               4. announcement board
               5. add/ drop courses
               6. displaying courses schedule
               
To set the project, please unzip the zip file in node_modules forst.

To prepare the database, run the following command:

      mongoimport --db=coursetooldb --type=csv --headerline  --columnsHaveTypes --collection=profiles profiles.csv

      mongoimport --db=coursetooldb --type=csv --headerline --columnsHaveTypes --collection=courses courses.csv

      mongoimport --db=coursetooldb --type=csv --headerline --collection=captcha  captcha.csv

      mongoimport --db=coursetooldb --type=csv --headerline --collection=course_student_db    course_student_db.csv
      
      
To run my server,please open the app.mjs, then push command "npm app.mjs" and "npm mocha" respectively.

To test the server, please open another terminal and enter"npm test"

Description:

The client:  
All the client side files are in the view folder. Users information can be updated directly through the webpage.

The top right corner scrollable list contains all feaures implmented including homepage, logout, announcement board.

The home page has functions that displaying course schedule, user's schedule and add/drop courses.

The registration button is at the webpage of login for user registration.

the announcement board is at view/message_board.html and performed through model/ message_board.mjs, has to be tested manuelly.

the password rest function is at the scrollable list on top right of homepage.




The server:

1.get student information by google account(if user have) at model/user_profile line 261 This feature is part of searching user's information. allow manager to search student's information by google account(email address).

2.Get user's schedule at student.mjs This feature displays student's course schedule by obtaining user's student id.

3.generate security code at model/captch.mjs This is for generating a security code for verifing user's email address when user create an account.Also, the security code has expire time so that user can only have one vali code at a time. Then a method for checking if the code user entered is same as the code we send.

4.a email sending function at utils/emailutil.mjs
This method is for automatically send emails from our side on updating course registration, reminding and signing up. This feature is implmented by SMTPClient. We set up a google account as sender, then give authority on this account and obtain a authorized password.

5. add/drop courses is implemented in model/course_student.mjs 

6. student.mjs gathering student information on course schedule

