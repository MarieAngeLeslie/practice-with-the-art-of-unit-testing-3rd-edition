import { TimeProviderInterface } from "./time-provider.js";

const SUNDAY = 0, SATURDAY = 1;

export class PasswordVerifier {
    private _timeProvider: TimeProviderInterface;

    constructor(rules: any[], timeProvider: TimeProviderInterface) {
        this._timeProvider = timeProvider;
    }

    verify(input: string): string[] {
        const isWeekened = [SUNDAY, SATURDAY]
            .filter(x => x === this._timeProvider.getDay())
            .length > 0;

        if (isWeekened) {
            throw new Error("It's the weekend!")
        }

        return [];
    }
}