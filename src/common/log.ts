
export class Log {

    private static dev = (process.env.NODE_ENV === 'development');

    constructor() {
    }

    /**
     * エラーログ
     */
    static error(msg: string): void {
        console.error('[Nanorebuild]' + msg);
    }

    /**
     * デバッグログ
     */
    static debug(msg: any): void {
        if (Log.dev) {
            console.log(msg);
        }
    }

}

