#!/bin/sh
mysqldump --host=eprocbdt04.tjsc.jus.br \
    --user=eprocdeploy \
    --password=Kdwdfe345!ssd \
    --databases eprocbd eprocbd2g eprocv2gm \
    --no-data \
    --compression-algorithms=zlib \
    --opt \
    --no-tablespaces \
    --compact \
    >my_backup_minimal_no_data.sql

mysql --host=eprocbdt04.tjsc.jus.br \
    --user=eprocdeploy \
    --password=Kdwdfe345!ssd \
    eprocbd \
    --skip-column-names \
    <extractDbTablesMinimal.sql \
    >my_backup_minimal_data.sh

chmod +x my_backup_minimal_data.sh

rm my_backup_minimal_data.sql

./my_backup_minimal_data.sh

# mysqldump --host=eprocbdt04.tjsc.jus.br \
#     --user=eprocdeploy \
#     --password=Kdwdfe345!ssd \
#     --databases eprocbd eprocbd2g eprocv2gm \
#     --compression-algorithms=zlib \
#     --opt \
#     --no-tablespaces \
#     --compact \
#     > my_backup_minimal_data.sql
