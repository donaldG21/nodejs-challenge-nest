const formatDate = (d: Date): string => {
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
};

const monthYear = (d: Date): string => {
  return `${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
};

export function getStreaksFromArray(arrayOfDates: Date[]): string[][] | [] {
  const results: string[][] = [];
  let gamesPlayedDayBeforeCount = 0;

  const mappedStreaks = arrayOfDates.reduce((map, date) => {
    const curDate = formatDate(date);
    map.set(curDate, map.get(curDate) + 1 || 1);
    return map;
  }, new Map());

  let acc: string[] = [];
  for (const key of mappedStreaks.keys()) {
    if (mappedStreaks.get(key) > gamesPlayedDayBeforeCount) {
      acc.push(key);
      gamesPlayedDayBeforeCount = mappedStreaks.get(key);
    } else {
      if (acc.length > 1) results.push(acc);
      gamesPlayedDayBeforeCount = mappedStreaks.get(key);
      acc = [key];
    }
  }

  if (acc.length > 1) results.push(acc);

  return results;
}

// Clean up and optimize algorithm to get max by month in one loop vs two.
export function getDayMostPlayedByMonth(dates: Date[]) {
  // loop over dates
  return Object.values(
    dates.reduce((map, date) => {
      // get monthYear and date keys
      const key = monthYear(date);
      const day = formatDate(date);
      // create monthYear key if does not exists
      (!(key in map) && (map[key] = { [day]: 1 })) ||
        // create or add one occurrence to date[day] count
        (map[key][day] = map[key][day] ? map[key][day] + 1 : 1);

      // set max on month
      const max = map[key].max;
      map[key].max = max ? (map[key][max] < map[key][day] ? day : max) : day;

      return map;
    }, new Map()),
    // extract max for each month
  ).map((v) => v.max);
}
