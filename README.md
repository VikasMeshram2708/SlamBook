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


# Make backedn talk to our client side

* [x] using fetch for making http request to our backend

* [x] Sign Up api testing with client side success