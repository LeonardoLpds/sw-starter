<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $people = collect($this['characters'])->map(function ($character) {
            return str($character)->afterLast('people/')->trim('/');
        });
        return [
            'type' => 'movie',
            'id' => str()->snake($this['title']),
            'title' => $this['title'],
            'opening_crawl' => $this['opening_crawl'],
            'people' => $people,
        ];
    }
}
