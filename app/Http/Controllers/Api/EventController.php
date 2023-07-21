<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class EventController extends Controller
{
  /**
     * Display the specified resource.
     */
    public function show(Event $event, $id)
    {
        //
        if(!Auth::check()){
            return redirect('/');
        }

        $attendee  =  Event::where('orderNo', $id)->get();

        return $this->sendResponse($attendee, "Records Found!", 200);
    }


}