# Question

Suppose you have a database with three tables: "users", "orders", and "products". The "users" table contains columns id,
name, and email. The "orders" table contains columns id, user_id, product_id, quantity, and created_at. The "products"
table contains columns id, name, price, and category.

Write a single SQL query that returns a list of all users who have made at least 3 orders in the "Electronics" category
and have spent more than $1000 on those orders, sorted by the total amount they have spent in descending order. The
output should include the user's name, email, and the total amount they have spent on "Electronics" orders.

# Answer
- users:
  - id
  - name
  - email
- orders:
  - id
  - user_id
  - product_id
  - quantity
  - created_at
- products:
  - id
  - name
  - price
  - category

```sql
WITH electronic_products AS (SELECT * FROM products WHERE category = 'Electronics')
WITH electronic_orders AS (SELECT * FROM orders WHERE product_id IN (SELECT id FROM electronic_products))
WITH user_electronic_orders AS (
    SELECT user_id, SUM(price * quantity) AS total_spent
    FROM electronic_orders 
    GROUP BY user_id 
    HAVING total_spent > 1000
)
SELECT
    users.name, 
    users.email, 
    user_electronic_orders.total_spent 
FROM users 
    JOIN user_electronic_orders ON users.id = user_electronic_orders.user_id 
ORDER BY user_electronic_orders.total_spent DESC;
```
