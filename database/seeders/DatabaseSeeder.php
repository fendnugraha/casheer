<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Journal;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'fend',
            'email' => 'fend@jour.com',
        ]);

        ProductCategory::insert([
            [
                'name' => 'Food',
                'slug' => 'food'
            ],

            [
                'name' => 'Drink',
                'slug' => 'drink'
            ],

            [
                'name' => 'Snack',
                'slug' => 'snack'
            ],

            [
                'name' => 'Others',
                'slug' => 'others'
            ],

        ]);

        Journal::factory(10)->create();
        Product::factory(30)->create();
    }
}
