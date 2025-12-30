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
            $table->id('db_id');
            $table->string('product_id')->unique();
            $table->string('name');
            $table->decimal('price', 15, 2);
            $table->string('category');
            $table->string('description')->nullable();
            $table->text('detailed_description')->nullable();
            $table->string('image');
            $table->integer('views')->default(0);
            $table->integer('stock')->default(0);
            $table->integer('sold')->default(0);
            $table->boolean('is_custom')->default(false);
            $table->boolean('is_featured')->default(false);
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
