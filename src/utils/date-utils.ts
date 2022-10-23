const formatDate = (d: Date): string => {
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
};

const monthYear = (d: Date): string => {
  return `${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
};

export function getStreaksFromArray(arrayOfDates: Date[]): string[][] | [] {
  const results = [];
  let gamesPlayedDayBeforeCount = 0;

  const mappedStreaks = arrayOfDates.reduce((map, date) => {
    const curDate = formatDate(date);
    map[curDate] = map[curDate] + 1 || 1;
    return map;
  }, new Map());

  const reduced = Object.keys(mappedStreaks).reduce((acc, val) => {
    if (mappedStreaks[val] > gamesPlayedDayBeforeCount) {
      acc.push(val);
      gamesPlayedDayBeforeCount = mappedStreaks[val];
    } else {
      if (acc.length > 1) results.push(acc);
      gamesPlayedDayBeforeCount = mappedStreaks[val];
      acc = [val];
    }

    return acc;
  }, []);

  if (results.length > 1) results.push(reduced);
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
