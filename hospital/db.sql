CREATE TABLE "appointment" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "doctor_id" integer,
  "symptoms" varchar,
  "duration_min" integer,
  "date" smalldatetime,
  "status_id" integer,
  "created_at" timestamp
);

CREATE TABLE "appointment_status" (
  "id" integer PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "specialization" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "password" varchar,
  "contact_id" integer,
  "role_id" integer,
  "token_validator" varchar,
  "created_at" timestamp
);

CREATE TABLE "role" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "contact_info" (
  "id" integer PRIMARY KEY,
  "info" varchar,
  "contact_type_id" integer,
  "user_id" integer
);

CREATE TABLE "contact_type" (
  "id" integer,
  "name" varchar
);

CREATE TABLE "doctor" (
  "id" integer PRIMARY KEY,
  "user_id" integer
);

CREATE TABLE "doctor_specialization" (
  "doctor_id" integer,
  "specialization_id" integer,
  PRIMARY KEY ("doctor_id", "specialization_id")
);

CREATE TABLE "admin" (
  "id" integer PRIMARY KEY,
  "user_id" integer
);

ALTER TABLE "doctor_specialization" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id");

ALTER TABLE "doctor_specialization" ADD FOREIGN KEY ("specialization_id") REFERENCES "specialization" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("status_id") REFERENCES "appointment_status" ("id");

ALTER TABLE "contact_info" ADD FOREIGN KEY ("contact_type_id") REFERENCES "contact_type" ("id");

ALTER TABLE "contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "doctor" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "admin" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");
