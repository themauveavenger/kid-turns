function dailyTurn() {
  const DateTime = luxon.DateTime;

  const getToday = () => {
    return DateTime.local().set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
  }

  const turnOrders = [
    ["Iris", "Terra", "Rose"],
    ["Rose", "Iris", "Terra"],
    ["Terra", "Rose", "Iris"],
    ["Iris", "Rose", "Terra"],
    ["Terra", "Iris", "Rose"],
    ["Rose", "Terra", "Iris"]
  ];

  const startDay = DateTime.fromISO("2023-10-22");
  const now = getToday();

  // Calculate the difference in hours between startDay and now
  const hoursDifference = now.diff(startDay, "hours").as("hours");
  console.log("hoursDifference", hoursDifference);

  // Calculate the number of 12-hour intervals
  const twelveHourIntervals = Math.floor(hoursDifference / 12);
  console.log("twelveHourIntervals", twelveHourIntervals);

  // find the remainder of hoursDifference / 6
  const remainder = twelveHourIntervals % 6;

  // use the remainder to pick the correct turn order
  console.log("remainder", remainder);

  const turnOrder = turnOrders[remainder];

  // find the last three turn orders
  /** @type {string[][]} */
  let lastThreeTurns = [];
  let counter = remainder - 1;
  while (lastThreeTurns.length < 3) {
    if (counter < 0) {
      counter = turnOrders.length - 1 ;
    }

    lastThreeTurns.push(turnOrders[counter]);
    counter -= 1;
  }

  // find the next three turn orders
  counter = remainder + 1;

  /** @type {string[][]} */
  let nextThreeTurns = [];
  while (nextThreeTurns.length < 3) {
    if (counter > turnOrders.length - 1) {
      counter = 0
    }

    nextThreeTurns.push(turnOrders[counter]);
    counter += 1;
  }

  turnOrder.forEach((kid) => {
    document.getElementById("turnOrderList").innerHTML += `<li>${kid}</li>`;
  });

  console.log(nextThreeTurns);
  console.log(lastThreeTurns);

  let d = getToday();
  lastThreeTurns.forEach((turn) => {
    d = d.minus({ hours: 12 });
    const turnStr = d.toFormat("cccc t") + " -- " + turn.join(", ").trim();
    document.getElementById("lastTurns").innerHTML += `<li>${turnStr}</li>`;
  });

  d = getToday();
  nextThreeTurns.forEach((turn) => {
    d = d.plus({ hours: 12 });
    const turnStr = d.toFormat("cccc t") + " -- " + turn.join(", ").trim();

    document.getElementById("nextTurns").innerHTML += `<li>${turnStr}</li>`;
  });
}
