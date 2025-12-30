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
        // 1. Danh mục Ngũ Huyền Thuật
        Schema::create('course_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Sơn, Y, Mệnh, Tướng, Bốc
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // 2. Khóa học
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('course_categories');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->decimal('price', 15, 2)->default(0); // Nếu học phí bằng 0 là miễn phí
            $table->enum('level', ['Cơ bản', 'Trung cấp', 'Cao cấp'])->default('Cơ bản');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 3. Bài học
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('title');
            $table->text('content')->nullable(); // Nội dung văn bản
            $table->string('video_url')->nullable(); // Link video bài giảng
            $table->integer('order')->default(0); // Thứ tự bài học
            $table->boolean('is_preview')->default(false); // Cho xem trước không?
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('course_categories');
    }
};
