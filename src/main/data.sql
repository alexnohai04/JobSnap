select * from user_Tables;
CREATE TABLE employer (
                          id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                          name VARCHAR2(255) NOT NULL,
                          company_name VARCHAR2(255) NOT NULL,
                          email VARCHAR2(100) NOT NULL UNIQUE,
                          password VARCHAR2(255) NOT NULL
);

INSERT INTO employer (id, name, company_name, email, password)
VALUES (1, 'John Doe', 'TechCorp', 'johndoe@techcorp.com', 'employerpassword');

INSERT INTO employer (id, name, company_name, email, password)
VALUES (2, 'Costel Cost ', 'Microsoft', 'costelxx@techcorp.com', 'employerpass');

INSERT INTO employer (id, name, company_name, email, password)
VALUES (11, 'Vasile Vas ', 'Log', 'vasilevas@log.com', 'employerpass');

CREATE TABLE users (
                      id INT PRIMARY KEY,             -- User ID as primary key
                      email VARCHAR(255) NOT NULL      -- Email as a shared field across all user types
);


INSERT INTO users (id, email)
VALUES (1, 'johndoe@techcorp.com');

INSERT INTO users (id, email)
VALUES (21, 'student1@microsoft.com');

INSERT INTO users (id, email)
VALUES (11, 'vasilevas@log.com');

INSERT INTO users (id, email)
VALUES (2, 'student1@microsoft.com');

INSERT INTO users (id, email)
VALUES (3, 'johnado@microsoft.com');

INSERT INTO users (id, email)
VALUES (4, 'costelxx@techcorp.com');

select * from users;
select * from employer;

SELECT * FROM employer WHERE email = 'johnado@microsoft.com';


DELETE FROM users WHERE id = 2;
DELETE FROM profile WHERE user_id = 2;
DELETE from USERS where email = 'student1@microsoft.com';

DELETE FROM employer WHERE id = 2;

INSERT INTO profile (user_id, bio,  contact_info, first_name, last_name)
VALUES (1,'Employer at TechCorp','johndoe@techcorp.com','John', 'Doe');


INSERT INTO profile (user_id, bio,  contact_info, first_name, last_name)
VALUES (2,'Student','student1@microsoft.com','Marius', 'Marian');


INSERT INTO profile (user_id, bio,  contact_info, first_name, last_name)
VALUES (11,'Employer at Log','vasilevas@log.com','Vasile', 'Vas');

INSERT INTO profile (user_id, bio,  contact_info, first_name, last_name)
VALUES (4,'Employer at TechCorp','costelxx@techcorp.com','Costel', 'Cost');

INSERT INTO profile (user_id, bio,  contact_info, first_name, last_name)
VALUES (21,'Student','student1@microsoft.com','Costel', 'Cost');


select * from profile;
INSERT INTO student (id,email, password)
VALUES (21, 'student1@microsoft.com', 'student1');

select * from student;

SELECT * FROM student WHERE email = 'student1@microsoft.com';

drop table cv;

select * from cv;

ALTER TABLE CV
ADD user_id NUMBER;

ALTER TABLE CV
    ADD CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES profile(user_id);

CREATE SEQUENCE cv_id_seq START WITH 1 INCREMENT BY 1;
ALTER TABLE CV ADD (NEW_ID NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY);

ALTER TABLE CV DROP COLUMN ID;

SELECT constraint_name, table_name
FROM user_constraints
WHERE r_constraint_name IN (SELECT constraint_name FROM user_constraints WHERE table_name = 'CV');

ALTER TABLE PROFILE DROP CONSTRAINT FKEK4FK4J528TNQ0IU9KUADC7LH;

ALTER TABLE CV RENAME COLUMN NEW_ID TO ID;

ALTER TABLE CV DROP COLUMN id;
ALTER TABLE CV ADD id NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1);

SELECT * FROM CV WHERE user_id = 21;

ALTER TABLE CV DROP COLUMN ACHIEVEMENTS;



ALTER TABLE "CV" ADD "SUMMARY" VARCHAR2(255);

ALTER TABLE "CV" ADD "TECHNOLOGIES" VARCHAR2(255);

ALTER TABLE "CV" ADD "CERTIFICATIONS" VARCHAR2(255);

ALTER TABLE "CV" ADD "TOOLS" VARCHAR2(255);


ALTER TABLE "CV" ADD "CAMPAIGNEXP" VARCHAR2(255);

ALTER TABLE "CV" ADD "TARGETAUDIENCE" VARCHAR2(255);

ALTER TABLE "CV" ADD "PORTFOLIO" VARCHAR2(255);

ALTER TABLE "CV" ADD "CLINICALEXPERIENCE" VARCHAR2(255);

ALTER TABLE "CV" ADD "DEGREE" VARCHAR2(255);

ALTER TABLE "CV" ADD "AWARDS" VARCHAR2(255);

ALTER TABLE "CV" ADD "CVTYPE" VARCHAR2(255);


ALTER TABLE CV DROP COLUMN CVTYPE;

ALTER TABLE "CV" ADD "IMAGE_PATH" VARCHAR(255);

ALTER TABLE CV DROP COLUMN IMAGE_PATH;

ALTER TABLE "CV" ADD "IMAGE_PATH"  CLOB;

select * from CV;

SELECT * FROM CV WHERE id = 39;


commit;