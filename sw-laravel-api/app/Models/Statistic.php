<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'top_people_query' => AsArrayObject::class,
            'top_movies_query' => AsArrayObject::class,
        ];
    }
}
