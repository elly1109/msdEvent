<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EventController;

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

Route::post('auth/login', [AuthController::class, 'loginUser']);


Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('user', function (Request $request) {
    return $request->user();
});
Route::get(
    'get-suppliers-nations',[AuthController::class, 'dashboard']
);
Route::get('refresh', [AuthController::class, 'refresh']);
Route::get('get-attendee/{id}', [EventController::class, 'show']);
Route::get('suppliers-list', [SupplierController::class, 'index']);
Route::post('logout', [AuthController::class,'logoutUser']);

});