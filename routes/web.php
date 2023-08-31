<?php

use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::match(['get', 'post'],'/rave/callback', [PaymentController::class, 'callback'])->name('callback');
Route::get('/successful', [PaymentController::class, 'successful'])->name('successPage');
Route::get('/cancelled', [PaymentController::class, 'cancelled'])->name('cancelledPage');
Route::get('/failed', [PaymentController::class, 'failed'])->name('failedPage');
Route::get('/password', [PaymentController::class, 'failed'])->name('failedPage');

Route::get('/reset-password', [ForgotPasswordController::class, 'returnView'])->name('password.reset');

Route::post('/resetPassword', [ForgotPasswordController::class, 'resetPassword'])->name('changePassword');