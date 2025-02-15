<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeopleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $movies = collect($this['films'])->map(function ($film) {
            return str($film)->afterLast('films/')->trim('/');
        });
        return [
            'type' => 'people',
            'id' => str()->snake($this['name']),
            'name' => $this['name'],
            'birth_year' => $this['birth_year'],
            'gender' => $this['gender'],
            'eye_color' => $this['eye_color'],
            'hair_color' => $this['hair_color'],
            'height' => $this['height'],
            'mass' => $this['mass'],
            'movies' => $movies,
        ];
    }
}
