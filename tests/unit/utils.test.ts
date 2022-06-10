import { getDoubleQuotedString } from '../../src/utils';

describe('getDoubleQuotedString: Function to extract a substring within double quotes from another string', () => {
  it('Returns empty string if there is no substring enclosed within double quotes', () => {
    expect(getDoubleQuotedString('Optimization')).toEqual('');
  });

  it('Returns empty string if there is a single double quote in the string', () => {
    expect(getDoubleQuotedString('"Optimization')).toEqual('');
  });

  it('Returns substring enclosed within double quotes', () => {
    expect(getDoubleQuotedString('"Optimization"')).toEqual('Optimization');
  });
});
