<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->ean8,
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'price' => $this->faker->numberBetween(100, 1000) * 100,
            'cost' => $this->faker->randomFloat(2, 0, 100),
            'image' => $this->faker->imageUrl(200, 200),
            'category_id' => $this->faker->numberBetween(1, 4),
            'stock' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'slug' => $this->faker->slug
        ];
    }
}
