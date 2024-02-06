<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::all();
        return Inertia::render('Products/Index', [
            'products' => Product::with('category')->get(),
            'title' => 'Products Page',
            'description' => 'List of all products',
            'categories' => $categories,

        ]);
    }
}
