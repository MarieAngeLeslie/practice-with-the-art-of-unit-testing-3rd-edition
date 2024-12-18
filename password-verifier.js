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

//-------------------- dependency injection via partial -----------------------
const SUNDAY = 0, SATURDAY = 6, MONDAY = 1;

export const verifyPassword3 = (input, rules, getDayFn) => {
    const dayOfWeek = getDayFn();

    if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
        throw Error("It's the weekend!")
    }

    return [];
}