<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Tents
            [
                'name' => '4-Person Dome Tent',
                'description' => 'Spacious dome tent perfect for family camping trips',
                'price' => 199.99,
                'stock' => 15,
                'category_id' => 1,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500&h=300&fit=crop',
            ],
            [
                'name' => '2-Person Backpacking Tent',
                'description' => 'Lightweight tent ideal for backpacking adventures',
                'price' => 149.99,
                'stock' => 20,
                'category_id' => 1,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=300&fit=crop',
            ],
            // Sleeping Bags
            [
                'name' => 'Winter Sleeping Bag',
                'description' => 'Warm sleeping bag rated for temperatures down to -10°C',
                'price' => 129.99,
                'stock' => 25,
                'category_id' => 2,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
            ],
            [
                'name' => 'Summer Sleeping Bag',
                'description' => 'Lightweight sleeping bag perfect for summer camping',
                'price' => 79.99,
                'stock' => 30,
                'category_id' => 2,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            // Camping Furniture
            [
                'name' => 'Camping Chair',
                'description' => 'Comfortable and portable camping chair',
                'price' => 39.99,
                'stock' => 40,
                'category_id' => 3,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            [
                'name' => 'Folding Camp Table',
                'description' => 'Compact and sturdy camping table',
                'price' => 59.99,
                'stock' => 20,
                'category_id' => 3,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            // Cooking Equipment
            [
                'name' => 'Portable Camping Stove',
                'description' => 'Two-burner propane camping stove',
                'price' => 89.99,
                'stock' => 15,
                'category_id' => 4,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            [
                'name' => 'Camping Cookware Set',
                'description' => 'Complete set of camping pots and pans',
                'price' => 69.99,
                'stock' => 25,
                'category_id' => 4,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            // Lighting
            [
                'name' => 'LED Camping Lantern',
                'description' => 'Bright and energy-efficient camping lantern',
                'price' => 29.99,
                'stock' => 35,
                'category_id' => 5,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
            [
                'name' => 'Headlamp',
                'description' => 'Hands-free LED headlamp for night activities',
                'price' => 24.99,
                'stock' => 45,
                'category_id' => 5,
                'is_active' => true,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'category_id' => $product['category_id'],
                'is_active' => $product['is_active'],
                'image' => $product['image'],
            ]);
        }
    }
} 