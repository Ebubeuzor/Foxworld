<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaidResource;
use App\Models\MainOrder;
use App\Models\MyTotalIncome;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use KingFlamez\Rave\Facades\Rave as Flutterwave;
class PaymentController extends Controller
{

    public function index(){
        return PaidResource::collection(
            MyTotalIncome::all()
        );
    }


    public function amountForDay() {
        $currentDate = Carbon::now()->format('Y-m-d');
    
        $totalIncome = MyTotalIncome::where('purchase_date', $currentDate)->get();
    
        return response([
            'data' => $totalIncome
        ]);
    }
    
    

    public function selectedDay(Request $request) {
        $currentDate = $request['requestDay'];

        $formattedDate = Carbon::createFromFormat('m/d/Y', $currentDate)->format('Y-m-d');
        
        $totalIncome = MyTotalIncome::whereDate('created_at','>=', $formattedDate)->first();
    
        return new PaidResource($totalIncome);
    }
    
    public function initiatePaymentForMultiple(Request $request)
    {
        $cartItems = $request->input('cartItems');
        $user = Auth()->user();

        // Generate a payment reference
        $reference = Flutterwave::generateReference();

        // Calculate total amount for all items
        $totalAmount = array_reduce($cartItems, function ($total, $item) {
            return $total + $item['product_id']['salePrice'];
        }, 0);

        $shipping = (5/100) * floatval($totalAmount);

        $total = floatval($totalAmount) + $shipping;

        $allId = [];
        foreach (array_column($cartItems,'id')as $key=>$value){
            array_push($allId,$value);
        }

        $data = [
            'payment_options' => 'card,banktransfer',
            'amount' => $total,
            'email' => $user['email'],
            'tx_ref' => $reference,
            'currency' => "NGN",
            'redirect_url' => route('callback'),
            'customer' => [
                'email' => $user['email'],
                "phone_number" => $user['phoneno'],
                "name" => $user['name'],
                "ids" => $allId
            ],
            "customizations" => [
                "title" => 'Foxwrld Clothing Payment',
                "description" => "Payment for cart items"
                ]
        ];

        $payment = Flutterwave::initializePayment($data);
        
        if ($payment['status'] !== 'success') {
            return response()->json(['message' => $data]);
        }

        
        foreach ($cartItems as $cartItem) {
            $mainOrder = new MainOrder();
            $mainOrder->user_id = $user['id'];
            $mainOrder->paymentStatus = 'pending'; 
            $mainOrder->product_id = $cartItem['product_id']['id'];
            $mainOrder->order_id = $cartItem['id'];
            $mainOrder->save();
        }

        return response()->json([
            'payment_link' => $payment['data']['link'],
            'allIds' => $allId,
            'callback_url' => route('callback')
        ]);
    }


    public function callback()
    {
        $status = request()->status;

        $transactionID = Flutterwave::getTransactionIDFromCallback();
        $data = Flutterwave::verifyTransaction($transactionID);

        $allId = $_COOKIE['cartIds'];

        $cartIds = json_decode($allId, true);

        $amount = $data['data']['amount'];
        $id = $data['data']['id'];

        foreach ($cartIds['allIds'] as $transactionReference) {
            $mainOrder = MainOrder::where('order_id', $transactionReference)->first();

            if ($mainOrder) {
                if ($status == 'completed') {

                    $mainOrder->update([
                        'transaction' => $id,
                        'paymentStatus' => 'successful',
                        'orderStatus' => 'processing',
                    ]);
                    $order = Order::where('id', $transactionReference)->first();
                    $order->update(['paidStatus' => 1]);
                } elseif ($status == 'cancelled') {
                    $mainOrder->paymentStatus = 'cancelled';
                } else {
                    $mainOrder->paymentStatus = 'failed';
                }
                
                $mainOrder->save();
            }
        }

        if ($status == 'completed') {
            $totalIncome = new MyTotalIncome();
            
            $totalIncome->create(
                ["totalAmount" => $amount,
                "purchase_date" => now()->toDateString(),]
            );
            return redirect()->route('successPage');
        } elseif ($status == 'cancelled') {
            return redirect()->route('failedPage');
        } else {
            return redirect()->route('failedPage');
        }
    }

    public function successful(){
        return view('Successful');
    }

    public function failed(){
        return view('Failed');
    }

    public function cancelled(){
        return view('Cancelled');
    }
}

