<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\PeopleResource;
use App\Jobs\SaveSearch;
use App\Models\Statistic;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class SwController extends Controller
{
    public function search(SearchRequest $request)
    {
        extract($request->only('query', 'type'));
        $path = $type === 'movie' ? 'films' : 'people';

        $response = Http::get(config('services.swapi.url') . "/{$path}", ["search" => $query]);
        $resource = $type === 'movie' ? MovieResource::class : PeopleResource::class;
        return $resource::collection($response->json('results') ?? []);
    }

    public function getById($type, $id)
    {
        $path = $type === 'movie' ? 'films' : 'people';
        $response = Http::get(config('services.swapi.url') . "/{$path}/{$id}")->json();
        $resource = $type === 'movie' ? MovieResource::class : PeopleResource::class;
        return new $resource($response);
    }

    public function statistics()
    {
        return Statistic::all();
    }
}
