<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [MessageController::class, 'userDisplay']);
    Route::get('/messages/{id}', [MessageController::class, 'messageDisplay']);
    Route::post('/message/send', [MessageController::class, 'sendMessage']);
});
