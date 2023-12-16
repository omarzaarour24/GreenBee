insert into company (name,email,phone_number) values ('ProfitFlow','profitflow@test.com',123456),('Green-Bee','greenbee@test.com',123456);

insert into customer (name,email,phone_number,company_id) values ('vecci','vecci@test.com',123456,2),
    ('Seb','seb@test.com',123456,1),
    ('Thomas','thomas@test.com',123456,1),
    ('Omar','omar@test.com',123456,2),
    ('Joao','joao@test.com',123456,2);

insert into converter (status,customer_id) values ('Online',1),
                                                  ('Online',1),
                                                  ('Online',1),
                                                  ('Online',1),
                                                  ('Offline',2),
                                                  ('Online',2),
                                                  ('Error',3),
                                                  ('Online',3),
                                                  ('Online',4),
                                                  ('Online',4),
                                                  ('Offline',5),
                                                  ('Offline',5);

insert into ticket (customer,status,note,date,address,converter_id) values (1,'Open','No Connection to system','2022-01-12','Green-bee,7417DH Deventer',5),
    (2,'Closed','Unknown','2022-01-12','Green-bee,7417DH Deventer',7),
    (2,'Open','No connection to solar panels','2022-01-12','Green-bee,7417DH Deventer',11),
    (3,'Open','No data','2022-01-12','Green-bee,7417DH Deventer',12);