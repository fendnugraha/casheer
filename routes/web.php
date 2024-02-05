<?php

use App\Http\Controllers\JournalController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(JournalController::class)->group(function () {
    Route::get('/journals', 'index')->name('journals');
    Route::get('/journals/create', 'create')->name('journals.create');
    Route::post('/journals', 'store')->name('journals.store');
    Route::get('/journals/{journal}', 'show')->name('journals.show');
    Route::get('/journals/{journal}/edit', 'edit')->name('journals.edit');
    Route::put('/journals/{journal}', 'update')->name('journals.update');
    Route::delete('/journals/{journal}', 'destroy')->name('journals.destroy');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index')->name('products');
    Route::get('/products/create', 'create')->name('products.create');
    Route::post('/products', 'store')->name('products.store');
    Route::get('/products/{product}', 'show')->name('products.show');
    Route::get('/products/{product}/edit', 'edit')->name('products.edit');
    Route::put('/products/{product}', 'update')->name('products.update');
    Route::delete('/products/{product}', 'destroy')->name('products.destroy');
});



require __DIR__ . '/auth.php';
