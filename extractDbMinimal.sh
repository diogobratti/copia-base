#!/bin/sh
HOST="eprocbdt04.tjsc.jus.br"
USER="eprocdeploy"
PASSWORD="Kdwdfe345!ssd"
MBSIZE="1"

rm my_backup_minimal_no_data.sql
rm my_backup_minimal_data.sh
rm my_backup_minimal_data.sql

echo "SET FOREIGN_KEY_CHECKS = 0; \n" > my_backup_minimal_no_data.sql
echo "\n set sql_log_bin=0; \n" >> my_backup_minimal_no_data.sql
echo "\n SET GLOBAL log_bin_trust_function_creators = 1; \n" >> my_backup_minimal_no_data.sql
# echo "\n CREATE USER 'eprocbdmod'@'%' IDENTIFIED BY '$PASSWORD'; \n" >> my_backup_minimal_no_data.sql
# echo "\n CREATE USER 'eprocbd2gmod'@'%' IDENTIFIED BY '$PASSWORD'; \n" >> my_backup_minimal_no_data.sql
echo "\n GRANT ALL PRIVILEGES ON eprocbd.* TO 'eprocbdmod'@'%' WITH GRANT OPTION; \n" >> my_backup_minimal_no_data.sql
echo "\n GRANT ALL PRIVILEGES ON eprocbd2g.* TO 'eprocbd2gmod'@'%' WITH GRANT OPTION; \n" >> my_backup_minimal_no_data.sql
echo "\n FLUSH PRIVILEGES; \n" >> my_backup_minimal_no_data.sql



mysqldump --host=$HOST \
    --user=$USER \
    --password=$PASSWORD \
    --add-drop-database \
    --databases eprocbd eprocbd2g eprocv2gm \
    --no-data \
    --single-transaction --routines --events \
    --no-tablespaces \
    >>my_backup_minimal_no_data.sql
echo "\n SET FOREIGN_KEY_CHECKS = 1; \n" >> my_backup_minimal_no_data.sql
sed -i 's/10.17.43.92/localhost/g' my_backup_minimal_no_data.sql

rm my_backup_minimal_data.sh

echo "echo \" use eprocbd; \" >> my_backup_minimal_data.sql " >> my_backup_minimal_data.sh

mysql --host=$HOST \
    --user=$USER \
    --password=$PASSWORD \
    eprocbd \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USER ',
            '--password=''$PASSWORD'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --routines --events ',
            '--no-tablespaces ',
            '>>my_backup_minimal_data.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('eprocbd')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $MBSIZE" \
    >>my_backup_minimal_data.sh

echo "echo \" use eprocbd2g; \" >> my_backup_minimal_data.sql " >> my_backup_minimal_data.sh

mysql --host=$HOST \
    --user=$USER \
    --password=$PASSWORD \
    eprocbd \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USER ',
            '--password=''$PASSWORD'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --routines --events ',
            '--no-tablespaces ',
            '>>my_backup_minimal_data.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('eprocbd2g')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $MBSIZE" \
    >>my_backup_minimal_data.sh

echo "echo \" use eprocv2gm; \" >> my_backup_minimal_data.sql " >> my_backup_minimal_data.sh

mysql --host=$HOST \
    --user=$USER \
    --password=$PASSWORD \
    eprocbd \
    --skip-column-names \
    -e "SELECT 
            CONCAT('mysqldump --host=$HOST ',
            '--user=$USER ',
            '--password=''$PASSWORD'' ',
            table_schema, ' ', table_name, ' ',
            '--no-create-db ',
            '--no-create-info ',
            '--single-transaction --routines --events ',
            '--no-tablespaces ',
            '>>my_backup_minimal_data.sql ',
            ' ')
        FROM information_schema.TABLES 
        WHERE table_schema in ('eprocv2gm')
            AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
            AND round(((data_length + index_length) / 1024 / 1024), 2) < $MBSIZE" \
    >>my_backup_minimal_data.sh

chmod +x my_backup_minimal_data.sh


echo "SET FOREIGN_KEY_CHECKS = 0; \n" > my_backup_minimal_data.sql
echo "\n set sql_log_bin=0; \n" >> my_backup_minimal_data.sql
./my_backup_minimal_data.sh
echo "\n SET FOREIGN_KEY_CHECKS = 1; \n" >> my_backup_minimal_data.sql
