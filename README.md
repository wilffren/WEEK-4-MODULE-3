# **Store Management System**

This web application, developed with HTML, CSS, and JavaScript, provides a comprehensive store management solution with user authentication, category management, financial movements tracking, and detailed reporting. It offers an intuitive interface that allows users to efficiently manage their business operations and analyze performance through interactive dashboards and reports.

## **Project Status**
✅ Complete ✅

## **🔨 Project Features 🔨**

* `Authentication System`: Secure login functionality with user validation
* `Category Management`: Create, read, update, and delete product categories
* `Financial Movements`: Track sales and purchases with detailed information
* `Interactive Reports`: Generate comprehensive reports with totals, top categories, and monthly analysis
* `Dashboard Interface`: Clean and modern UI for easy navigation
* `Data Persistence`: JSON Server integration for data storage and retrieval
* `Responsive Design`: Optimized for different screen sizes

## **Table of Contents**

* **database/** - JSON database files and configuration
  * `dbManager.json` - Main database file
  * `README.md` - Database documentation
* **src/** - Source code directory
  * **css/** - Stylesheets
    * `categories.css` - Category management styles
    * `dashboard.css` - Dashboard interface styles
    * `login.css` - Authentication page styles
    * `movements.css` - Financial movements styles
    * `report.css` - Reports page styles
  * **js/** - JavaScript files
    * `categories.js` - Category management logic
    * `dashboard.js` - Dashboard functionality
    * `guardian.js` - Authentication guard
    * `login.js` - Login system logic
    * `movements.js` - Financial movements handling
    * `report.js` - Reports generation and display
  * **services/** - API service layer
    * `categoriesService.js` - Category API calls
    * `movementsService.js` - Movements API calls
  * **views/** - HTML templates
    * `categories.html` - Category management page
    * `dashboard.html` - Main dashboard
    * `movements.html` - Financial movements page
    * `report.html` - Reports and analytics page
* **public/** - Static assets and resources
* **node_modules/** - Dependencies (generated)
* `index.html` - Main entry point
* `package.json` - Project configuration and dependencies
* `README.md` - Project documentation

## **Technologies**

* **HTML5** and **CSS3** for structure and styling
* **JavaScript (ES6+)** for application logic and interactivity
* **JSON Server** for REST API simulation and data persistence
* **Node.js** for development environment and package management
* **Fetch API** for HTTP requests and data communication

## **Installation & Setup**

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start JSON Server:
   ```bash
   json-server --watch database/dbManager.json --port 3000
   ```
4. Open `index.html` in your browser or serve with a local server

## **API Endpoints**

### **User Authentication**
* `GET /user` - User authentication data

### **Categories**
* `GET /categories` - Retrieve all categories
* `GET /categories/:id` - Retrieve specific category
* `POST /categories` - Create new category
* `PUT /categories/:id` - Update existing category
* `DELETE /categories/:id` - Delete category

### **Movements**
* `GET /movements` - Retrieve all financial movements
* `GET /movements/:id` - Retrieve specific movement
* `POST /movements` - Create new financial movement
* `PUT /movements/:id` - Update existing movement
* `DELETE /movements/:id` - Delete movement

### **Query Parameters**
* `GET /movements?type=sale` - Filter sales only
* `GET /movements?type=buy` - Filter purchases only
* `GET /movements?categoryId=:id` - Filter by category
* `GET /movements?date=:date` - Filter by specific date

## **Author**

**Wilffren Efrain Muñoz Velasquez**  
Coder by Clan Malecon

---

*This project demonstrates modern web development practices with clean architecture, RESTful API integration, and responsive user interface design.*
