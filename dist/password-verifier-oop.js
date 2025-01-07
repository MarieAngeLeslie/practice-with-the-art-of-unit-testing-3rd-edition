const SUNDAY = 0, SATURDAY = 1;
export class PasswordVerifier {
    _timeProvider;
    constructor(rules, timeProvider) {
        this._timeProvider = timeProvider;
    }
    verify(input) {
        const isWeekened = [SUNDAY, SATURDAY]
            .filter(x => x === this._timeProvider.getDay())
            .length > 0;
        if (isWeekened) {
            throw new Error("It's the weekend!");
        }
        return [];
    }
}
