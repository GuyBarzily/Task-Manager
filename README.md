setup instruction:
client:
### `npm install`
### `npm start`

server:
### `npm install`
### `node server.js`

.env file was sent on submition email

Implimanted features : 
- Add new tasks easily (the user can add fast task with only a title, this task will be on the todo list on defualt)
- Organize tasks into simple projects or categories (the user has the abillity to add new lists acording to his preference)
- Mark tasks as complete (as a user completes a task the app will draw a line on the task showing it as completed)
- Find tasks when Alex needs them (there is a search bar in order to search for tasks in all lists)
- sorting (the app allows the user to sort by deadline, priority or completed tasks, acs and decs for each option)
- As tasks move from "todo" to "done," Alex should feel a sense of progress and accomplishment (a toaser is triggered when comleting a task)
- collaberaion (the app alows several clients to work together and the data is being fetched in an interval to make sure the data is up to date)
- Edit task was created in order to allow changes after fast task was created
- Each list has visible value which allows Alex to hide unrelvent lists acording to his needs


Future features :
- the next steps will be implamenting log in and user validtions in order to see which users are working togther and maybe hide some of the lists from certian users
- show and create connection between tasks



App technologies:
- the client side is a react app
- graphql is responsible for the queries and mutations
- the server side in a node.js server using express and mongoDB


server repo link : https://github.com/GuyBarzily/Task-Manager-Server




