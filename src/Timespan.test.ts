import moment from 'moment';
import { Timespan } from './Timespan';

describe('Timespan', () => {

  it('creates day intervals', () => {
    const timespan = new Timespan(2, 'day', 'day');
    timespan.now = moment.utc('2019-01-02T01:01:01');
    const expected = [{
      display: 'Dec 31',
      displayLong: 'Dec 31 2018',
      end: new Date('2018-12-31T23:59:59.999Z'),
      start: new Date('2018-12-31T00:00:00.000Z'),
      unit: 'day',
    }, {
      display: 'Jan 1',
      displayLong: 'Jan 1 2019',
      end: new Date('2019-01-01T23:59:59.999Z'),
      start: new Date('2019-01-01T00:00:00.000Z'),
      unit: 'day',
    }, {
      display: 'Jan 2',
      displayLong: 'Jan 2 2019',
      end: new Date('2019-01-02T01:01:01.000Z'),
      start: new Date('2019-01-02T00:00:00.000Z'),
      unit: 'day',
    }];
    expect(timespan.createIntervals()).toEqual(expected);
  });

  it('creates week intervals', () => {
    const timespan = new Timespan(1, 'month', 'week');
    timespan.now = moment.utc('2019-01-31T01:01:01Z');
    const expected = [{
      display: 'Dec 31 - Jan 5',
      displayLong: 'Dec 31 2018 - Jan 5 2019',
      end: new Date('2019-01-05T23:59:59.999Z'),
      start: new Date('2018-12-31T00:00:00.000Z'),
      unit: 'week',
    }, {
      display: 'Jan 6 - Jan 12',
      displayLong: 'Jan 6 2019 - Jan 12 2019',
      end: new Date('2019-01-12T23:59:59.999Z'),
      start: new Date('2019-01-06T00:00:00.000Z'),
      unit: 'week',
    }, {
      display: 'Jan 13 - Jan 19',
      displayLong: 'Jan 13 2019 - Jan 19 2019',
      end: new Date('2019-01-19T23:59:59.999Z'),
      start: new Date('2019-01-13T00:00:00.000Z'),
      unit: 'week',
    }, {
      display: 'Jan 20 - Jan 26',
      displayLong: 'Jan 20 2019 - Jan 26 2019',
      end: new Date('2019-01-26T23:59:59.999Z'),
      start: new Date('2019-01-20T00:00:00.000Z'),
      unit: 'week',
    }, {
      display: 'Jan 27 - Jan 31',
      displayLong: 'Jan 27 2019 - Jan 31 2019',
      end: new Date('2019-01-31T01:01:01.000Z'),
      start: new Date('2019-01-27T00:00:00.000Z'),
      unit: 'week',
    }];
    expect(timespan.createIntervals()).toEqual(expected);
  });

  it('creates month intervals', () => {
    const timespan = new Timespan(1, 'year', 'month');
    timespan.now = moment.utc('2019-01-15');
    const expected = [{
      display: 'Jan',
      displayLong: 'Jan 2018',
      end: new Date('2018-01-31T23:59:59.999Z'),
      start: new Date('2018-01-15T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Feb',
      displayLong: 'Feb 2018',
      end: new Date('2018-02-28T23:59:59.999Z'),
      start: new Date('2018-02-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Mar',
      displayLong: 'Mar 2018',
      end: new Date('2018-03-31T23:59:59.999Z'),
      start: new Date('2018-03-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Apr',
      displayLong: 'Apr 2018',
      end: new Date('2018-04-30T23:59:59.999Z'),
      start: new Date('2018-04-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'May',
      displayLong: 'May 2018',
      end: new Date('2018-05-31T23:59:59.999Z'),
      start: new Date('2018-05-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Jun',
      displayLong: 'Jun 2018',
      end: new Date('2018-06-30T23:59:59.999Z'),
      start: new Date('2018-06-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Jul',
      displayLong: 'Jul 2018',
      end: new Date('2018-07-31T23:59:59.999Z'),
      start: new Date('2018-07-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Aug',
      displayLong: 'Aug 2018',
      end: new Date('2018-08-31T23:59:59.999Z'),
      start: new Date('2018-08-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Sep',
      displayLong: 'Sep 2018',
      end: new Date('2018-09-30T23:59:59.999Z'),
      start: new Date('2018-09-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Oct',
      displayLong: 'Oct 2018',
      end: new Date('2018-10-31T23:59:59.999Z'),
      start: new Date('2018-10-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Nov',
      displayLong: 'Nov 2018',
      end: new Date('2018-11-30T23:59:59.999Z'),
      start: new Date('2018-11-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Dec',
      displayLong: 'Dec 2018',
      end: new Date('2018-12-31T23:59:59.999Z'),
      start: new Date('2018-12-01T00:00:00.000Z'),
      unit: 'month',
    }, {
      display: 'Jan',
      displayLong: 'Jan 2019',
      end: new Date('2019-01-15T00:00:00.000Z'),
      start: new Date('2019-01-01T00:00:00.000Z'),
      unit: 'month',
    }];
    expect(timespan.createIntervals()).toEqual(expected);
  });

  it('has the total number of days', () => {
    const timespan = new Timespan(1, 'year', 'month');
    expect(timespan.days).toBe(365);
  });

  it('can get an interval by date', () => {
    const timespan = new Timespan(1, 'year', 'month');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const expectedInterval = {
      display: 'Jul',
      displayLong: 'Jul 2018',
      end: new Date('2018-07-31T23:59:59.999Z'),
      start: new Date('2018-07-01T00:00:00.000Z'),
      unit: 'month',
    };
    expect(timespan.getInterval(new Date('2018-07-15T00:00:00Z'))).toEqual([6, expectedInterval]);
  });

});
