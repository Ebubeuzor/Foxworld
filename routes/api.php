<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\HomepageController;
use App\Http\Controllers\Api\MainOrderController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Models\Menu;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/rearrange', [ProductController::class, 'rearrange']);
    Route::get('/selectProducts', [ProductController::class, 'selectProducts']);
    Route::get('/selectUserProducts', [ProductController::class, 'selectUserProducts']);
    Route::post('/filterOrders', [MainOrderController::class, 'filterOrders']);
    Route::get('/userOrder', [MainOrderController::class, 'userOrder']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::put('/useraddress/{user}', [UserController::class, 'updateAddress']);

    
    Route::post('/payment/initiate-multiple', [PaymentController::class, 'initiatePaymentForMultiple'])->name('pay');
    Route::get('/payment', [PaymentController::class, 'index']);
    Route::get('/amountForDay', [PaymentController::class, 'amountForDay']);
    Route::post('/selectedDay', [PaymentController::class, 'selectedDay']);

    Route::apiResource('/products', ProductController::class);
    Route::get('/male', [ProductController::class, 'genderMale']);
    Route::get('/female', [ProductController::class, 'genderFeMale']);
    Route::get('/children', [ProductController::class, 'genderChildren']);
    
    Route::get('/maleRandom', [ProductController::class, 'genderMaleRandom']);
    Route::get('/femaleRandom', [ProductController::class, 'genderFeMaleRandom']);
    Route::get('/childrenRandom', [ProductController::class, 'genderChildrenRandom']);
    
    Route::get('/userCart', [OrderController::class, 'userCart']);
    Route::apiResource('/category', CategoryController::class);
    Route::apiResource('/homepage', HomepageController::class);
    Route::apiResource('/order', OrderController::class);
    Route::apiResource('/mainorder', MainOrderController::class);
    Route::apiResource('/menu', MenuController::class);
    
});

Route::get('/view-count', function () {
    $viewCountCookie = Cookie::get('view_count');

    if (!$viewCountCookie) {
        $viewCount = Visitor::firstOrNew(['id' => 1]);
        $viewCount->increment('views');
        $viewCount->save();

        $response = response()->json(['views' => $viewCount->views]);
        $response->cookie('view_count', 1);

        return $response;
    } else {
        $viewCount = Visitor::find(1);
        return response()->json(['views' => $viewCount->views]);
    }
});

Route::get('/visitor', function () {
    
    $viewCount = Visitor::find(1);
    return response()->json(['views' => $viewCount->views]);
    
});

Route::post('/visitor', function (Request $request) {
    try {
        $currentDate = $request->input('requestDay');
        
        $formattedDate = \DateTime::createFromFormat('d/m/Y', $currentDate)->format('Y-m-d');

        $totalVisitor = Visitor::where('created_at', '>=', $formattedDate . ' 00:00:00')
            ->where('created_at', '<=', $formattedDate . ' 23:59:59')
            ->first();

        if ($totalVisitor) {
            return response()->json(['views' => $totalVisitor->views]);
        } else {
            return response()->json(['views' => 0]);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while fetching data.']);
    }
});



Route::post('/login', [AuthController::class, 'login']);

Route::post('/signup', [AuthController::class, 'signup']);

Route::get('auth', [AuthController::class, 'redirectToAuth']);
Route::get('auth/callback', [AuthController::class, 'handleAuthCallback']);
Route::post('/password/reset', [ForgotPasswordController::class, 'sendPasswordResetEmail']);
