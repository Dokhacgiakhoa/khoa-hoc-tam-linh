<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Nâng cấp bảng USERS
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'uuid')) {
                    $table->uuid('uuid')->nullable()->after('id');
                }
                if (!Schema::hasColumn('users', 'birth_place')) {
                    $table->string('birth_place', 100)->nullable()->after('birth_time');
                }
                if (!Schema::hasColumn('users', 'is_lunar_birth')) {
                    $table->boolean('is_lunar_birth')->default(false)->after('birth_place');
                }
                if (!Schema::hasColumn('users', 'spiritual_level')) {
                    $table->string('spiritual_level', 50)->default('Tân Học')->after('level');
                }
                if (!Schema::hasColumn('users', 'frozen_balance')) {
                    $table->decimal('frozen_balance', 15, 2)->default(0)->after('balance');
                }
            });

            // Tự động gán UUID cho các users hiện tại nếu chưa có
            $users = DB::table('users')->whereNull('uuid')->get();
            foreach ($users as $u) {
                DB::table('users')->where('id', $u->id)->update(['uuid' => (string) Str::uuid()]);
            }

            // Đặt unique index cho uuid nếu chưa có
            try {
                Schema::table('users', function (Blueprint $table) {
                    $table->unique('uuid');
                });
            } catch (\Throwable $e) {
                // Ignore if unique index already exists
            }
        }

        // 2. Nâng cấp bảng TRANSACTIONS
        if (Schema::hasTable('transactions')) {
            Schema::table('transactions', function (Blueprint $table) {
                if (!Schema::hasColumn('transactions', 'transaction_code')) {
                    $table->string('transaction_code', 50)->nullable()->after('id');
                }
                if (!Schema::hasColumn('transactions', 'balance_before')) {
                    $table->decimal('balance_before', 15, 2)->default(0)->after('amount');
                }
                if (!Schema::hasColumn('transactions', 'balance_after')) {
                    $table->decimal('balance_after', 15, 2)->default(0)->after('balance_before');
                }
            });
        }

        // 3. Tạo bảng 64 QUẺ KINH DỊCH (ICHING_HEXAGRAMS)
        if (!Schema::hasTable('iching_hexagrams')) {
            Schema::create('iching_hexagrams', function (Blueprint $table) {
                $table->id();
                $table->unsignedInteger('hexagram_number')->unique(); // 1 - 64
                $table->string('name_vi', 100);       // Thuần Càn, Thuần Khôn, Thủy Lôi Truân
                $table->string('name_chinese', 50);   // 乾, 坤, 屯
                $table->string('pinyin', 50)->nullable();
                $table->string('upper_trigram', 20);  // Ngoại quái: Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn
                $table->string('lower_trigram', 20);  // Nội quái
                $table->char('binary_code', 6);       // '111111'
                $table->text('general_meaning');      // Ý nghĩa tổng quan
                $table->text('judgment');             // Lời Thoán
                $table->text('image_meaning');        // Lời Tượng
                $table->json('lines_explanation');    // 6 Hào
                $table->text('action_advice');        // Lời khuyên hành động
                $table->json('tags')->nullable();
                $table->timestamps();

                $table->index('hexagram_number');
                $table->index('upper_trigram');
                $table->index('lower_trigram');
            });
        }

        // 4. Tạo bảng AI READING SESSIONS (Lưu vết & Huấn luyện AI Huyền Học)
        if (!Schema::hasTable('ai_reading_sessions')) {
            Schema::create('ai_reading_sessions', function (Blueprint $table) {
                $table->id();
                $table->string('session_code', 50)->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('service_type', 50); // 'tarot', 'kinh_dich', 'tu_vi', 'than_so_hoc', 'ban_do_sao'
                $table->json('user_input_data');     // Dữ liệu ngày sinh, câu hỏi, bối cảnh
                $table->json('reading_result');      // Các lá bài hoặc quẻ lập được
                $table->mediumText('ai_interpretation'); // Nội dung AI phân tích
                $table->string('ai_model_used', 50)->default('gemini-1.5-pro');
                $table->boolean('is_unlocked')->default(false);
                $table->unsignedTinyInteger('rating')->nullable(); // 1-5 sao
                $table->text('feedback')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'service_type', 'created_at'], 'idx_session_user_type');
                $table->index('service_type');
            });
        }

        // 5. Thêm Composite Indexes tối ưu hóa hiệu năng truy vấn
        $this->addIndexSafely('products', ['category_id', 'is_featured'], 'idx_products_cat_feat');
        $this->addIndexSafely('orders', ['user_id', 'status', 'created_at'], 'idx_orders_user_status_date');
        $this->addIndexSafely('order_items', ['buyable_type', 'buyable_id'], 'idx_order_items_polymorphic');
        $this->addIndexSafely('lessons', ['course_id', 'order_index'], 'idx_lessons_course_order');
        $this->addIndexSafely('course_enrollments', ['user_id', 'course_id'], 'idx_enrollments_user_course');
        $this->addIndexSafely('notifications', ['user_id', 'read_at'], 'idx_notif_user_read');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_reading_sessions');
        Schema::dropIfExists('iching_hexagrams');

        if (Schema::hasTable('transactions')) {
            Schema::table('transactions', function (Blueprint $table) {
                $table->dropColumn(['transaction_code', 'balance_before', 'balance_after']);
            });
        }

        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn(['uuid', 'birth_place', 'is_lunar_birth', 'spiritual_level', 'frozen_balance']);
            });
        }
    }

    /**
     * Helper to safely add indexes without crashing if already exists
     */
    private function addIndexSafely(string $table, array $columns, string $indexName): void
    {
        if (Schema::hasTable($table)) {
            try {
                Schema::table($table, function (Blueprint $t) use ($columns, $indexName) {
                    $t->index($columns, $indexName);
                });
            } catch (\Throwable $e) {
                // Index already exists, ignore
            }
        }
    }
};
