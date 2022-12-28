# SlamBook is a book where the person saves his favourite things etc...

### How i made this project

* [x] Server Side

* [x] npm init -y
* [x] npm i express cors dotenv bcryptjs jsonwebtoken volleyball monk nodemailer joi
* [x] Create auth route having routes like
[CreateUser, LoginUser,FetchUser]
* [x] Create Slams route haivng functionalites like [Create slam, Read Slam, Update Slam, Delete Slam]

## Description of Package we're gonna use...
* [express][to create an exprss app]
* [cors][used to make requests betwen our client and server side]
* [dotenv][here we save our credentials]
* [jsonwebtoken][used to generate token and we'll also use for session]
* [volleyball][server side logging tool]
* [monk][library to talk to our database]
* [nodemailer][to send the feedback mails to the user of SlamBook]
* [joi][for schema validation]


* [x] Client Side

* [x] Create a client folder in the root directory of the folder where our server side was created.

* [x] run create-react-app command inside the client folder like
[" create-react-app . "]

* [x] install react-router-dom library for routing.

* [x] Add BootsWatch to our project. [https://bootswatch.com/]

* [x] Create Components like [Navbar, Forms, etc...]

* [x] Create Sign Up & Sign in forms with form actions...

* [x] When the user logs in he/she should be redirected to profile page...

* [x] Create Profile page having input properties of title, description, and tag.


# Make Backend talk to our client side

* [x] using fetch for making http request to our backend.

* [x] Sign Up api testing with client side success.

* [x] Sign In api testing with client side success.

* [x] Clear the form when user hits the button.

* [x] Sign the token when the user is logged in.

* [x] When the user is not logged in show Sign Up and Sign In button.

* [x]  When the user is logged in show Logout Button. 

* [x] When the user hits the Logout button clear the localstorage.

* [x] Don't show the profile link on navbar unless the user is logged in.

* [x] Prevent the user form directly going to profile page.


* [x] Show Bootstrrap Alerts when the user Sign Up or Sign In.

* [x] When the User Sign UP or Sign In show the bootstrap alert for 3 second and then redirect to respective nav Items.


# Additions Customization
* [x] On Every valid and invalid request we're showing the bootstrap alert event.

# Now work on the making new Slams in our SlamBook

* [] Make request to Create slam api.
* [] Make request to read slam api.
* [] Make request to Update slam api.
* [] Make request to Delete slam api.