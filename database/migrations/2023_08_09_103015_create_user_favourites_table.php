<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_favourites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('location_name')->index();
            $table->decimal('latitude', 10, 8)->index();
            $table->decimal('longitude', 10, 8)->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }
};
