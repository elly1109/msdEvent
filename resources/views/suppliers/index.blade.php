@extends('suppliers.files')

@section('content')

    <div class="page-wrapper">
        <!-- Page Content -->
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h3 class="page-title">Attendees</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{url('dashboard')}}">Dashboard</a></li>
                            <li class="breadcrumb-item active">Attendees</li>
                        </ul>
                    </div>
                    {{-- <div class="col-auto float-right ml-auto">
                        <a href="#" class="btn btn-primary add_btn" data-toggle="modal" data-target="#add_role"><i class="fa fa-plus"></i> Add Roles</a>
                    </div> --}}
                </div>
            </div>
            <!-- /Page Header -->


            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-striped custom-table mb-0 datatable">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Country</th>
                                    <th>Job Title</th>
                                    <th>Mobile No.</th>
                                    {{-- <th>Action</th> --}}
                                </tr>
                            </thead>
                            <tbody>

                                @foreach ($suppliers as $supp)
                                    <tr >
                                        <td>{{$z++}}</td>
                                        <td>{{ $supp['firstName'].' '.$supp['lastName'] }}</td>
                                        <td>{{ $supp['email'] }}</td>
                                        <td>{{ $supp['companyName'] }}</td>
                                        <td>{{ $supp->nations->nicename}}</td>
                                        <td>{{ $supp['title'] }}</td>
                                        <td>{{ $supp['phoneNumber'] }}</td>
                                    </tr>
                                @endforeach 

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Page Content -->

        {{-- <!-- Add Employee Modal -->
        <div id="add_role" class="modal custom-modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Role</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="employee-form">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label"> Name <span class="text-danger">*</span></label>
                                        <input class="form-control" type="text" name="name" id="fname">
                                        <span id="name" class="error" style="color: red"></span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">Guard Name</label>
                                        <input class="form-control" type="text" name="guard_name" id="guardname">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="submit-section">
                                <button class="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Add Employee Modal -->

 --}}


    </div>
@endsection