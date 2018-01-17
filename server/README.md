# To DO
Simple todo management

# Route List

### Auth API
List of auth routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /signin             | POST     | Sign user                    |
| /signup         | POST    | Signup                    |

### Todo API
List of todo routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /todos/            | GET     | Get all todo                   |
| /todos/:id/c         | GET    | Get todo by id                    |
| /todos/add         | POST    | Add new todo                    |
| /todos/:id         | PUT    | Edit one todo by id                    |
| /todos/complete/:id         | PUT    | Edit completion of a todo                    |
| /todos/:id         | DELETE    | Delete a todo                    |
