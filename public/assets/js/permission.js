var csrfToken = $('meta[name="csrf-token"]').attr("content");
var getUrl = window.location;
var address = window.location.href;
let myToken = localStorage.getItem('token');
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'ess/public/';
}



permissions();
function permissions(){
    $.ajax({
        url: baseUrl + "api/permissions",
        type: "get",
        dataType: "json",
        headers: {"Content-Type":"application/json","Authorization":"Bearer "+myToken},
        success: function(response) {
            swal.close();
            // var data = JSON.parse(response);
            // console.log(response.data[0].employee_id);
            // console.log(response.data[0]);

            $('#role-table').dataTable().fnDestroy();
            data = response.data;
            var tbody_tr = '';
            var zz = 1;
            for (var i in data){
                tbody_tr += `
                <tr>
                    <td>`+zz+`.</td>
                    <td>`+data[i].name+`</td>
                    <td>`+data[i].description+`</td>
                </tr>
            `;
                zz++;
            }


   var table_role = `
        <table class="table table-striped custom-table mb-0 datatable" id="role-table" width="100%">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            `+tbody_tr+`
            </tbody>
        </table>
        `;

            // console.log(tbody_tr)
            $('#role-data').html(table_role);
            $('#role-table').DataTable();

        },
        error: function() {
            swal({
                title: "Technical Error",
                text: "Please contact Department of ICT and Statistics",
                showConfirmButton: true,
                allowEscapeKey: true
            });
        }
    });
}