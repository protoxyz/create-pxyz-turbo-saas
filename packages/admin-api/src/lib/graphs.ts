import { dateIsTheSame, getNDaysAgo } from "./date";

export function fillInGraphData(
  input: { createdAt: Date; count: bigint }[],
  options: { days: number },
) {
  const startingDate = getNDaysAgo(options.days);

  const output = [];
  for (let i = 0; i < options.days - 1; i++) {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);
    const thisDay = input.find((item) => dateIsTheSame(item.createdAt, date));

    if (thisDay) {
      output.push({
        count: parseInt(thisDay.count.toString()),
        createdAt: date,
      });
    } else {
      output.push({
        count: 0,
        createdAt: date,
      });
    }
  }

  return output;
}
