import { ILoger } from "./utils.ts";

export class PasswordVerifier {
    private _rules: any[];
    private _logger:ILoger;

    constructor(rules: any[], logger: ILoger) {
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