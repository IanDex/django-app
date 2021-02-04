# django - React

<kbd>
  <img src="./login.png" alt="login" width='100%'/>
</kbd>

<br>

<br/>

### Requirements

> - BACKEND (Djagno Authentication Server)
>   - [Python 3.7](https://www.python.org/downloads/release/python-360/)
>   - [Django 3.1.6](https://docs.djangoproject.com/)
>   - [Django REST Framework 3.10.1](https://www.django-rest-framework.org/)
>   - [Django REST Framework JWT 1.11.0](https://github.com/jpadilla/django-rest-framework-jwt)
>  <br/>
> 
> - FRONTEND (React Webapp Client)
>   - [React 16.5.2](https://www.npmjs.com/package/react?activeTab=versions)
>   - [React DOM 16.5.2](https://www.npmjs.com/package/react-dom)
>   - [Material UI 4.11.1](https://material-ui.com/)
>  <br/>
> 
> - Database
>   - [SQlite3](https://www.sqlite.org/docs.html)

### Backend End-points

> - Login
> 
>   |  HTTP |  Path |  Method |  Permission 	|
>   | --- | --- | --- | --- | --- |
>   |**POST** |/login|CREATE| None |
> 
> - User
> 
>   |  HTTP |  Path |  Method |  Permission | 
>   | --- | --- | --- | --- | --- |
>   |**POST** |/user|CREATE| Access Token
> 
> - Tareas - Task
> 
>   |  HTTP |  Path |  Method |  Permission | 
>   | --- | --- | --- | --- | --- |
>   |**GET** |/todo|LIST| Access Token 
>   |**POST** |/todo|CREATE| Access Token
>   |**GET** |/todo/todo_id|READ| Access Token
>   |**PUT** |/todo/todo_id|UPDATE| Access Token
>   |**DELETE** |/todo/todo_id|DELETE| Access Token 
> 