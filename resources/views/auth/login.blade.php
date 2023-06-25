<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>EVENTS | Login</title>

    <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/font-awesome/css/font-awesome.css')}}" rel="stylesheet">

    <link href="{{asset('assets/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/style.css')}}" rel="stylesheet">
    {{-- <link rel="stylesheet" href="{{asset('../')) }}"> --}}
    {{-- <link rel="stylesheet" href="{{ asset('master/js/slick-loader/slick-loader.min.css') }}"> --}}

</head>

<body class="bg-img bg-cover"
 style="background: url('master/assets/img/ess.png') bottom right no-repeat; height:100%; width:100%; "
 >
    {{-- <div class="bg-img bg-cover" > --}}
      

    <div class="middle-box  animated fadeInDown mx-auto ">
        <div class="card shadow-lg mt-5 bg-white rounded-7" >
            <div class="text-center mt-2">
                <img src="{{asset('master/assets/img/logo2.png')}}" alt="">
                 <p class="text-center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"><strong><h3>MSD EVENTS</h3></strong></p>
            </div>
           <div class="card-shadow">
               <div class="card-body">
                   <h2 class="card-title  text-center ">Sign In</h2>
                   <form class="m" action="{{url('auth/login')}}" role="form" method="POST">
                       @csrf
                       <div class="form-group" id="username-create">
                           <input type="username" name="username" class="form-control" placeholder="Username"  id="username">
                           <span class="text-start" style="color: red" id="error-username"></span>
                       </div>
                       <div class="form-group" id="password-create">
                           <input type="password" name="password" class="form-control" placeholder="Password"  id="password">
                           <span class="text-left" style="color: red" id="error-password"></span>
                       </div>
                       {{-- <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}"> --}}
                       <div class="mt-3">
                           <button type="submit" class="btn btn-primary block full-width m-t m-b" id="login-form" >Login</button>
   
                       </div>
       
                       {{-- <a href="#"><small>Forgot password?</small></a> --}}
                       
                   </form>
   
               </div>
           </div>
           
        </div>
    </div>
    {{-- </div> --}}

    <!-- Mainly scripts -->
    <script src="{{asset('assets/js/jquery-3.2.1.min.js')}}"></script>
    <script src="{{asset('assets/js/popper.min.js')}}"></script>
    <script src="{{asset('assets/js/bootstrap.js')}}"></script>
    {{-- <script src="{{asset('master/assets/js/auth.js')}}"></script> --}}
    {{-- <script src="{{ asset('master/js/slick-loader/slick-loader.min.js') }}"></script> --}}

    <div class="footer " style="background: rgb(255,255,255,0.1);">
        <div class="text-center">
            <strong>&copy; Copyright <?php echo date("Y"); ?>, Medical Stores Department. All Rights Reserved</strong>
        </div>
    </div>

</body>



</html>