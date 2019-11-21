import { Timespan } from './Timespan';
import { TimespanSelectOption } from './TimespanSelectOption';

describe('TimespanSelectOption', () => {

  it('renders', () => {
    const option = new TimespanSelectOption(Timespan.DAYS_30, 'foo');
    expect(option.toString()).toBe('foo');
  });

});
