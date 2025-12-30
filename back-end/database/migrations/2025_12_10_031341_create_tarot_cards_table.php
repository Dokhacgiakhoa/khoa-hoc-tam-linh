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
        Schema::create('tarot_cards', function (Blueprint $table) {
            $table->id();
            $table->string('card_id')->unique();
            $table->integer('order_index');
            $table->string('name');
            $table->string('group');
            $table->string('image');
            $table->text('meaning_general')->nullable(); // Storing as JSON or Text
            $table->text('meaning_upright')->nullable();
            $table->text('meaning_reversed')->nullable();
            $table->text('topics')->nullable();
            $table->text('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarot_cards');
    }
};
