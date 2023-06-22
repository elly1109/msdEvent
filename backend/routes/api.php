<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SupplierController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('create-supplier',[SupplierController::class,'store']);

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('user', function (Request $request) {
    return $request->user();
});
Route::get('refresh', [AuthController::class, 'refresh']);
Route::post('logout', [AuthController::class,'logoutUser']);

});