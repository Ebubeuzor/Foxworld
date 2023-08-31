<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MainOrderResource;
use App\Models\MainOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MainOrderController extends Controller
{
    public function index()
    {
        return MainOrderResource::collection(
            MainOrder::paginate(6)
        );
    }
    
    public function userOrder()
    {
        $user = Auth::user();

        return MainOrderResource::collection(
            MainOrder::where("user_id", $user->id)->get()
        );
    }

    public function filterOrders(Request $request)
    {
        $title = $request->input('title');
        $priceRange = $request->input('priceRange');
        $orderStatus = $request->input('orderStatus');
        $dateInterval = $request->input('created_at');
    
        $mainOrders = MainOrder::select('main_orders.*')
        ->join('orders', 'main_orders.order_id', '=', 'orders.id')
        ->joinSub(function ($query) use ($title, $priceRange) {
            $query->select('cp2.product_id')
                ->from('products as cp1')
                ->join('category_product as cp2', 'cp1.id', '=', 'cp2.product_id')
                ->join('categories as cat1', 'cp2.category_id', '=', 'cat1.id') // Use cp2 here
                ->join('menus', 'cat1.menu_id', '=', 'menus.id')
                ->where('menus.Title', $title)
                ->where(function ($subquery) use ($priceRange) {
                    $subquery->where(function ($subquery) use ($priceRange) {
                        if ($priceRange == 1) {
                            $subquery->where('cp1.salePrice', '<', 1000); // Use cp1 here
                        } elseif ($priceRange == 2) {
                            $subquery->orWhereBetween('cp1.salePrice', [1000, 20000]); // Use cp1 here
                        } elseif ($priceRange == 3) {
                            $subquery->orWhereBetween('cp1.salePrice', [21000, 50000]); // Use cp1 here
                        } elseif ($priceRange == 4) {
                            $subquery->orWhereBetween('cp1.salePrice', [51000, 100000]); // Use cp1 here
                        } elseif ($priceRange == 5) {
                            $subquery->orWhere('cp1.salePrice', '>', 100000); // Use cp1 here
                        }
                    });
                });
        }, 'sub', function ($join) {
            $join->on('main_orders.product_id', '=', 'sub.product_id');
        })
        ->where('main_orders.orderStatus', $orderStatus)
        ->when($dateInterval, function ($query) use ($dateInterval) {
            $selectedDate = now()->subDays($dateInterval * 7);
            $query->where('main_orders.created_at', '>=', $selectedDate);
        })->distinct()
        ->get();

        return MainOrderResource::collection($mainOrders);
    }   

    public function show($id)
    {
        $mainOrder = MainOrder::find($id);

        if (!$mainOrder) {
            return response()->json(['error' => 'MainOrder not found'], 404);
        }

        return new MainOrderResource($mainOrder);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MainOrder  $mainOrder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $mainOrder = MainOrder::find($id);
        $mainOrder->update([
            "orderStatus" => $data['orderStatus']
        ]);
        
        return response($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MainOrder  $mainOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mainOrder = MainOrder::find($id);
        $mainOrder->delete();
    }
}
