#!/bin/sh
mysqldump --host=eprocbdd01.tjsc.jus.br \
    --user=eprocbddapp \
    --password=Teste1eproc! \
    --databases eprocbdd \
    --ignore-table=eprocbdd.documento_blob \
    --compression-algorithms=zlib \
    --opt \
    --no-tablespaces \
    --compact \
    --where="1 limit 1000" \
    > my_backup.sql

mysqldump --host=eprocbdd01.tjsc.jus.br \
    --user=eprocbddapp \
    --password=Teste1eproc! \
    eprocbdd documento_blob \
    --no-data \
    --no-create-db \
    --compression-algorithms=zlib \
    --opt \
    --no-tablespaces \
    --compact \
    --where="1 limit 1000" \
    >> my_backup.sql

# mysqldump --host=localhost \
#     --user=sequelize \
#     --password=Secret#123456 \
#     --databases sequelize \
#     --ignore-table=sequelize.AUX_CLASSES_CNJ \
#     --compression-algorithms=zlib \
#     --opt \
#     --routines \
#     --flush-logs \
#     --where="1 limit 1000" > my_backup.sql