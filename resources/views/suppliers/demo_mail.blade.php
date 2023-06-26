<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel 9 Email PDF Attachment Example</title>
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">
    </head>
    <body class="antialiased text-center">
        <div class=" " style="width: 50%; height:80% align">
            <h2>A demo mail sent from positronx.io</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ligula ligula. </p>
            <div class="card">
             <div class="card-header">
                 <h2>Simple QR Code</h2>
             </div>
             <div class="card-body">
                <img src="data:image/png;base64,{!!QrCode::size(300)->generate('Eliya Masesa') !!}/>
             </div>
         </div>

        </div>
    </body>
</html>