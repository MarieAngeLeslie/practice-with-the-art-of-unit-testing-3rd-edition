import { FakeLogger } from './utils.ts'


export class PasswordVerifier {
    private _rules;
    private _logger;

    constructor(rules: any[], logger: FakeLogger) {
        this._rules = rules;
        this._logger = logger
    }

    verify(input: string) {
        const failed = this._rules
            .map(rule => rule(input))
            .filter(result => result === false);

        if (failed.length === 0) {
            this._logger.info('PASSED');
            return true;
        }

        this._logger.info('FAIL');
        return false;
    }
}