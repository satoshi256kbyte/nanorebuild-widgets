
import { Log } from 'common/log';
import { BaseWorkshop } from 'workshop/base_workshop';
import { ParameterError } from 'error/parameter_error'
import * as echarts from "echarts";

export class EchartsPieWorkshop extends BaseWorkshop {

    private chart: echarts.ECharts = null;

    /**
     * 実行
     */
    public execute(wrapper: HTMLElement, id: string, data: any): void {

        if (this.chart !== null) {
            this.chart.dispose();
            this.chart = null;
            if (document.getElementById('advertisement')) {
                document.getElementById('advertisement').remove();
            }
        }

        // パラメータチェック
        if (typeof data.params === 'undefined') {
            throw new ParameterError('Parameters are missing. [echarts]');
        }
        for (const key of ['dark', 'pc', 'mobile']) {
            if (typeof data.params[key] === 'undefined') {
                throw new ParameterError('Parameters are missing. [' + key + ']');
            }
        }
        wrapper.style.minHeight = data.height + 'px';

        if (Boolean(data.params.dark)) {
            this.chart = echarts.init(wrapper, "dark");
        } else {
            this.chart = echarts.init(wrapper);
        }
        let animationDuration = 0;
        if (window.innerWidth < 1024) {
            animationDuration = data.params.animationDuration;
            this.chart.setOption(data.params.mobile);
        } else {
            animationDuration = data.params.animationDuration;
            this.chart.setOption(data.params.pc);
        }
        setTimeout(() => {
            let advertisement = document.createElement("div");
            advertisement.setAttribute('id', 'advertisement')
            advertisement.innerHTML = '<a href="https://nanorebuild.com">Nanorebuild</a></div>';
            wrapper.after(advertisement);
            window.parent.postMessage(
                [
                    "NanorebuildResize"
                    ,
                    {
                        id: id,
                        width: document.body.offsetWidth + "px",
                        height: document.body.offsetHeight + "px",
                    },
                ],
                "*"
            );
        }, Number(animationDuration) + 100);




    }

}

