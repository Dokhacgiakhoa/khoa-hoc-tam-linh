<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = \Illuminate\Support\Facades\File::get(database_path('data/services.json'));
        $services = json_decode($json, true);

        foreach ($services as $service) {
            DB::table('services')->updateOrInsert(
                ['service_id' => $service['id']],
                [
                    'name' => $service['name'],
                    'price' => $service['price'],
                    'description' => $service['description'],
                    'category' => $service['category'],
                    'updated_at' => now(),
                ]
            );
        }
    }
}
