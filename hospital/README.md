
# Hospital Appointment Scheduler API documentation

# Objective
Create a hospital appointment scheduling system. Patients can enter their symptoms or required specialization (e.g., cardiology, surgery), and the system will find the nearest available appointment date with a doctor of the specified specialization. The system should consider doctor availability, patient load, and appointment duration.



# Features

- User management, by admin
- Specialization management, by admin
- Appointment creation with specialization, by user
- Appointment creation with symptoms, by user
- Appointment management, by user
- Appointment derivation, by admin


# API Reference Endpoints

## Common responses
If any request that requires admin key has an invalid or missing key, response will be:
```
    HTTP/1.1 403 Forbidden
```

If any request that requires an id has an invalid or missing id, response will be:
```
    HTTP/1.1 404 Not Found
```

If any request that requires a body has invalid or missing data, response will be:
```
    HTTP/1.1 400 Bad Request
    Content-Type: application/json
    {ERROR_INVALID_FIELDS}
```
- see [ERROR_INVALID_FIELDS](#error-invalid-fields)

## User

### Get all users

```http
  GET /api/users
```

- Query parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json 
        {
            "users": [
            {USER_MODEL},
            {USER_MODEL}
            ]
        }
        
    ```
- Models
    
    see [USER_MODEL](#user-model)


### Create user
Request body should contain information to create an user.
```http
  POST /api/users
  
```

- Query parameters

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `admin_key` | `string` | **Required**. Secret admin key|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {USER_MODEL}
    ```
- Models 

    see [USER_MODEL](#user-model)

### Get user

```http
  GET /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {USER_MODEL}
    ```

- Models 

    see [USER_MODEL](#user-model)

### Update user

```http
  PUT /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user|
| `admin_key` | `string` | **Optional**. Secret admin key|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {USER_MODEL}
    ```
    - If there are admin only fields and not a valid admin key
    ```
        HTTP/1.1 403 Forbidden

    ```

- Models 

    see [USER_MODEL](#user-model)


### Delete user

```http
  DELETE /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
```
    HTTP/1.1 204 No Content
```

## Specialization

### Get all specializations

```http
  GET /api/specializations
```

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json 
        {
            "users": [
            {SPECIALIZATION_MODEL},
            {SPECIALIZATION_MODEL}
            ]
        }
        
    ```
- Models
    
    see [SPECIALIZATION_MODEL](#specialization-model)

### Create specialization
Request body should contain information to create a specialization.
```http
  POST /api/specialization
  
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `admin_key` | `string` | **Required**. Secret admin key|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {SPECIALIZATION_MODEL}
    ```
- Models 

    see [SPECIALIZATION_MODEL](#specialization-model)

### Update specialization

```http
  PUT /api/specialization/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of specialization|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {SPECIALIZATION_MODEL}
    ```
- Models 

    see [SPECIALIZATION_MODEL](#specialization-model)

### Delete specialization

```http
  DELETE /api/specialization/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of specialization|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
```
    HTTP/1.1 204 No Content
```
## Doctor

### Create doctor
Request body should contain information to create a doctor.
```http
  POST /api/doctor
```

- Query parameters

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `admin_key` | `string` | **Required**. Secret admin key|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {DOCTOR_MODEL}
    ```
- Models 

    see [DOCTOR_MODEL](#doctor-model)

### Get doctor

```http
  GET /api/doctor/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of doctor|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {DOCTOR_MODEL}
    ```

- Models 

    see [DOCTOR_MODEL](#doctor-model)

### Update doctor

```http
  PUT /api/doctor/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of doctor|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {DOCTOR_MODEL}
    ```
    - If there are admin only fields and not a valid admin key
    ```
        HTTP/1.1 403 Forbidden
    ```

- Models 

    see [DOCTOR_MODEL](#doctor-model)

### Delete doctor

```http
  DELETE /api/doctor/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of doctor|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
```
    HTTP/1.1 204 No Content
```

## Appointment

### Create appointment
Request body should contain information to create an appointment.
```http
  POST /api/appointment

```

- Query parameters

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of user|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {APPOINTMENT_MODEL}
    ```
- Models 

    see [APPOINTMENT_MODEL](#appointment-model)

### Get appointment

```http
  GET /api/appointment/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of appointment|
| `uid` | `string` | **Required**. Id of user|


- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {APPOINTMENT_MODEL}
    ```

- Models 

    see [APPOINTMENT_MODEL](#appointment-model)


### Update appointment

```http
  PUT /api/appointment/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of appointment|
| `admin_key` | `string` | **Required**. Secret admin key|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {APPOINTMENT_MODEL}
    ```

    - If there are admin only fields and not a valid admin key
    ```
        HTTP/1.1 403 Forbidden

    ```

- Models 

    see [APPOINTMENT_MODEL](#appointment-model)

### Delete appointment

```http
  DELETE /api/appointment/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of appointment|
| `uid` | `string` | **Required**. Id of user|

- Response
    - Valid request
```
    HTTP/1.1 204 No Content
```
# Models 

#### User model 

```
USER_MODEL
{
    "id": "a1b2c3d4",
    "name":"John Doe",
    "email":"JohnDoe@example.com",
    "phone":"xxxx-xxxx"   
}
 ```

#### Specialization model 

```
SPECIALIZATION_MODEL
{
    "id": 1,
    "name":"Traumatology",
}
 ```

#### Doctor model 

```
DOCTOR_MODEL
{
    "id": "a1b2c3d4",
    "name":"John Doe",
    "email":"JohnDoe@example.com",
    "phone":"xxxx-xxxx",
    "specialization":"Traumatology" 
}
 ```

#### Appointment model 

```
APPOINTMENT_MODEL
{
    "id": 1,
    "user_id":"a1b2c3d4",
    "doctor":"John Doe",
    "specialization":"Traumatology",
    "symptoms":"Broken Leg",
    "duration_hs":1,
    "date":"2023-10-06 17:00:00.000" 
}
 ```
 
# Errors

#### Error invalid fields
Contains information about the fields that are causing a problem.

```
ERROR_INVALID_FIELDS
{   "error": "INVALID_FIELDS",
    "fields":{
        "fieldA" : "INVALID_FIELD",
        "fieldB" : "MISSING_FIELD"
    }
}
```

## Tech Stack

**Client:** Vanilla js

**Server:** Node, Express

**Database:** PostgreSQL

**Deployment:** Docker