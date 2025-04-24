# Shelf-Sync
This project is a web application designed to help users organize and synchronize their personal inventory across multiple devices. It provides a frontend for managing items, tracking stock, quantities, and allowing useres to add their own items.

**Link to project:** [Project Link](https://shelf-sync-a8f3efcb845b.herokuapp.com/)

![Project HomePage](/public/img/home.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, ejs, Node.js, MongoDB

The application was built using ejs and bootstrap for the front end, providing a responsive user interface. The back end is powered by Node.js and Express, with MongoDB as the database to store user data and item information.

## Optimizations
To minmize repeats, the application implements ejs include statements, pulling chunks like headers and navbars from a template.
```ejs
<%- include('/chunks/head.ejs') %>
```

## Lessons Learned:

This project reinforced my understanding of full-stack development. I learned more about Node, Express, Authentication (passport) and Databases (MongoDB). Overall, this project was a valuable learning experience in building accessible and user-friendly full-stack web applications.

![Project Edit Page](/public/img/edit.png)