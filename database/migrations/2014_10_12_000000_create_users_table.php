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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('date_of_birth')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('google_id')->nullable();
            $table->string('city')->nullable();
            $table->string('address1')->nullable();
            $table->string('admin')->nullable();
            $table->string('address2')->nullable();
            $table->string('phoneno')->nullable();
            $table->string('zipcode')->nullable();
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
        Schema::dropIfExists('users');
    }
};
