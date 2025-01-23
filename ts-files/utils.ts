export class FakeLogger {
    logged = ""

    info(text:string) {
        this.logged = text
    }
}