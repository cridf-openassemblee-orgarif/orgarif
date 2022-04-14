set -e
dropdb orgarif-prod-schema || true
echo 'ok drop'
pg_dump -h bosuon7gzjgeh6baag99-postgresql.services.clever-cloud.com -p 5132 -U urojwyxdqjtja3e595mz -d bosuon7gzjgeh6baag99 \
  -n public --schema-only > $ORGARIF_WORK_DIR/db/prod-schema.sql
createdb orgarif-prod-schema
psql -d orgarif-prod-schema < $ORGARIF_WORK_DIR/db/prod-schema.sql
