<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        
        // Truncate the tables
        Product::truncate();
        Category::truncate();
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $categories = [
            [
                'name' => 'Tents',
                'description' => 'Various types of camping tents for different weather conditions and group sizes',
                'is_active' => true,
            ],
            [
                'name' => 'Sleeping Bags',
                'description' => 'Comfortable and weather-appropriate sleeping bags for camping',
                'is_active' => true,
            ],
            [
                'name' => 'Camping Furniture',
                'description' => 'Chairs, tables, and other furniture for your camping comfort',
                'is_active' => true,
            ],
            [
                'name' => 'Cooking Equipment',
                'description' => 'Stoves, cookware, and other cooking essentials for outdoor cooking',
                'is_active' => true,
            ],
            [
                'name' => 'Lighting',
                'description' => 'Lanterns, flashlights, and other lighting solutions for camping',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => $category['is_active'],
            ]);
        }
    }
} 