# RS_nodejsAPI_SQL_Project
A Node.js RESTful API for managing media entries in a MySQL database. It supports CRUD operations for creating, reading, updating, and deleting media records by mobile number or media ID. Built with Express.js for easy integration. To set up, clone the repo, install dependencies, and configure the database settings.



================ DETAIL EXPLAINTION ================

Let's go through a detailed step-by-step explanation of how your Node.js Media Management API works, starting from the server setup to handling requests and interacting with the database:

---

### 1. **Setting Up the Project and Server (index.js)**

The entry point of the application is `index.js`. This is where the Express app is created, and routing is set up.

```js
const express = require('express'); // Importing the Express library
const mediaRoutes = require('./routes/mediaRoutes'); // Importing the media routes

const app = express(); // Creating an instance of the Express application
app.use(express.json()); // Middleware to parse incoming requests with JSON payloads

app.use('/api', mediaRoutes); // Registering media routes under the '/api' endpoint

const PORT = process.env.PORT || 3000; // Setting up the port for the server to listen on
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Starting the server and listening on the specified port
});
```

#### Breakdown:
1. **Express Setup**: `express.json()` middleware is used to handle incoming JSON requests. This enables the API to parse and process data sent in JSON format.
2. **Routing Setup**: The `mediaRoutes` is applied at the `/api` base URL, meaning all media-related routes will start with `/api/`.
3. **Server Listening**: The server starts listening on the specified port (either from an environment variable or default to 3000).

---

### 2. **Routing: Defining Endpoints (mediaRoutes.js)**

The routes for the API are defined here using `express.Router()`. Each route corresponds to a specific HTTP method (POST, GET, PUT, DELETE) and is mapped to a function in the controller.

```js
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Define routes and map them to controller functions

// Create a new media entry
router.post('/media', mediaController.createMedia);

// Get media entry by mobile number
router.get('/media/:mobile_number', mediaController.getMediaByMobileNumber);

// Update media entry by mobile number
router.put('/media/:mobile_number', mediaController.updateMediaByMobileNumber);

// Delete media entry by media ID
router.delete('/media/:media_id', mediaController.deleteMediaByMediaId);

module.exports = router;
```

#### Breakdown:
1. **POST /media**: This endpoint is used to create a new media entry. The request is handled by `createMedia` in the controller.
2. **GET /media/:mobile_number**: This endpoint retrieves media data by mobile number using `getMediaByMobileNumber`.
3. **PUT /media/:mobile_number**: This allows updating media data based on the mobile number. Handled by `updateMediaByMobileNumber`.
4. **DELETE /media/:media_id**: Deletes a media entry using the media ID. Handled by `deleteMediaByMediaId`.

---

### 3. **Handling Logic: Controllers (mediaController.js)**

The controller functions are responsible for processing the incoming requests and interacting with the model to perform database operations. Each controller function has a specific role based on the route.

#### a) **Creating a New Media Entry (createMedia)**

```js
exports.createMedia = (req, res) => {
  const { mobile_number, phone_number_id, media_id, filename } = req.body;

  const mediaData = { mobile_number, phone_number_id, media_id, filename };

  Media.create(mediaData, (err, result) => {
    if (err) return res.status(500).send(err); // Error handling
    res.status(201).send({ message: 'Media entry created successfully', data: result });
  });
};
```

- **Step-by-Step**:
  1. Extract data from the request body.
  2. Call `Media.create` (from the model) to insert this data into the database.
  3. If successful, send back a response with a status of 201 (created) and the result.

#### b) **Fetching Media by Mobile Number (getMediaByMobileNumber)**

```js
exports.getMediaByMobileNumber = (req, res) => {
  const { mobile_number } = req.params;

  Media.findByMobileNumber(mobile_number, (err, result) => {
    if (err) return res.status(500).send(err); // Error handling
    if (result.length === 0) return res.status(404).send({ message: 'No entry found' }); // No data found
    res.status(200).send(result); // Return found data
  });
};
```

- **Step-by-Step**:
  1. Extract the mobile number from the URL parameter.
  2. Use `Media.findByMobileNumber` to search the database.
  3. If a record is found, send it back; otherwise, return a 404 status if not found.

#### c) **Updating Media by Mobile Number (updateMediaByMobileNumber)**

```js
exports.updateMediaByMobileNumber = (req, res) => {
  const { mobile_number, media_id, filename } = req.body;

  const mediaData = { mobile_number, media_id, filename };

  Media.updateByMobileNumber(mediaData, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'No entry found to update' });
    res.status(200).send({ message: 'Media entry updated successfully' });
  });
};
```

- **Step-by-Step**:
  1. Extract the mobile number, media ID, and filename from the request body.
  2. Call `Media.updateByMobileNumber` to update the entry.
  3. Handle responses accordingly: either success, error, or not found.

#### d) **Deleting Media by Media ID (deleteMediaByMediaId)**

```js
exports.deleteMediaByMediaId = (req, res) => {
  const { media_id } = req.params;

  Media.deleteByMediaId(media_id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'No entry found to delete' });
    res.status(200).send({ message: 'Media entry deleted successfully' });
  });
};
```

- **Step-by-Step**:
  1. Extract the media ID from the URL parameter.
  2. Call `Media.deleteByMediaId` to delete the entry from the database.
  3. Send the appropriate response based on success or failure.

---

### 4. **Database Queries: Model (mediaModel.js)**

The model interacts directly with the MySQL database to execute SQL queries.

```js
const database = require('../config/db');

const Media = {
  create: (mediaData, callback) => {
    const query = `INSERT INTO media_data (mobile_number, phone_number_id, media_id, filename) VALUES (?, ?, ?, ?)`;
    database.query(query, [mediaData.mobile_number, mediaData.phone_number_id, mediaData.media_id, mediaData.filename], callback);
  },

  findByMobileNumber: (mobile_number, callback) => {
    const query = `SELECT * FROM media_data WHERE mobile_number = ?`;
    database.query(query, [mobile_number], callback);
  },

  updateByMobileNumber: (mediaData, callback) => {
    const query = `UPDATE media_data SET media_id = ?, filename = ? WHERE mobile_number = ?`;
    database.query(query, [mediaData.media_id, mediaData.filename, mediaData.mobile_number], callback);
  },

  deleteByMediaId: (media_id, callback) => {
    const query = `DELETE FROM media_data WHERE media_id = ?`;
    database.query(query, [media_id], callback);
  }
};

module.exports = Media;
```

#### Breakdown:
1. **create**: Inserts a new record into the `media_data` table.
2. **findByMobileNumber**: Fetches records where the `mobile_number` matches the provided value.
3. **updateByMobileNumber**: Updates a record based on the mobile number.
4. **deleteByMediaId**: Deletes a record based on the media ID.

---

### 5. **Database Connection (db.js)**

This file manages the connection to the MySQL database using the `mysql2` package.

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ptspl123',
  database: 'curd'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
```

#### Breakdown:
1. **mysql.createConnection**: Establishes a connection to the MySQL database.
2. **connection.connect**: Attempts to connect, logging any errors or a success message.

---

### Conclusion

The Media Management API uses Express.js to define routes and handle HTTP requests. These requests are processed by controller functions, which call model methods to interact with a MySQL database. Each model function executes the appropriate SQL query to perform CRUD operations on the media data.






+++++++++++++++++ THANK YOU +++++++++++++++++