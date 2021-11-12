/* checking size of it */
-- select sum(MB_Size)
-- from (
--         SELECT table_schema,
--             table_name,
--             round(((data_length + index_length) / 1024 / 1024), 2) `MB_Size`
--         FROM information_schema.TABLES
--         WHERE table_schema in ('eprocbd', 'eprocbd2g', 'eprocc2gm')
--             AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
--             AND round(((data_length + index_length) / 1024 / 1024), 2) < 1
--         order by 3 asc
--     ) x;
-- SELECT table_schema,
--     table_name,
--     round(((data_length + index_length) / 1024 / 1024), 2) `MB_Size`
-- FROM information_schema.TABLES
-- WHERE table_schema in ('eprocbd', 'eprocbd2g', 'eprocc2gm')
--     AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
--     AND round(((data_length + index_length) / 1024 / 1024), 2) < 1
-- order by 3 asc
SELECT 
    CONCAT('mysqldump --host=eprocbdt04.tjsc.jus.br ',
    '--user=eprocdeploy ',
    '--password=''Kdwdfe345!ssd'' ',
    table_schema, ' ', table_name, ' ',
    '--no-create-db ',
    '--no-create-info ',
    '--compression-algorithms=zlib ',
    '--opt ',
    '--compact ',
    '--no-tablespaces ',
    '>>my_backup_minimal_data.sql ',
    ' ')
FROM information_schema.TABLES 
WHERE table_schema in ('eprocbd','eprocbd2g','eprocc2gm')
     AND round(((data_length + index_length) / 1024 / 1024), 2) IS NOT NULL
     AND round(((data_length + index_length) / 1024 / 1024), 2) < 1
