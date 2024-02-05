<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name', 100)->unique();
            $table->string('description', 255);
            $table->float('price');
            $table->float('cost');
            $table->string('image');
            $table->foreignId('category_id');
            $table->integer('stock');
            $table->string('status');
            $table->string('slug');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
