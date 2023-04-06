set -e
dropdb orgarif-staging-schema || true
echo 'ok drop'
pg_dump \
  -h bjg5euhjrhastc12cumm-postgresql.services.clever-cloud.com \
  -p 5562 \
  -U u6ntkekippqttzxk2gii \
  -d bjg5euhjrhastc12cumm \
  -n public \
  --schema-only \
  > $ORGARIF_WORK_DIR/db/staging-schema.sql
createdb orgarif-staging-schema
psql -d orgarif-staging-schema < $ORGARIF_WORK_DIR/db/staging-schema.sql
