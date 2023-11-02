
# Hospital Appointment Scheduler API documentation

# Content
- [Objective](#objective)
- [Features](#features)
- [API Reference Endpoints](#api-reference-endpoints)
    - [Common responses](#common-responses)
    - [User](#user)
    - [Specialization](#specialization)
    - [Doctor](#doctor)
    - [Admin](#admin)
    - [Patient](#patient)
    - [Appointment](#appointment)
    - [Derivation](#derivation)
    - [Prescription](#prescription)
- [Models](#models)
- [Errors](#errors)
- [Database](#database)
- [Tech Stack](#tech-stack)

# Objective
Create a hospital appointment scheduling system. Patients can enter their symptoms or required specialization (e.g., cardiology, surgery), and the system will find the nearest available appointment date with a doctor of the specified specialization. The system should consider doctor availability, patient load, and appointment duration.



# Features

- User management, by admin
- Appointment creation with specialization, by user
- Appointment creation with symptoms, by user
- Appointment management, by user
- Appointment derivation, by admin
- Prescription creation, by doctor
- Login system


# API Reference Endpoints

## Endpoint Authorization
Every request header should include a JWT for Authorization.

See [Auth API](https://github.com/MelnikAndres/Solvd/blob/main/hospital_auth/README.md)

```
header:
    {
        ...
        Authorization: bearer <access_token>
        ...
    }
```


## Common responses
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

If any request has an expired or invalid token, respone will be:
```
    HTTP/1.1 403 Forbidden
    Content-Type: application/json
    {ERROR_INVALID_TOKEN}
```

- see [ERROR_INVALID_TOKEN](#error-invalid-token)


## User

### Get all users
Auth requirement: Admin level

```
  GET /api/users
```

- Query parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `role` | `string` | Optional. Role filtering|
| `name` | `string` | Optional. Name filtering|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json 
        {
            "users": [
            {USER_MODEL},
            ]
        }
        
    ```
- Models
    
    see [USER_MODEL](#user-model)

### Get user
Auth requirement: Admin Level or Same User
```
  GET /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user|

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
Auth requirement: Admin Level or Same User

```
  PUT /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user|

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Optional**. username |
| `new_password` | `string` | **Optional**. new password|

- Response
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {USER_MODEL}
    ```

- Models 

    see [USER_MODEL](#user-model)


### Delete user
Auth requirement: Admin Level

```
  DELETE /api/users/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user|

- Response
    - Valid request
```
    HTTP/1.1 200 OK
```

## Specialization

### Get all specializations
Auth requirement: User level

```
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

## Doctor

### Create doctor
Auth requirement: Admin level
```
  POST /api/doctors

```

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. username|
| `password` | `string` | **Required**. password|
| `role` | `string` | **Required**. role|
| `specialization` | `string` | **Required**. doctor specialization|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```
## Patient

### Create patient
Auth requirement: Admin level
```
  POST /api/patients

```

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. username|
| `password` | `string` | **Required**. password|
| `role` | `string` | **Required**. role|
| `email` | `string` | **Optional**. patient email|
| `phone` | `string` | **Optional**. patient phone|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```
### Update patient
Auth requirement: Admin level
```
  PUT /api/patients/${id}

```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user|

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Optional**. patient email|
| `phone` | `string` | **Optional**. patient phone|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

## Admin

### Create admin
Auth requirement: Admin level
```
  POST /api/admins

```

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. username|
| `password` | `string` | **Required**. password|
| `role` | `string` | **Required**. role|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

## Appointment

### Create appointment
Auth requirement: Admin level or same user
```
  POST /api/appointments/${specialization}

```
- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `specialization`      | `integer` | **Required**. specialization needed|

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `patient_id` | `integer` | **Optional**. id of patient|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

### Get appointments
Auth requirement: Admin level or same user

```
  GET /api/appointments
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Optional**. Id of appointment|
| `doctor_id`      | `integer` | **Optional**. Id of appointment|
| `patient_id` | `integer` | **Optional**. Id of patient|
| `status` | `string` | **Optional**. appointment status|
| `from` | `date` | **Optional**. only from this date on|
| `to` | `date` | **Optional**. only until this date|


- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        [
            {APPOINTMENT_MODEL},
            {APPOINTMENT_MODEL}
        ]
    ```

- Models 

    see [APPOINTMENT_MODEL](#appointment-model)

### Update appointment
Auth requirement: Admin level

```
  PUT /api/appointment/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `integer` | **Required**. appointment id|


- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `doctor_id` | `integer` | **Optional**. doctor id|
| `status` | `string` | **Required**. appointment status|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

## Derivation

### Create derivation
Auth requirement: Admin level or same user
```
  POST /api/derivations

```

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `patient_id` | `integer` | **Required**. id of patient|
| `symptoms` | `string` | **Required**. symptoms|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

### Get derivations
Auth requirement: Admin level

```
  GET /api/derivations
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `appointment_id`      | `integer` | **Optional**. Id of appointment|
| `admin_id` | `integer` | **Optional**. Id of admin|



- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        [
            {DERIVATION_MODEL},
            {DERIVATION_MODEL}
        ]
    ```

- Models 

    see [DERIVATION_MODEL](#derivation-model)

### Update derivation
Auth requirement: Admin level

```
  PUT /api/derivations/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `integer` | **Required**. derivation id|


- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `admin_id` | `integer` | **Required**. admin id|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

## Prescription

### Create prescription
Auth requirement: doctor
```
  POST /api/prescriptions

```

- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `appointment_id` | `integer` | **Optional**. appointment id|
| `patient_id` | `integer` | **Optional**. id of patient|
| `info` | `string` | **Optional**. info about prescription|
| `medicine` | `string` | **Optional**. medicine|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
    ```

### Get patient prescriptions
Auth requirement: Admin level or same user

```
  GET /api/prescriptions/${id}
```

- Query parameters


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. patient id|



- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        [
            {PRESCRIPTION_MODEL},
            {PRESCRIPTION_MODEL}
        ]
    ```

- Models 

    see [PRESCRIPTION_MODEL](#prescription-model)

# Models 
These models are not the same as DB models, those have more data that is not shared.
#### User model 
User model may be replaced by another role model if appropriate.
Contact options are different for each user, this is just an example.
```
USER_MODEL
{
    "id": 1,
    "name":"John Doe",
    "role":"patient"
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
Doctor model contains the same as user model, but also has specialization
```
DOCTOR_MODEL
{
    ...
    "specialization":"Traumatology"
    ...
}
 ```
#### Patient model 
Patient model contains the same as user model, but also has email and phone
```
PATIENT_MODEL
{
    ...
    "email":"something@example.com",
    "phone":"123456789"
    ...
}
 ```
#### Admin model 
Admin model contains the same as user model

#### Appointment model 

```
APPOINTMENT_MODEL
{
    "id": 1,
    "doctor_id":2,
    "patient_id":3,
    "duration_min":60,
    "date":"2023-10-06 19:00:00" ,
    "status":"assigned,
    "created_at":"2023-10-06 17:00:00" 
}
 ```

#### Derivation model 

```
DERIVATION_MODEL
{
    "id": 1,
    "appointment_id":2,
    "admin_id":3,
    "symptoms":"broken leg"
}
 ```

#### Prescription model 

```
PRESCRIPTION_MODEL
{
    "id": 1,
    "appointment_id":2,
    "patient_id":3,
    "info":"1 every 12 hs",
    "medicine":"apixaban"
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

#### Error invalid token
Contains information about the problem encountered with the token.

```
ERROR_INVALID_TOKEN
{   "error": "INVALID_TOKEN",
    "cause":"expired" || "forbidden" || "invalid"
}
```


## Database

![](./db_diagram.png)

## Tech Stack

**Server:** Node, Express

**Database:** PostgreSQL

**Deployment:** Docker