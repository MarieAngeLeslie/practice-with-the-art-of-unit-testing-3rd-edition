import { TimeProviderInterface } from '../ts-files/time-provider';
import { PasswordVerifier } from '../password-verifier';

//-------------------- Object-oriented code testing side -----------------------

class FakeTimeProvider implements TimeProviderInterface {
    fakeDay: number;
    getDay(): number {
        return this.fakeDay
    }
}

const SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, FRIDAY = 4, SATURDAY = 6

describe('password verifier with interfaces', () => {
    test('on weekends, throws exceptions', () => {
        const stubTimeProvider = new FakeTimeProvider();
        stubTimeProvider.fakeDay = SUNDAY;
        const verifier = new PasswordVerifier([], stubTimeProvider);

        expect(() => verifier.verify('anything')).toThrow("It's the weekend!")
    })
})