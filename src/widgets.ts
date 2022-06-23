
import { Log } from './common/log';

class Nanorebuild {

    constructor() {
        this.execute();
    }

    /**
     * 実行
     */
    private execute(): void {

        const elemets = Array.from(document.getElementsByClassName('nanorebuild'));
        for (const e of elemets) {
            const el = <HTMLElement>e;
            if ('status' in el.dataset !== false) {
                Log.error('No id attribute');
                continue;
            }

            el.setAttribute('data-status', '1');

            let appData: any = null;
            try {
                let innerText = el.innerText;
                innerText = innerText.replace(/\r?\n/g, '');
                innerText = innerText.replace(/\/\/.*<!\[CDATA\[/, '');
                innerText = innerText.replace(/\/\/.*\]\]>/, '');
                appData = JSON.parse(innerText);
            } catch (error) {
                Log.debug(error);
                Log.error('Could not parse JSON data');
                continue;
            }
            const iframe = document.createElement("iframe");

            window.addEventListener('message', (e) => {
                const eventName = e.data[0];
                const eventData = e.data[1];
                if (typeof eventName !== 'string') {
                    return;
                }
                if (eventData.id === 'undefined' || eventData.id !== el.dataset['id']) {
                    return;
                }

                switch (eventName) {
                    case 'NanorebuildResize':
                        iframe.style.height = eventData.height;
                        break;
                    case 'NanorebuilReceiverLoaded':
                        iframe.contentWindow.postMessage(
                            [
                                "NanorebuildDrawing",
                                appData,
                            ],
                            "*"
                        );
                        break;
                }

            }, false);

            iframe.setAttribute("frameBorder", "0");
            iframe.setAttribute("scrolling", "no");
            iframe.style.position = "relative";
            iframe.style.width = "100%";
            iframe.style.minHeight = appData.height + 'px';
            iframe.src = this.htmlEchartPieChart(el.dataset['id']);

            el.innerText = "";
            el.after(iframe);
            el.setAttribute('data-status', '9');

        }

    }

    /**
    * 実行
    */
    private htmlEchartPieChart(id: string): string {
        return process.env.CDN_URL + '/widgets.html?id=' + id;
    }

}

window.addEventListener("DOMContentLoaded", () => new Nanorebuild());