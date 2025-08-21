SELECT 
    Customers.CustomerID,
    Customers.CustomerName,
    COUNT(*) AS TotalOrders,
    MAX(Orders.OrderDate) AS LastOrderDate
FROM 
    Orders
INNER JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY 
    Customers.CustomerID, Customers.CustomerName
HAVING 
    COUNT(*) > 5
ORDER BY 
    TotalOrders DESC;