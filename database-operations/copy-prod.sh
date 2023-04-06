set -e
dropdb orgarif-prod-copy || true
echo 'ok drop'
pg_dump \
  -h bosuon7gzjgeh6baag99-postgresql.services.clever-cloud.com \
  -p 5132 \
  -U urojwyxdqjtja3e595mz \
  -d bosuon7gzjgeh6baag99 \
  -n public \
  > $ORGARIF_WORK_DIR/db/prod-copy.sql
createdb orgarif-prod-copy
psql -d orgarif-prod-copy < $ORGARIF_WORK_DIR/db/prod-copy.sql
