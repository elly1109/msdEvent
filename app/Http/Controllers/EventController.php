<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PDF;
// use QrCode;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $user = Auth::user();
        if($user){

            $checkIn = Event::with('suppliers')->get();
            $z = 1;
            return view('events.index',compact('checkIn','z'));    
        }
        return redirect('/');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function download($id)
    {
        //

        $data = Event::where('supplierId','=',$id)->first();
        $pdf_view = `<html>
        <body class="antialiased text-center">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <div class=" " style="width: 50%; height:80% align">
            <h2>A demo mail sent from positronx.io</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ligula ligula. </p>
            <div class="card">
             <div class="card-header">
                 <h2>Simple QR Code</h2>
             </div>
             <div class="card-body">
                 {!! QrCode::size(300)->generate('Eliya Masesa') !!}
             </div>
         </div>

        </div>
    </body>
        
        
        <html>`;

        // dd($data);
        // view()->share('suppliers.demo_mail', $data);

        // $pdf = PDF::loadView('suppliers.demo_mail',compact('data'))->output();

        // return $pdf->download('pdf_file.pdf');
        return view('suppliers.print_invoice',compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
