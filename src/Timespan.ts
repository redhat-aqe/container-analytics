import moment, { Moment } from 'moment';

type TimespanUnit = 'day' | 'week' | 'month' | 'year';

interface ITimespanInterval {
  start: Date;
  end: Date;
  display: string;
  displayLong: string;
  unit: TimespanUnit;
}

export class Timespan {

  static DAYS_30 = new Timespan(30, 'day', 'day');
  static MONTHS_3 = new Timespan(3, 'month', 'week');
  static MONTHS_6 = new Timespan(6, 'month', 'week');
  static YEARS_1 = new Timespan(1, 'year', 'month');

  value: number;
  unit: TimespanUnit;
  intervalUnit: TimespanUnit;

  now!: Moment;
  intervals!: ITimespanInterval[];

  constructor(value: number, unit: TimespanUnit, intervalUnit: TimespanUnit) {
    this.value = value;
    this.unit = unit;
    this.intervalUnit = intervalUnit;
    this.refresh();
  }

  refresh() {
    this.now = moment.utc();
    this.intervals = this.createIntervals();
  }

  createIntervals(): ITimespanInterval[] {
    const intervals: ITimespanInterval[] = [];
    let date = this.start;

    // Order is important
    while (date <= this.now) {
      let intervalStart = date.clone().startOf(this.intervalUnit);
      if (date > intervalStart) {
        intervalStart = date;
      }

      let intervalEnd = date.clone().endOf(this.intervalUnit);
      if (this.now < intervalEnd) {
        intervalEnd = this.now;
      }

      let display;
      let displayLong;
      if (this.intervalUnit === 'day') {
        display = `${intervalStart.format('MMM')} ${intervalStart.date()}`;
        displayLong = `${intervalStart.format('MMM')} ${intervalStart.date()} ${intervalStart.format('YYYY')}`;
      } else if (this.intervalUnit === 'week') {
        display = `${intervalStart.format('MMM')} ${intervalStart.date()} - ` +
                  `${intervalEnd.format('MMM')} ${intervalEnd.date()}`;
        displayLong = `${intervalStart.format('MMM')} ${intervalStart.date()} ${intervalStart.format('YYYY')} - ` +
                      `${intervalEnd.format('MMM')} ${intervalEnd.date()} ${intervalEnd.format('YYYY')}`;
      } else {
        display = intervalStart.format('MMM');
        displayLong = intervalStart.format('MMM YYYY');
      }

      intervals.push({
        display,
        displayLong,
        end: intervalEnd.toDate(),
        start: intervalStart.toDate(),
        unit: this.intervalUnit,
      });

      date = intervalEnd.clone().add(1, 'day').startOf('day');
    }

    return intervals;
  }

  get start(): Moment {
    return this.now.clone().subtract(this.value, this.unit).startOf('day');
  }

  get days(): number {
    return this.now.diff(this.start, 'day');
  }

  getInterval(date: Date): [number, ITimespanInterval] | undefined {
    for (const [index, interval] of this.intervals.entries()) {
      if ((date >= interval.start) && (date <= interval.end)) {
        return [index, interval];
      }
    }
  }

  toString(): string {
    const start = moment.utc(this.intervals[0].start);
    const end = moment.utc(this.intervals[this.intervals.length - 1].end);
    return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`;
  }
}
