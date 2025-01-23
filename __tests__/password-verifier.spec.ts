import { PasswordVerifier } from '../ts-files/password-verifier'
import { FakeLogger } from '../ts-files/utils';

describe("duck typing with function constructor injection", () => {
    describe("password verifier", () => {
        test("logger&passing scenario,calls logger with PASSED", () => {
            const mockLog = new FakeLogger();
            const verifier = new PasswordVerifier([], mockLog)
            verifier.verify("any input");

            expect(mockLog.logged).toMatch(/PASSED/);
        })
    })
})