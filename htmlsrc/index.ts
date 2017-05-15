import * as $ from 'jquery';
(window as any).jQuery = $;
import 'bootstrap';
import 'datatables.net';
import 'datatables.net-bs';
import { MealDetail } from 'gourmet-api';
import Vue from 'vue';

declare var data: MealDetail[];
type dataType = "filter" | "display" | "type" | "sort";
const columns: any[] = [
    { title: "Name", data: 'name', visible: true },
    { name: "image", title: "Bild", data: 'imageUrl', render: renderImage, visible: false, orderable: false },
    { name: "Available", title: "Verfügbar", data: 'available', visible: false },
    { title: "Preis", data: 'price', render: renderUnit(" €"), visible: true },
    { title: "Gewicht", data: 'weight', render: renderUnit("g"), visible: true },
    { title: "kcal", data: 'kcal', visible: true },
    { title: "kcal / 100g", data: (row: MealDetail) => Math.round(100 * row.kcal / row.weight), visible: false },
    { title: "kcal / €", data: (row: MealDetail) => Math.round(100 * row.kcal / row.price) / 100, visible: false },
    { title: "Fett", data: 'fat', render: renderUnit("g"), visible: false },
    { title: "Fettsäuren", data: 'saturated', render: renderUnit("g"), visible: false },
    { title: "Kohlenhydrate", data: 'carbohydrate', render: renderUnit("g"), visible: false },
    { title: "Zucker", data: 'sugar', render: renderUnit("g"), visible: false },
    { title: "Eiweiß", data: 'protein', render: renderUnit("g"), visible: false },
    { title: "Salz", data: 'salt', render: renderUnit("g"), visible: false },
    { title: "Broteinheiten", data: 'breadunit', render: renderUnit(""), visible: false },
];

loadVisibility();

const table: any = $('#maintable').DataTable({
    data,
    columns
});

const vueOptions = {
    el: '#app',
    data: {
        columns,
        showUnavailable: false
    },
    methods: {
        toggleColumn(index: number, visible: boolean) {
            table.column(index).visible(visible);
            if (columns[index].name === 'image' && visible) {
                table.rows().invalidate();
                table.draw();
            }
            saveVisibility();
        },
        toggleUnavailable() {
            if (!this.showUnavailable) {
                table.column("Available:name").search('true');
            } else {
                table.column("Available:name").search('');
            }
            table.draw();
        }
    }
};
const app: any = new Vue(vueOptions);

app.toggleUnavailable();

function loadVisibility() {
    const item = localStorage.getItem('visibility');
    if (!item) {
        return;
    }
    const vis: boolean[] = JSON.parse(item);
    vis.forEach((visible, index) => columns[index].visible = visible);
}

function saveVisibility() {
    localStorage.setItem('visibility', JSON.stringify(columns.map(it => it.visible)));
}

function renderUnit(unit: string) {
    return (value: number, type: dataType) => {
        if (type === "display" && value) {
            return value.toString().replace(".", ",") + unit;
        } else {
            return value;
        }
    };
}

function renderImage(value: string, type: dataType, row: any, meta: any) {
    const api = $.fn.dataTable.Api(meta.settings);
    if (type === "display") {
        if (api.column("image:name").visible()) {
            return `<img src="${value}" />`;
        } else {
            return '';
        }
    } else {
        return value;
    }
}
