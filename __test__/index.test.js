import { checkForName }  from '../src/client/js/nameChecker';

test('Check Picard name',  () => {
    expect(checkForName('Picard')).toBe("Welcome, Captain!");
});
