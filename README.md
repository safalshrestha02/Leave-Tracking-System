# Leave Tracking System
![image](https://user-images.githubusercontent.com/118807784/225554717-ca22abde-3412-461f-a43a-7854be9c24ef.png)

Leave Tracking System is a web application that can be used by any used company to track and manage their workers on leave. This web application provides users with various features such as managing leave settings, approving and denying leave requests, viewing past leave requests, and many more features that can help both clients and workers to organize and automate leave requests.

## Authors

- [@Safal Shrestha](https://github.com/safalshrestha02)
- [@Ishan Ghimire](https://github.com/ishanghimire11)
- [@Shardul Gautam](https://github.com/FeNriR0077)
- [@Trishan Wagle](https://github.com/trishan6969)
- [@Suraj Khadka](https://github.com/Magiciaan)

## Run Locally

Clone the project

```bash
  git clone git@github.com:safalshrestha02/Leave-Tracking-System.git
```

Go to the project directory

```bash
  cd Leave-Tracking-System
```

Install dependencies

```bash
  npm install
```
Update your environment variables

```bash
  .env
```

Start the server

```bash
  npm start
```
## Documentation

[Bootcamp Documentation](https://documenter.getpostman.com/view/25413848/2s93JxqLse)

[Project Documentation](https://docs.google.com/document/d/1tUjvT6PisofZ6HykF0o8lusBas0aaBbwEQydqwJAPPU/edit)

[User Manual](https://docs.google.com/document/d/15z7FSdhNns73CiY1aP-R7QbMnzu8qcT9Bn1zfg61m7s/edit)
		

## Tech Stack

**Client:** HTML <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/640px-HTML5_logo_and_wordmark.svg.png" alt="html" width="30" height="30">, CSS <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" alt="css" width="30" height="30">, Vanilla JavaScript <img src="https://i0.wp.com/theicom.org/wp-content/uploads/2016/03/js-logo.png?fit=500%2C500&ssl=1&w=640" alt="js" width="30" height="30">, 

**Server:** Node <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node" width="30" height="30">, Express <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0qyJTwB8XfTM3S1I5mnA3u4ZULyp4PblCKQ55-SkL&s" alt="express" width="30" height="30">, MongoDB <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg" alt="mongo" width="30" height="30">

**Version Control:** GIT <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png" alt="git" width="50" height="30">, Github <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github" width="30" height="30">

![tech stack](https://user-images.githubusercontent.com/118807784/225589848-dc155dd0-1231-4df4-ac32-362936758d46.png)

## API Specifications

### Client Authentication
- Authentication will be ton using JWT/cookies
	- JWT and cookie should expire in 3 days
- Register Client
	- Unique client ID
	- Unique company name
	- Password will be hashed and stored
- Client Login
	 - Client can login with email and password
	 - Once logged in, a token will be sent along with a cookie (jwt = xxx)
 	 - Plain text password will compare with stored hashed password
- Get Active Client
	- Route to get the currently logged in user (via token)
- Add Worker
	- Add Worker to your company
	- Add unique worker ID
	- Default password is set to test1234
	- Password will be hashed and stored
- Fotgot/Reset Password
	- User can request to reset password
	- A hashed token will be emailed to the users registered email address
	- A put request can be made to the generated url to reset password
	- The link/token will expire after 10 minutes
- Change Password
	- User must be logged in to change password
	- Has three fields Current Password, New Password, Confirm Password
- Delete Worker
- Logout 	
	- Set cookie to none (jwt = none)
- Reject Unapproved Leaves
	- If leave req goes past the current date it will change the status to rejected

### Client GET APIs
- Get all Clients
	- Lists out all the client
- Get worker of Specific Client
	- Takes current logged in clients objectID
	- Lists all the workers of that client
	- Pagination, Search, Sort
- Leave History of Workers
	- Takes current logged in clients objectID
	- Lists leave request of the company's workers
	- Filter, Search
- Manage Leaves
	- Approve and reject leaves
	- Filter
- Suggest ID
	- Checks all the worker IDs of a comapany
	- Suggests IDs that are not taken
	- Suggests 5 digit number

### Worker Authentication
- Authentication will be ton using JWT/cookies
	- JWT and cookie should expire in 3 days
- Worker Login
	 - Worker can login with worker ID and password
	 - Once logged in, a token will be sent along with a cookie (jwt = xxx)
 	 - Plain text password will compare with stored hashed password
- Get Active Worker
	- Route to get the currently logged in user (via token)
- Fotgot/Reset Password
	- Worker can request to reset password
	- A hashed token will be emailed to the users registered email address
	- A put request can be made to the generated url to reset password
	- The link/token will expire after 10 minutes
- Change Password
	- Worker must be logged in to change password
	- Has three fields Current Password, New Password, Confirm Password
- Logout 	
	- Set cookie to none (jwt = none)

### Leave Requests
- Apply for Leave
	- Worker must be logged in
- Delete Leave Requests
	- Worker can delete pending and upcomming leave
- Approve Leave
	- Client must me logged in
	- Will set leave status to "Approved" or "Rejected"
- Reject Unapproved Leaves
	- If leave req goes past the current date it will change the status to rejected

### Worker GET APIs
- Get all workers
	- Lists all the workers
- Get leaves of specific worker
	- Takes current logged in worker's objectID as param
	- Lists all the leave requests of the worker
	- Pagination, Filter
- Get All Leave Requests
	- Lists all the leave requests of all workers

## Screenshots

![client](https://user-images.githubusercontent.com/118807784/225829412-64570914-cda9-478d-8912-0449c17576b7.gif)
![worker](https://user-images.githubusercontent.com/118807784/225829869-c8787c06-d1a5-418b-9505-3368322a69e4.gif)




