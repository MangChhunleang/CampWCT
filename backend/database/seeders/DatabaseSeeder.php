<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create categories
        $categories = [
            [
                'name' => 'Tents',
                'slug' => 'tents',
                'description' => 'High-quality camping tents for all weather conditions',
                'image' => 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg',
                'is_active' => true
            ],
            [
                'name' => 'Sleeping Bags',
                'slug' => 'sleeping-bags',
                'description' => 'Comfortable sleeping bags for a good night\'s rest',
                'image' => 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg',
                'is_active' => true
            ],
            [
                'name' => 'Camping Gear',
                'slug' => 'camping-gear',
                'description' => 'Essential camping equipment and accessories',
                'image' => 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg',
                'is_active' => true
            ],
            [
                'name' => 'Outdoor Cooking',
                'slug' => 'outdoor-cooking',
                'description' => 'Camping stoves, cookware, and outdoor cooking accessories',
                'image' => 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg',
                'is_active' => true
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create products
        $products = [
            [
                'name' => '4-Person Dome Tent',
                'slug' => '4-person-dome-tent',
                'description' => 'Spacious 4-person dome tent with weather protection',
                'price' => 199.99,
                'stock' => 10,
                'is_active' => true,
                'category_id' => 1,
                'image' => 'https://images.pexels.com/photos/264440/pexels-photo-264440.jpeg'
            ],
            [
                'name' => 'Mummy Sleeping Bag',
                'slug' => 'mummy-sleeping-bag',
                'description' => 'Warm and comfortable mummy-style sleeping bag',
                'price' => 79.99,
                'stock' => 15,
                'is_active' => true,
                'category_id' => 2,
                'image' => 'https://images.pexels.com/photos/1289560/pexels-photo-1289560.jpeg'
            ],
            [
                'name' => 'Camping Stove',
                'slug' => 'camping-stove',
                'description' => 'Portable camping stove for outdoor cooking',
                'price' => 49.99,
                'stock' => 20,
                'is_active' => true,
                'category_id' => 3,
                'image' => 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg'
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
} 