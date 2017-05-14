import 'datatables.net';
import 'datatables.net-bs';
import * as $ from 'jquery';

declare var data: any;

$('#maintable').DataTable({
    data,
    columns: [
        {data: 'name'},
        {data: 'price'},
        {data: 'weight'},
        {data: 'kcal'}
    ]
});

function 