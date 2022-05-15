<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TemperatureController;

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

    $user = Auth::user();
    $user_id = $user->id;
    $user_name = $user->name;
    $user_email = $user->email;

    $cities_data = app('config')->get('cities');

    $city_a_name = $cities_data['city_a']['name'];
    $city_b_name = $cities_data['city_b']['name'];

    return Inertia::render('Dashboard',[
        'user_id'=>$user_id,
        'user_name'=>$user_name,
        'user_email'=>$user_email,
        'city_a'=>$city_a_name,
        'city_b'=>$city_b_name,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/load-user-temperatures')
Route::get('load-user-temperatures/', [TemperatureController::class, 'load']);
Route::get('load-hottest-temperatures/', [TemperatureController::class, 'load_hottest']);

require __DIR__.'/auth.php';
