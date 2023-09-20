CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    "login_tokens" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkUserId" uuid NOT NULL,
        "token" text,
        "expiredAt" timestamptz,
        "ip" varchar(50),
        "userAgent" varchar,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "users" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        -- "role" VARCHAR(50) NOT NULL ,
        "gender" VARCHAR,
        "password" VARCHAR NOT NULL,
        "dob" DATE,
        "contactNo" BIGINT,
        "city" VARCHAR,
        "email" VARCHAR NOT NULL UNIQUE,
        "address" VARCHAR (50),
        "physicalAddress" VARCHAR(50),
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "admin" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        -- "fkUserId" uuid NOT NULL,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR NOT NULL UNIQUE,
        "password" BIGINT NOT NULL,
        "confirmPassword" BIGINT NOT NULL,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz
    );

CREATE TABLE
    "student" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkUserId" uuid NOT NULL,
        "fkDepartmentId" uuid NOT NULL,
        -- "fkSessionId" uuid ,
        -- "fkProgramId" uuid ,
        "registrationNo" VARCHAR,
        "program" VARCHAR,
        "session" VARCHAR,
        "isActive" VARCHAR,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE Table
    "curriculum" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkProgramId" uuid,
        "fkCourseId" uuid,
        "year" INTEGER,
        "actions" VARCHAR,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE Table
    "data_entry" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "name" VARCHAR(20) NOT NULL,
        "department" VARCHAR,
        "program" VARCHAR,
        "batch" VARCHAR,
        "semester" VARCHAR,
        "course" VARCHAR,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE Table
    "available_resources" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "course" VARCHAR,
        "studentCount" BIGINT,
        "classRoomCapacity" BIGINT,
        "whiteboard" BIGINT,
        "projector" BIGINT,
        "labInformation" BIGINT,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "faculty"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkDepartmentId" uuid NOT NULL,
        "fkTeacherId" uuid NOT NULL,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "teacher"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkUserId" uuid NOT NULL,
        "fkDepartmentId" uuid NOT NULL,
        "designation" VARCHAR,
        "areaOfSpecialization" VARCHAR,
        "joiningDate" timestamptz,
        "experience" VARCHAR,
        "coursesOffering" VARCHAR,
        "teachingPlan" VARCHAR,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "department"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        -- "fkUserId" uuid,
        -- "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz -- "createdBy" uuid
    );

CREATE TABLE
    "execution" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "topic" VARCHAR,
        "teacherLearningStrategy" VARCHAR,
        "assessmentStrategy" VARCHAR,
        "correspondingClos" VARCHAR,
        "week" VARCHAR(10),
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "examination"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "courseCode" VARCHAR(10),
        "courseComponent" VARCHAR,
        "curriculumContent" INTEGER,
        "contactHours" BIGINT,
        "NoCredits" BIGINT,
        "peos" VARCHAR,
        "po" VARCHAR,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "assessment" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "assessmentType" VARCHAR,
        "assessmentTools" VARCHAR,
        "marksDistribution" BIGINT,
        "cloAssessed" VARCHAR,
        "bloomsCategory" VARCHAR,
        "subTotal" BIGINT,
        "createdAt" timestamptz NOT NULL,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "courses" (
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkUserId" uuid,
        "fkDepartmentId" uuid,
        "fkProgramId" uuid,
        "courseCode" BIGINT NOT NULL,
        "courseTitle" VARCHAR NOT NULL,
        "creditHours" VARCHAR,
        "actions" VARCHAR,
        "Pre_Req" VARCHAR,
        "courseType" VARCHAR,
        "department" VARCHAR,
        "courseOutline" VARCHAR,
        "reference_Book" VARCHAR,
        "curriculum" VARCHAR,
        "CLO" VARCHAR,
        "token" VARCHAR,
        "expiredAt" timestamptz,
        -- "userAgent" jsonb,
        "createdAt" timestamptz,
        "updatedAt" timestamptz
    );

CREATE TABLE
    "programs"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "semesters" BIGINT NOT NULL,
        -- "fkUserId" uuid,
        -- "fkDepartmentId" uuid,
        -- "fkCurriculumId" uuid,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "session"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        -- "fkUserId" uuid,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "curriculumSemesters"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkCurriculumId" uuid,
        "semester" BIGINT,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    );

CREATE TABLE
    "curriculumSemesterCourses"(
        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        "fkCourseId" uuid,
        "fkCurriculumSemesterId" uuid,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz,
        "createdBy" uuid
    )