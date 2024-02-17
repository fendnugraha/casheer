<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductCategory;

class SalesController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::all();
        return Inertia::render('Sales/Index', [
            'products' => Product::with('category')->get(),
            'active' => true,
            'title' => 'Products Page',
            'description' => 'List of all products',
            'categories' => $categories,

        ]);
    }
}
