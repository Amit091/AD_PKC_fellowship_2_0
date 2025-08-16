# College API Demo

A comprehensive HTML/JavaScript project to demonstrate HTTP API usage for the college management system. This project provides a beautiful, modern UI to test all the available college API endpoints.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete colleges
- **Modern UI/UX**: Beautiful responsive design with animations
- **Real-time API Testing**: Interactive interface for all endpoints
- **Error Handling**: Comprehensive error messages and success feedback
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📋 API Endpoints Covered

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/colleges`              | Get all colleges        |
| GET    | `/colleges/detail/:id`   | Get college by ID       |
| GET    | `/colleges/search/:name` | Search college by name  |
| POST   | `/colleges/create`       | Create new college      |
| PUT    | `/colleges/update/:id`   | Update existing college |
| DELETE | `/colleges/delete/:id`   | Delete college          |

## 🛠️ Setup Instructions

### Prerequisites

1. **Express Server**: Make sure your Express server is running
   ```bash
   cd ../demo-express-app
   npm install
   npm start
   ```
   The server should be running on `http://localhost:3000`

2. **MySQL Database**: Ensure your MySQL database is set up with the `colleges` table

### Running the Demo

**Method 1: Using Local Server (Recommended)**
1. **Install dependencies**:
   ```bash
   cd college-api-demo
   npm install
   ```

2. **Start the demo server**:
   ```bash
   npm start
   ```

3. **Open in browser**: Go to `http://localhost:8080`

**Method 2: Direct HTML (May have CORS issues)**
1. **Open the HTML file**: Simply open `index.html` in your web browser
   - Double-click on `index.html`, or
   - Right-click and select "Open with" → Your preferred browser

2. **Test the APIs**: Use the interactive interface to test all endpoints

## 🎯 How to Use

### 1. Get All Colleges
- Click the "Fetch All Colleges" button
- View all colleges in the database

### 2. Get College by ID
- Enter a college ID in the input field
- Click "Get College" to fetch specific college details

### 3. Search College by Name
- Enter a college name in the search field
- Click "Search College" to find colleges with matching names

### 4. Create New College
- Fill in the college name and address
- Click "Create College" to add a new college to the database

### 5. Update College
- Enter the college ID you want to update
- Provide the new name and address
- Click "Update College" to modify the existing college

### 6. Delete College
- Enter the college ID you want to delete
- Click "Delete College" (you'll get a confirmation prompt)
- Confirm to permanently delete the college

## 🔧 Configuration

If your Express server runs on a different port, update the `API_BASE_URL` in `script.js`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/colleges';
```

## 🎨 Features Highlights

- **Visual Feedback**: Color-coded responses (green for success, red for errors)
- **Loading States**: Spinner animations during API calls
- **Form Validation**: Client-side validation before API calls
- **Keyboard Support**: Press Enter in input fields to trigger actions
- **Confirmation Dialogs**: Safety prompts for destructive operations
- **JSON Formatting**: Pretty-printed API responses
- **Responsive Grid**: Adapts to different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **`net::ERR_BLOCKED_BY_CLIENT` Error**: 
   - **Cause**: Browser extensions (ad blockers) or CORS policy blocking requests
   - **Solution**: Use the local server method (`npm start`) instead of opening HTML directly
   - **Alternative**: Disable ad blockers or add localhost to whitelist

2. **CORS Errors**: 
   - **Cause**: Cross-origin requests blocked when opening HTML file directly
   - **Solution**: Your Express server should have CORS enabled (already configured):
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

3. **Connection Refused**: 
   - **Cause**: Express API server not running
   - **Solution**: Ensure your Express server is running on port 3000:
   ```bash
   cd demo-express-app
   npm start
   ```

4. **No Data Returned**: 
   - **Cause**: Empty database or connection issues
   - **Solution**: Make sure your MySQL database has the `colleges` table with sample data

5. **Port Conflicts**: 
   - **Demo server**: Runs on port 8080
   - **API server**: Runs on port 3000
   - Make sure both ports are available

### Testing Tips

- Use the browser's Developer Tools (F12) to view console logs
- Check the Network tab to see actual HTTP requests
- Use the `testAllEndpoints()` function in the browser console for automated testing

## 🎉 Sample Data

To test the APIs, you can add some sample data to your database:

```sql
INSERT INTO colleges (name, address) VALUES 
('MIT', 'Cambridge, MA'),
('Stanford University', 'Stanford, CA'),
('Harvard University', 'Cambridge, MA'),
('University of Oxford', 'Oxford, UK');
```

## 📱 Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🎯 Learning Objectives

This demo helps you understand:
- HTTP methods (GET, POST, PUT, DELETE)
- Fetch API usage in JavaScript
- Async/await patterns
- Error handling in web applications
- RESTful API design principles
- Modern web UI/UX patterns

## 📝 Notes

- All API calls include proper error handling
- The interface provides real-time feedback for all operations
- The design follows modern web standards and accessibility guidelines
- The code is well-commented for educational purposes

Happy testing! 🚀
