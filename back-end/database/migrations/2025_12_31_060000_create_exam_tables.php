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
        // 1. Exams Table
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // menh-basic, menh-inter, etc.
            $table->string('title');
            $table->string('category'); // Mệnh, Tướng, Bốc, ... (Using string for simple filtering or reuse category table if preferred, but frontend logic uses specific strings. Keeping string for now as per plan, or can map to service/product categories later. Plan said 'category' not strictly linked. Sticking to plan schema: slug, title, description...)
            // Wait, plan didn't explicitly say 'category', but frontend groups by it. I should add 'category' to be safe or link to category table.
            // Let's stick to the plan's fields: id, slug, title, description, duration, passing_score, prerequisites.
            // I'll add 'level' and 'category' as they are in the frontend constant logic.
            $table->string('level')->default('Cơ bản'); // Cơ bản, Trung cấp, Cao cấp
            $table->text('description')->nullable();
            $table->integer('duration'); // Minutes
            $table->integer('passing_score'); // Percentage (e.g. 70)
            $table->json('prerequisites')->nullable(); // List of slugs usually
            $table->timestamps();
        });

        // 2. Questions Table
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->text('content');
            $table->json('options'); // ["A" => "...", "B" => "..."]
            $table->string('correct_answer'); // "A", "B"...
            $table->string('type')->default('multiple_choice');
            $table->timestamps();
        });

        // 3. User Exams (History)
        Schema::create('user_exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->integer('score'); // 0-100
            $table->string('status'); // passed, failed
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        // 4. Certificates
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->string('code')->unique(); // Unique Cert Code
            $table->timestamp('issued_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('user_exams');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('exams');
    }
};
