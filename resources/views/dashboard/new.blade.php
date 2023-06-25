<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta name="description" content="MSD Events">
    <meta name="keywords" content="admin, estimates, bootstrap, business, corporate, creative, management, minimal, modern, accounts, invoice, html5, responsive, CRM, Projects">
    <meta name="author" content="DICTS">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex, nofollow">
    <title>Dashboard</title>

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/ess.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}">

    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="{{asset('assets/css/font-awesome.min.css')}}">

    <!-- Lineawesome CSS -->
    <link rel="stylesheet" href="{{asset('assets/css/line-awesome.min.css')}}">

    <!-- Main CSS -->
    <link rel="stylesheet" href="{{asset('assets/css/main/style.css')}}">


    <link rel="stylesheet" href="{{asset('assets/css/toastr.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/sweetalert.css')}}">




</head>

<body>
<div class="main-wrapper">


    @include('admin.sidebar')


        <!--  BEGIN NAVBAR  -->

    @include('admin.navbar')


        <!--  END NAVBAR  -->


        <!--  BEGIN CONTENT AREA  -->
    @yield('content')
    <!--  END CONTENT AREA  -->

    @include('admin.footer')

</div>
<!-- END MAIN CONTAINER -->



<script src="{{asset('assets/js/jquery-3.2.1.min.js')}}"></script>

<!-- Bootstrap Core JS -->
<script src="{{asset('assets/js/popper.min.js')}}"></script>
<script src="{{asset('assets/js/bootstrap.min.js')}}"></script>

<!-- Slimscroll JS -->
<script src="{{asset('assets/js/jquery.slimscroll.min.js')}}"></script>

<!-- Custom JS -->
<script src="{{asset('assets/js/app.js')}}"></script>


<script src="{{asset('assets/js/toastr.min.js')}}"></script>
<script src="{{asset('assets/js/sweetalert.min.js')}}"></script>


{{-- <script src="{{asset('assets/js/dashboard.js')}}"></script>
<script src="{{asset('assets/js/auth.js')}}"></script> --}}



</body>

</html>

