<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Category Routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::patch('/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

// Product Routes
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::patch('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);

// Public route: Register a new user
Route::post('/register', function (Request $request) {
    try {
        Log::info('Register endpoint hit', ['request' => $request->all()]);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        Log::info('Validation passed');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Log::info('User created', ['user' => $user]);

        return $user;
    } catch (\Exception $e) {
        Log::error('Registration error', ['error' => $e->getMessage()]);
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Public route: Login and get API token
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['token' => $token]);
});

// Protected route: Get the authenticated user (requires Bearer token)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Debug route: List all tables in the database (for development only)
Route::get('/db-test', function () {
    return \DB::select('SHOW TABLES');
});

// Test route for frontend-backend connectivity
Route::get('/test', function () {
    return response()->json(['message' => 'Hello from Laravel!']);
});

// Email testing endpoint
Route::post('/test-email', function (Request $request) {
    try {
        $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        // Send email using Laravel's Mail facade
        \Mail::raw($request->message, function($message) use ($request) {
            $message->to($request->to)
                    ->subject($request->subject)
                    ->from('noreply@camphaven.com', 'Camp Haven');
        });

        return response()->json([
            'success' => true,
            'message' => 'Email sent successfully!',
            'to' => $request->to,
            'subject' => $request->subject
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to send email: ' . $e->getMessage()
        ], 500);
    }
});

// View email logs endpoint
Route::get('/email-logs', function () {
    try {
        $logFile = storage_path('logs/laravel.log');
        if (!file_exists($logFile)) {
            return response()->json(['message' => 'No log file found']);
        }

        $logContent = file_get_contents($logFile);
        $lines = explode("\n", $logContent);
        
        // Get last 50 lines for email-related logs
        $emailLogs = [];
        $recentLines = array_slice($lines, -50);
        
        foreach ($recentLines as $line) {
            if (strpos($line, 'mail') !== false || strpos($line, 'email') !== false) {
                $emailLogs[] = $line;
            }
        }

        return response()->json([
            'success' => true,
            'email_logs' => $emailLogs,
            'total_lines' => count($emailLogs)
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to read logs: ' . $e->getMessage()
        ], 500);
    }
}); 