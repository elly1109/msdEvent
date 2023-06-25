<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\Nation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        if($user){

            $nations = Nation::get();
            $suppliers = Supplier::with('nations')->get();
            $z = 1;
            return view('suppliers.index',compact('suppliers','nations','z'));    
        }
        return redirect('/');
        
    }
}