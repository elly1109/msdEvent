@extends('events.files')

@section('content')

    <div class="page-wrapper">
        <!-- Page Content -->
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h3 class="page-title">Attendees Check IN</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{url('dashboard')}}">Dashboard</a></li>
                            <li class="breadcrumb-item active">Check IN</li>
                        </ul>
                    </div>
                   
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
                                    <th>OrderNo</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                @foreach ($checkIn as $chk)
                                    <tr class="{{$chk['checkedIn'] == '0'? 'text-danger': 'text-success'}}">
                                        <td>{{$z++}}</td>
                                        <td>{{ $chk->suppliers->prefix.' '.$chk->suppliers->firstName.' '.$chk->suppliers->lastName.' '.$chk->suppliers->suffix }}</td>
                                        <td>{{ $chk['orderNo'] }}</td>
                                        <td>{{ $chk['checkedIn'] == '1'? 'Checked': 'Not Checked' }}</td>
                                        <td>
                                            <a href="{{ url('qrcode/'.$chk['supplierId'].'')}}" data-original-title="download"><i class="fa fa-download text-navy"></i></a>
                                            <a href="#"><i class="fa fa-edit text-warning"></i></a>
                                        </td>
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