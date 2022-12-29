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

* [x] Add BootsWatch to our project. [https://bootswatch.com/]

* [x] install react-router-dom library for routing.

* [x] Setup Routing on nav items.

* [x] Create Components like [Navbar, Forms, etc...]

* [x] Create Sign Up & Sign in forms with form actions...

* [x] Show Bootstrap alerts component on every valid and invalid request

* [x] Use useContext api.

* [x] When the user logs in he/she should be redirected to profile page...

* [x] Profile page should have input properties of title, description, and tag.


# Additions Customization
* [x] On Every valid and invalid request we're showing the bootstrap alert event.
* [x] Before Deploying on web remove the logs.
* [x] Use mongodb atlas.
* [x] Make Broswer Side Validations.

# Now work on the making new Slams in our SlamBook

* [x] Make request to Create slam api.
* [x] Make request to read slam api.
* [x] Make request to Update slam api.
* [x] Make request to Delete slam api.
* [x] Show our Users on About us Page.

# To Update Your Slam
1. Click on Update
2. Change Your title, tag, or Description...
3. Hit the Make Chage Button.
4. Delete that duplicate slam.

* [x] All New Chagees are done...