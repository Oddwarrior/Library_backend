# Library Management
This Peoject was deveoped during Workindia hiring process. (SDE API Round )

## Problem Statement
Hey there, Mr. X. You have been appointed to design a library management system for your college, where users can browse different
books and can book a specific book for a particular time period.
Before booking, check if the book is available for borrowing. Also, give the user the next date from which the book will be available next in
case it is already booked.
For eg: If a book is booked with the “issue_time” as “2023-01-01T12:00:00Z” and “return_time” as “2023-01-02T12:00:00Z” then the
“next_available_time” for this book will be “2023-01-02T12:00:00Z”.
Do not accept any bookings for an already borrowed book. Make a robust and optimal system to handle multiple bookings simultaneously.
If more than 1 users simultaneously try to book books, only either one of the users should be able to book. Handle such race conditions
while booking.
There is a Role Based Access provision and 2 types of users would exist :
1. Admin - can perform all operations like adding books, updating books, etc.
2. Login users - can check all the books, book availability, book books, etc.
Tech Stack:
1. Any web server of your choice (Python Flask / Django, NodeJS Express / Koa, Java, etc)
2. Database: MySQL/PostgreSQL (Compulsory)
