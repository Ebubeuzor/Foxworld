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
        Schema::create('homepages', function (Blueprint $table) {
            $table->id();
            $table->longText('homevideo')->nullable();
            $table->longText('Section1Title')->nullable();
            $table->longText('Section1Image')->nullable();
            $table->longText('Section2aCategory')->nullable();
            $table->longText('Section2aImage')->nullable();
            $table->longText('Section2bCategory')->nullable();
            $table->longText('Section2bImage')->nullable();
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
        Schema::dropIfExists('homepages');
    }
};
