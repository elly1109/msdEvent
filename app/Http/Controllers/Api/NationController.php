<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use App\Http\Controllers\Controller;
use App\Models\Nation;
use Illuminate\Http\Request;



class NationController extends Controller
{
    //
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
       $nations =  Nation::orderBy('id','desc')->all();

        return $this->sendResponse($nations, "Records Found!", 200);



    }

}
