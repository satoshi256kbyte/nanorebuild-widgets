
import './css/receiver.css'
import { Log } from './common/log';
import { ParameterError } from './error/parameter_error'
import { BaseWorkshop } from 'workshop/base_workshop';
import { EchartsPieWorkshop } from 'workshop/echarts_pie_workshop';
import { GridjsWorkshop } from 'workshop/gridjs_workshop';

import * as echarts from "echarts";

class NanorebuildReceiver {

    private chart: echarts.ECharts = null;
    private lastWidth: number = 0;

    constructor() {
        let url = new URL(window.location.href);
        let id = '';
        if (url.searchParams.has('id')) {
            id = url.searchParams.get('id')
        }
        window.addEventListener('message', (e) => {
            const eventName = e.data[0];
            const eventData = e.data[1];
            if (typeof eventName !== 'string') {
                return;
            }
            if (eventName === 'NanorebuildDrawing') {
                this.execute(id, eventData);
                window.addEventListener('resize', () => {
                    if (this.lastWidth !== window.innerWidth) {
                        setTimeout(() => this.execute(id, eventData), 100);
                    }
                }, false);
            }
        }, false);


        window.parent.postMessage(
            [
                "NanorebuilReceiverLoaded"
                ,
                {
                    id: id
                },
            ],
            "*"
        );

    }

    /**
     * 実行
     */
    private execute(id: string, data: any): void {

        let wrapper = document.getElementById('wrapper');

        if (this.chart !== null) {
            this.chart.dispose();
            this.chart = null;
            if (document.getElementById('advertisement')) {
                document.getElementById('advertisement').remove();
            }
        }

        try {
            // パラメータチェック
            if (typeof data.product_type === 'undefined') {
                throw new ParameterError('Parameters are missing. [product_type]');
            }            
            if (typeof data.height === 'undefined') {
                throw new ParameterError('Parameters are missing. [height]');
            }

            let Workshop: BaseWorkshop = null;
            switch(data.product_type) {
                case 'echarts-pie':
                    Workshop = new EchartsPieWorkshop();
                  break;
                  case 'gridjs':
                    Workshop = new GridjsWorkshop();
                  break;                  
                default:
                    throw new ParameterError('Product type is invalid.');

              }

            Workshop.execute(wrapper, id, data);


        } catch (error) {
            let msg = 'An unexpected error has occurred.';
            if (error instanceof ParameterError) {
                msg = error.message
            }
            Log.error(msg);
            wrapper.innerText = msg;
        } finally {
            this.lastWidth = window.innerWidth;
        }


    }

}

window.addEventListener("DOMContentLoaded", () => new NanorebuildReceiver());