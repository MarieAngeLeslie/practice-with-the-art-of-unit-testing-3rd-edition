import { TimeProviderInterface } from '../ts-files/time-provider';
import { PasswordVerifier } from '../ts-files/password-verifier-oop';


const SUNDAY = 0;

class FakeTimeProvider implements TimeProviderInterface {
    fakeDay: number;
    constructor() {
        this.fakeDay = 0;
    }
    getDay(): number {
        return this.fakeDay
    }
}

describe('password verifier with interfaces', () => {
    test('on weekends, throws exceptions', () => {
        const stubTimeProvider = new FakeTimeProvider();
        stubTimeProvider.fakeDay = SUNDAY;
        const verifier = new PasswordVerifier([], stubTimeProvider);

        expect(() => verifier.verify('anything')).toThrow("It's the weekend!")
    })
})