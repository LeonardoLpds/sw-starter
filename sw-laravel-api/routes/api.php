<?php

use App\Http\Controllers\SwController;
use App\Http\Middleware\TrackSearch;
use Illuminate\Support\Facades\Route;

Route::get('/search', [SwController::class, 'search'])->middleware(TrackSearch::class);
Route::get('/{type}/{id}', [SwController::class, 'getById']);

Route::get('/statistics', [SwController::class, 'statistics']);
