CREATE TYPE "appointment_status" AS ENUM (
  'not_derivated',
  'assigned',
  'finished'
);

CREATE TYPE "specialization" AS ENUM (
  'cardiology',
  'neurology',
  'pediatrics',
  'dermatology',
  'oncology'
);

CREATE TYPE "role" AS ENUM (
  'user',
  'admin',
  'doctor'
);

CREATE TYPE "contact_type" AS ENUM (
  'phone',
  'email',
  'social'
);

CREATE TABLE "appointment" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "doctor_id" integer,
  "symptoms" varchar,
  "duration_min" integer,
  "date" smalldatetime,
  "status" appointment_status,
  "created_at" timestamp
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "password" varchar,
  "contact_id" integer,
  "role" role,
  "token_validator" varchar,
  "created_at" timestamp
);

CREATE TABLE "contact_info" (
  "id" integer PRIMARY KEY,
  "info" varchar,
  "contact_type" contact_type,
  "user_id" integer
);

CREATE TABLE "doctor" (
  "id" integer PRIMARY KEY,
  "user_id" integer
);

CREATE TABLE "doctor_specialization" (
  "doctor_id" integer,
  "specialization" specialization,
  PRIMARY KEY ("doctor_id", "specialization")
);

CREATE TABLE "admin" (
  "id" integer PRIMARY KEY,
  "user_id" integer
);

ALTER TABLE "doctor_specialization" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id");

ALTER TABLE "contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "doctor" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "admin" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
