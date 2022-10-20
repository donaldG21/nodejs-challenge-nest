export function getStreaksFromArray(arrayOfDates: Date[]): string[][] | [] {
  const results = [];
  let gamesPlayedDayBeforeCount = 0;

  const mappedStreaks = arrayOfDates.reduce((map, date) => {
    const curDate = `${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
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

export function splitByMonthsAndYear(dates: Date[]) {
  return dates.reduce((map, date) => {
    const key = `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    (!(key in map) && (map[key] = [date])) || map[key].push(date);
    return map;
  }, new Map());
}

export function getDaysMostPlayed(dates: Date[]) {
  return mode(dates);

  function mode(array: Date[]) {
    if (array.length == 0) return null;
    const modeMap = {};
    let maxEl = `${
        array[0].getUTCMonth() + 1
      }/${array[0].getUTCDate()}/${array[0].getUTCFullYear()}`,
      maxCount = 1;
    for (let i = 0; i < array.length; i++) {
      const el = `${array[i].getUTCMonth() + 1}/${array[
        i
      ].getUTCDate()}/${array[i].getUTCFullYear()}`;
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }
}
