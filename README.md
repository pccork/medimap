# Medimap

A web application for healthcare workers to log their training in different institutions.

## Project Overview
- **Name:** Medimap  
- **Version:** 1.1.0 (Testing Version)  
- **Description:** A Medimap app developed for the **HDip in Computer, WIT**  
- **Author:** [Peter Chuk] https://github.com/pccork/medimap  
- **License:** ISC  
- **Repository:** [GitHub - Medimap](https://github.com/pccork/medimap)  

## Features
- User login with their username and email address 
- User enter their training location/ institution with the related eircode
- User enter each department that they have trained, the email address of the department and contact number
- Entries will  be stored with each user login
- This app use TTD to build and update new features
-JWT token is used to secure API accessing the Node backend


##Main dependencies
- User authentication using **JWT & Hapi-auth**
- Training log management for healthcare workers
- **Cloud Atlas MongoDB** database integration
- Hapi.js server with **Swagger API documentation**
- Template rendering with **Handlebars**
- Lightweight **LowDB** for local data storage 
- see package.json for other dependencies

## Installation & Setup
### **Clone the Repository**
```sh
git clone https://github.com/pccork/medimap.git
cd medimap

## Future Development

The following features are planned for upcoming releases:

### **Version 1.2.0 - Planned Features**
- [ ] **Connect the eircode to the google map API to produce a map of direction for trainee
- [ ] **User Roles & Permissions** – Admins, Trainers, and Healthcare Workers will have different access levels.
- [ ] **Automated certificate ** – Send training certificate to email account.
- [ ] **Added information related to training** – including starting and finished date and content summary of training 
- [ ] **Advanced Analytics Dashboard** – Visualize training completion statistics.

### **Long-Term Roadmap**
- [ ] **Mobile App Integration** – Develop a companion mobile app.
- [ ] **Offline Mode** – Allow users to log training without an internet connection.

### Acknowledgements
- [ ] **Lecture Eamonn de Lestar -teaching the construction of this app and providing the template for this application 
- [ ] **other lectures in H Dip in computer sciences Waterford Institute of Technology (WIT)
