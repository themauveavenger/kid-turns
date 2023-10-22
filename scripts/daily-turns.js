function dailyTurn() {
  const DateTime = luxon.DateTime;

  const turnOrders = [
    ["Rose", "Iris", "Terra"],
    ["Rose", "Terra", "Iris"],
    ["Iris", "Rose", "Terra"],
    ["Iris", "Terra", "Rose"],
    ["Terra", "Rose", "Iris"],
    ["Terra", "Iris", "Rose"]
  ];

  const startDay = DateTime.fromISO("2023-10-22");
  const now = DateTime.local();

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

  turnOrder.forEach((kid) => {
    document.getElementById("turnOrderList").innerHTML += `<li>${kid}</li>`;
  });
}
