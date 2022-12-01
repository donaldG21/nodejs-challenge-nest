import { SQL } from 'sql-template-strings';

export const DAY_MOST_PLAYED_PER_MONTH = SQL`
  SELECT DISTINCT on (month)
      TO_CHAR(date, 'MM/DD/YYYY') AS date,
      TO_CHAR(date, 'MM/YYYY') AS month
  FROM (
      SELECT
          DATE_TRUNC('day', played_at AT TIME ZONE 'UTC')::DATE AS date,
          COUNT(*) as count
      FROM game
      GROUP BY date
  ) q
  ORDER BY month, count DESC;
`.query;
