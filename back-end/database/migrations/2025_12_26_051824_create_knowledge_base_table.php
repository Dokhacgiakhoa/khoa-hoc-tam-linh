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
        Schema::create('knowledge_base', function (Blueprint $table) {
            $table->id();
            $table->string('category')->index(); // astrology, numerology, tuvi, tarot
            $table->string('type')->index();     // planet_sign, lifepath, star_meaning
            $table->string('slug')->unique();    // mars-aries, 7, tu-vi-cung-menh
            $table->string('title');
            $table->text('content');
            $table->json('metadata')->nullable(); // Thêm các thuộc tính số liệu hoặc keyword
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_base');
    }
};
