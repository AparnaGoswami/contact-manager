
Contact Manager — Full-Stack CRUD App

A simple and clean Contact Manager Web Application built using HTML, CSS, JavaScript, Node.js, Express, and JSON storage / local data.

This project allows users to add, update, delete, and view contacts with a smooth UI and a fully functional backend.

=> Features

1. Add new contacts

2. Edit existing contacts

3. Delete contacts

4. View all saved contacts

5. Backend using Node.js + Express

6. Data stored in JSON file / server storage

7. Responsive and simple UI


=> Tech Stack
- Frontend

  HTML5
  CSS3
  JavaScript (Vanilla)

- Backend

  Node.js
  Express.js
  JSON storage


=>Screenshots

[contact page](https://github.com/AparnaGoswami/contact-manager/blob/main/contact-manager.png)

📁 Project Structure
contact-manager/
│── public/
│     ├── index.html
│     ├── style.css
│     ├── script.js
│
│── node_modules/
│── package.json
│── package-lock.json
│── server.js
│── README.md 


=>How to Run the Project Locally
1. Clone the repository
git clone https://github.com/AparnaGoswami/contact-manager.git

2. Install dependencies
npm install

3. Start the server
node server.js

4. Open the project

Visit:

http://localhost:5000

=> API Endpoints
Method	Endpoint	Description
GET	/contacts	Get all contacts
POST	/contacts	Add a new contact
PUT	/contacts/:id	Update a contact
DELETE	/contacts/:id	Delete a contact

=>Future Improvements

1.User authentication
2.Search & filter contacts
3.Cloud database (MongoDB)
4.Deploy frontend + backend
