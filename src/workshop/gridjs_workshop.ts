
import { Log } from 'common/log';
import { BaseWorkshop } from 'workshop/base_workshop';
import { ParameterError } from 'error/parameter_error'
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

export class GridjsWorkshop extends BaseWorkshop {

    private grid: Grid = null;

    /**
     * 実行
     */
    public execute(wrapper: HTMLElement, id: string, params: any): void {

        if (this.grid !== null) {
            this.grid = null;
            if (document.getElementById('advertisement')) {
                document.getElementById('advertisement').remove();
            }
        }

        // パラメータチェック
        // for (const key of ['options', 'series', 'pc', 'mobile']) {
        //     if (typeof params.echarts[key] === 'undefined') {
        //         throw new ParameterError('Parameters are missing. [' + key + ']');
        //     }
        // }
        wrapper.style.minHeight = params.height + 'px';

        this.grid = new Grid({
            columns: ["Name", "Email", "Phone Number"],
            data: [
                ["John", "john@example.com", "(353) 01 222 3333"],
                ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
                ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
                ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
                ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
            ]
        });
        this.grid.render(wrapper);
        
        setTimeout(() => {
            let advertisement = document.createElement("div");
            advertisement.setAttribute('id', 'advertisement')
            advertisement.innerHTML = '<a href="https://nanorebuild.com">Nanorebuild</a></div>';
            wrapper.after(advertisement);
        }, 100);
    }

}

