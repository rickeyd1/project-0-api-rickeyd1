-- SQL Lab

-- 1.0	Setting up Oracle Chinook
-- In this section you will begin the process of working with the Oracle Chinook database
-- Task – Open the Chinook_Oracle.sql file and execute the scripts within.
-- 2.0 SQL Queries
-- In this section you will be performing various queries against the Oracle Chinook database.

-- 2.1 SELECT
-- Task – Select all records from the Employee table.
    SELECT * FROM employee

-- Task – Select all records from the Employee table where last name is King.
    SELECT * FROM employee WHERE lastname = 'King'

-- Task – Select all records from the Employee table where first name is Andrew and REPORTSTO is NULL.
    SELECT * FROM employee WHERE firstname = 'Andrew' AND reportsto IS NULL; 

-- 2.2 ORDER BY
-- Task – Select all albums in Album table and sort result set in descending order by title.
    SELECT * FROM album ORDER BY title DESC;

-- Task – Select first name from Customer and sort result set in ascending order by city
    SELECT firstname FROM customer ORDER BY city ASC;

-- 2.3 INSERT INTO
-- Task – Insert two new records into Genre table
    INSERT INTO genre (genreid, name)
	VALUES (26, 'Electro-Funk'),
		   (27, 'Classical-alternative'); 

-- Task – Insert two new records into Employee table
    INSERT INTO employee (employeeid, lastname, firstname)
    VALUES (9, 'Johnson', 'John'),
           (10, 'Loblaw', 'Bob');

-- Task – Insert two new records into Customer table
    INSERT INTO customer (customerid, lastname, firstname, email)
	VALUES (60, 'Mike', 'Prison', 'pmike@mail.com'),
		   (61, 'Schrute', 'Dwight', 'dschrute@mail.com');

-- 2.4 UPDATE
-- Task – Update Aaron Mitchell in Customer table to Robert Walter
    UPDATE customer
    SET firstname = 'Aaron', lastname = 'Mitchell'
    WHERE firstname = 'Robert' AND lastname = 'Walter';

-- Task – Update name of artist in the Artist table “Creedence Clearwater Revival” to “CCR”
    UPDATE artist
    SET name = 'CCR'
    WHERE name = 'Creedence Clearwater Revival'

-- 2.5 LIKE
-- Task – Select all invoices with a billing address like “T%”
    SELECT * 
    FROM invoice
    WHERE billingaddress LIKE 'T%';

-- 2.6 BETWEEN
-- Task – Select all invoices that have a total between 15 and 50
    SELECT * 
    FROM invoice
    WHERE total BETWEEN 15 AND 50;

-- Task – Select all employees hired between 1st of June 2003 and 1st of March 2004
    SELECT *
    FROM employee
    WHERE hiredate BETWEEN 'June 1, 2003' AND 'March 1, 2004';

-- 2.7 DELETE
-- Task – Delete a record in Customer table where the name is Robert Walter (There may be constraints that rely on this, find out how to resolve them).
    ALTER TABLE invoice
	DROP CONSTRAINT fk_invoicecustomerid

    ALTER TABLE invoice
        ADD CONSTRAINT fk_customer_id
        FOREIGN KEY (customerid) REFERENCES chinook.customer (customerid) ON DELETE CASCADE;

    ALTER TABLE invoiceline
        DROP CONSTRAINT fk_invoicelineinvoiceid

    ALTER TABLE invoiceline
        ADD CONSTRAINT fk_invoiceline_id
        FOREIGN KEY (invoiceid) REFERENCES chinook.invoice (invoiceid) ON DELETE CASCADE;

    DELETE FROM customer
    WHERE firstname = 'Robert' AND lastname = 'Walter';

-- 3.0	SQL Functions
-- In this section you will be using the Oracle system functions, as well as your own functions, to perform various actions against the database

-- 3.1 System Defined Functions
-- Task – Use a function that returns the current time.
    SELECT current_time;

-- Task – Use a function that returns the length of a mediatype from the mediatype table
    SELECT length(name) as mediaNameLen
    FROM mediatype;

-- 3.2 System Defined Aggregate Functions
-- Task – Use a function that returns the average total of all invoices
    SELECT AVG(total) as avgTotal
    FROM invoice;

-- Task – Use a function that returns the most expensive track
    SELECT MAX(unitprice) as maxUnitPrice
    FROM track

-- 7.0 JOINS
-- In this section you will be working with combing various tables through the use of joins. You will work with outer, inner, right, left, cross, and self joins.

-- 7.1 INNER
-- Task – Create an inner join that joins customers and orders and specifies the name of the customer and the invoiceId.
    SELECT customer.firstname, customer.lastname, invoice.invoiceid
    FROM customer
    INNER JOIN invoice
    ON customer.customerid = invoice.customerid;

-- 7.2 OUTER
-- Task – Create an outer join that joins the customer and invoice table, specifying the CustomerId, firstname, lastname, invoiceId, and total.
    SELECT customer.customerid, customer.firstname, customer.lastname, invoice.invoiceid, invoice.total
    FROM customer
    FULL OUTER JOIN invoice
    ON customer.customerid = invoice.customerid;

-- 7.3 RIGHT
-- Task – Create a right join that joins album and artist specifying artist name and title.
    SELECT artist.name, album.title
    FROM artist
    RIGHT JOIN album
    ON artist.artistid = album.artistid;

-- 7.4 CROSS
-- Task – Create a cross join that joins album and artist and sorts by artist name in ascending order.
    SELECT *
    FROM artist
    CROSS JOIN album ORDER BY artist.name ASC

-- 7.5 SELF
-- Task – Perform a self-join on the employee table, joining on the reportsto column.
    SELECT *
    FROM employee e
    INNER JOIN employee m ON m .employeeid = e.reportsto