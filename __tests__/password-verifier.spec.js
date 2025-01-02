import { PasswordVerifier1, oneUppCaseRule, verifyPassword3, PasswordVerifier } from "../password-verifier.js";

const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input) => ({ passed: true, reason: '' })

const makeVerifierWithPassingRule = () => {
    const verifier = makeVerifier();
    verifier.addRule(passingRule);
    return verifier;
}

const makeVerifierWithFailedRule = (reason) => {
    const verifier = makeVerifier();
    const fakeRule = (input) => ({ passed: false, reason })
    verifier.addRule(fakeRule)
    return verifier;
}

describe('verifyPassword', () => {
    describe('With a failing rule', () => {
        it('it has an error message based on the rule.reason', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            const errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        })
        it('has exactly one error', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            const errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        })
    })

    describe('With a passing rule', () => {
        it('has no errors', () => {
            const verifier = makeVerifierWithPassingRule();
            const errors = verifier.verify('any input')
            expect(errors.length).toBe(0)
        })
    })

    describe('with a failing and a passing rule', () => {
        it('has one error', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            const errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        });
        it('error text belongs to failed rule', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            const errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        });
    });

    describe('one uppercase rule', function () {
        test.each([
            ['Abc', true],
            ['aBc', true],
            ['abc', false]])
            ('given %s %s,', (input, expected) => {
                const result = oneUppCaseRule(input);
                expect(result.passed).toEqual(expected);
            })
    });

})

//-------------------- Functional injection techniques -----------------------

const SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, FRIDAY = 4, SATURDAY = 6

const _makeVerifier = (rules, dayOfWeekFn) => {
    return function (input) {
        if ([SUNDAY, SATURDAY].includes(dayOfWeekFn())) {
            throw new Error("It's the weekend!")
        }
    }
}

describe('verifier', () => {
    test('factory method: on weekends, throws exception', () => {
        const alwaysSunday = () => SUNDAY;
        const verifyPassword = _makeVerifier([], alwaysSunday)

        expect(() => verifyPassword('anything'))
            .toThrow("It's the weekend!")
    })
})

//-------------------- Object-oriented injection techniques -----------------------

describe('refactored with constructor', () => {
    const makeVerifier = () => {
        return new PasswordVerifier(rules, dayFn)
    }

    test('class constructor : on weekends, throws exception', () => {
        const alwaysSunday = () => SUNDAY
        const verifier = makeVerifier([], alwaysSunday)

        expect(() => verifier.verify('anything')).toThrow("It's the weekend!")
    });

    test('class constructor : on weekends with no rules, passes', () => {
        const alwaysMonday = () => MONDAY
        const verifier = makeVerifier([], alwaysMonday)

        const result = verifier.verify('anything');
        expect(result.length).toBe(0)
    });

})

