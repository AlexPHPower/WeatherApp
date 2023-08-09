<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShowHomepageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\FavouritesController;
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

Route::get('/', ShowHomepageController::class);

Route::post('/favorites', [FavouritesController::class, 'store']);

Route::get('/dashboard', function () {
    return Inertia::render('Welcome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
