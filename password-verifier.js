import { RealTimeProvider } from "./time-provider";

export class PasswordVerifier1 {
    constructor() {
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule)
    }

    verify(input) {
        const errors = [];
        this.rules.forEach(rule => {
            const result = rule(input)
            if (!result.passed) {
                errors.push(`error ${result.reason}`)
            }
        })
        return errors
    }
}

export const oneUppCaseRule = (input) => {
    return {
        passed: (input.toLowerCase() !== input),
        reason: "at least one upperCase needed"
    }
}

//-------------------- dependency injection via partialmocks -----------------------
const SUNDAY = 0, SATURDAY = 6, MONDAY = 1;

export const verifyPassword3 = (input, rules, getDayFn) => {
    const dayOfWeek = getDayFn();

    if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
        throw Error("It's the weekend!")
    }

    return [];
}

//-------------------- Object-oriented injection techniques -----------------------

export class PasswordVerifier {
    constructor(rules, timeProvider) {
        this.rules = rules;
        this.timeProvider = timeProvider;
    }


    verify(input) {
        if ([SATURDAY, SUNDAY].includes(this.timeProvider())) {
            throw new Error("It's the weekend!")
        }
        const errros = [];

        return errros;
    }

}

const passwordVerifierFactory = (rules) => {
    return new PasswordVerifier(new RealTimeProvider())
};
