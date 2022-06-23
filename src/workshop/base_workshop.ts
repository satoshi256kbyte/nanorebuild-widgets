
export abstract class BaseWorkshop {

    constructor() {
    }

    /**
     * 実行
     */
    public abstract execute(wrapper: HTMLElement, id: string, params: any): void;

}

