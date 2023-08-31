<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main_orders', function (Blueprint $table) {
            $table->id();
            $table->string("transaction")->nullable();
            $table->foreignIdFor(\App\Models\Product::class, 'product_id');
            $table->foreignIdFor(\App\Models\User::class, 'user_id');
            $table->foreignIdFor(\App\Models\Order::class, 'order_id');
            $table->string('paymentStatus')->mullable(); 
            $table->string('orderStatus')->nullable(); 
            $table->boolean('refunded')->default(false)->nullable(); 
            $table->boolean('canceled')->default(false)->nullable(); 
            $table->timestamp('refundTimestamp')->nullable();
            $table->timestamp('cancellationTimestamp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('main_orders');
    }
};
