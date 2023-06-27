<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="DICTS">  
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-Frame-Options" content="DENY">
        <meta name="robots" content="noindex">
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">
            <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}">

        <!-- Fontawesome CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/font-awesome.min.css')}}">

        <!-- Lineawesome CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/line-awesome.min.css')}}">
    </head>
    <body class="antialiased ">
        <div class="text-center" style="width: 50%;">
            <div class="card">
             <div class="card-header">
                 <h2>MSD Business Meeting</h2>
             </div>
             <div class="card-body">
                <section>
                    <div class="text-center">
                        {{-- <p>{{$data->orderNo}}</p> --}}
                        {{-- <p>{{$data->suppliers->prefix.' '.$data->suppliers->firstName.' '.$data->suppliers->lastName}}</p> --}}

                    </div>
                </section>
                {{-- {!!QrCode::size(300)->generate($data->orderNo) !!} --}}
             </div>
         </div>

        </div>
    </body>
</html>