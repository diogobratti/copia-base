#!/bin/sh
HOST="eprocbdt04.tjsc.jus.br"
USUARIO="eprocdeploy"
SENHA="Kdwdfe345!ssd"
TAMANHOMB="1"
BANCO1G="eprocbd"
BANCO2G="eprocbd2g"
BANCOGM="eprocv2gm"

rm bkp_metadados.sql
rm bkp_dados.sh
rm bkp_dados.sql

echo "SET FOREIGN_KEY_CHECKS = 0; \n" > bkp_metadados.sql
echo "\n set sql_log_bin=0; \n" >> bkp_metadados.sql
echo "\n SET GLOBAL log_bin_trust_function_creators = 1; \n" >> bkp_metadados.sql
# echo "\n CREATE USER 'eprocbdmod'@'%' IDENTIFIED BY '$SENHA'; \n" >> bkp_metadados.sql
# echo "\n CREATE USER 'eprocbd2gmod'@'%' IDENTIFIED BY '$SENHA'; \n" >> bkp_metadados.sql
echo "\n GRANT ALL PRIVILEGES ON $BANCO1G.* TO 'eprocbdmod'@'%' WITH GRANT OPTION; \n" >> bkp_metadados.sql
echo "\n GRANT ALL PRIVILEGES ON $BANCO2G.* TO 'eprocbd2gmod'@'%' WITH GRANT OPTION; \n" >> bkp_metadados.sql
echo "\n FLUSH PRIVILEGES; \n" >> bkp_metadados.sql



mysqldump --host=$HOST \
    --user=$USUARIO \
    --password=$SENHA \
    --add-drop-database \
    --databases $BANCO1G $BANCO2G $BANCOGM \
    --no-data \
    --single-transaction --routines --events \
    --no-tablespaces \
    >>bkp_metadados.sql
echo "\n SET FOREIGN_KEY_CHECKS = 1; \n" >> bkp_metadados.sql
sed -i 's/10.17.43.92/localhost/g' bkp_metadados.sql


echo "echo \" use $BANCO1G; \" >> bkp_dados.sql " >> bkp_dados.sh

mysql --host=$HOST \
    --user=$USUARIO \
    --password=$SENHA \
    $BANCO1G \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USUARIO ',
            '--password=''$SENHA'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --skip-triggers ',
            '--no-tablespaces ',
            '>>bkp_dados.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('$BANCO1G')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $TAMANHOMB" \
    >>bkp_dados.sh

echo "echo \" use $BANCO2G; \" >> bkp_dados.sql " >> bkp_dados.sh

mysql --host=$HOST \
    --user=$USUARIO \
    --password=$SENHA \
    $BANCO1G \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USUARIO ',
            '--password=''$SENHA'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --skip-triggers ',
            '--no-tablespaces ',
            '>>bkp_dados.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('$BANCO2G')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $TAMANHOMB" \
    >>bkp_dados.sh

echo "echo \" use $BANCOGM; \" >> bkp_dados.sql " >> bkp_dados.sh

mysql --host=$HOST \
    --user=$USUARIO \
    --password=$SENHA \
    $BANCO1G \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USUARIO ',
            '--password=''$SENHA'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --skip-triggers ',
            '--no-tablespaces ',
            '>>bkp_dados.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('$BANCOGM')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $TAMANHOMB" \
    >>bkp_dados.sh

chmod +x bkp_dados.sh


echo "SET FOREIGN_KEY_CHECKS = 0; \n" > bkp_dados.sql
echo "\n set sql_log_bin=0; \n" >> bkp_dados.sql
./bkp_dados.sh
echo "\n SET FOREIGN_KEY_CHECKS = 1; \n" >> bkp_dados.sql
