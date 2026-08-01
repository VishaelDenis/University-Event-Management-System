-- Run this ONCE, manually, against your MySQL server (e.g. via phpMyAdmin's SQL tab
-- or `mysql -u root`). It is not auto-applied by the app.
--
-- Why: the app used to connect to `event_management_db` (a leftover created by
-- Hibernate's ddl-auto=update) while schema.sql/seed.sql populate `event_management`.
-- That left a stale, inconsistent copy of the schema in event_management_db
-- (including a NOT NULL `text` column with no default on feedback/help_requests
-- that Hibernate's auto-update never cleaned up). application.properties now
-- points only at `event_management`, so the duplicate database is no longer
-- needed and should be removed to avoid the two-database split ever recurring.
--
-- Back up first if you have any data in event_management_db you still need.

DROP DATABASE IF EXISTS event_management_db;
