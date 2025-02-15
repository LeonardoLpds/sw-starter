<?php

namespace App\Http\Middleware;

use App\Jobs\SaveSearch;
use Carbon\Carbon;
use Closure;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackSearch
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $start = Carbon::now();
        $response = $next($request);
        $end = Carbon::now();
        $data = json_decode($response->getContent())->data;
        extract($request->only('query', 'type'));
        SaveSearch::dispatch($query, $type, count($data), $start->diffInSeconds($end));

        return $response;
    }
}
