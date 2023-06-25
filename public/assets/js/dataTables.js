$.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-white btn-sm';

$('.t-table').DataTable({
    pageLength: 10,
    responsive: true,
    
    // aaSorting: [[ 4, "desc" ]],
    dom:"<'row'<'col-sm-12 col-md-2'l><'col-sm-12 col-md-6 html5buttons'B>   <'col-sm-12 col-md-4 'f>   > " +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-8'i><'col-sm-12 col-md-4 'p>>",
    buttons: [
        {extend: 'csv', title: 'ExampleFile'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile' },
        {extend: 'print',
         customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
        }, exportOptions: {
          columns: ':visible'
      }
        },
        'colvis'
    ]

});