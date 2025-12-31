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
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Title (e.g. MỆNH (Destiny))
            $table->string('slug')->unique(); // id (e.g. menh)
            $table->string('sub_title')->nullable(); // sub
            $table->text('description')->nullable(); // desc
            $table->string('image')->nullable(); // img
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_categories');
    }
};
