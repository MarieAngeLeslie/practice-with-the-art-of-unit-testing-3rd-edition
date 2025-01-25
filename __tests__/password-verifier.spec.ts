import { PasswordVerifier } from '../ts-files/password-verifier'
import { ILoger } from '../ts-files/utils';

class FakeLogger implements ILoger {
    written: string;
    constructor() {
        this.written = ''
    }
    info(text: string): void {
        this.written = text
    }
}

describe("duck typing with function constructor injection", () => {
    describe("password verifier", () => {
        test("logger&passing scenario,calls logger with PASSED", () => {
            const mockLog = new FakeLogger();
            const verifier = new PasswordVerifier([], mockLog)
            verifier.verify("any input");

            expect(mockLog.written).toMatch(/PASSED/);
        })
    })
})