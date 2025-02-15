<?php

namespace App\Jobs;

use App\Models\Statistic;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateStats implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  /**
   * Execute the job.
   */
  public function handle()
  {
    $totalPeopleSearches = DB::table('searches')->where('type', 'people')->count();
    $topPeopleQuery = DB::table('searches')
      ->select('query', DB::raw('count(*) as total'))
      ->where('type', 'people')
      ->groupBy('query')
      ->orderBy('total', 'desc')
      ->limit(5)
      ->get();
    $topPeopleQuery = $topPeopleQuery->map(function ($item) use ($totalPeopleSearches) {
      $item->percentage = round(($item->total / $totalPeopleSearches) * 100, 2);
      return $item;
    });
    $averagePeopleSearchTime = DB::table('searches')
      ->where('type', 'people')
      ->avg('search_time');

    $totalMoviesSearches = DB::table('searches')->where('type', 'movie')->count();
    $topMoviesQuery = DB::table('searches')
      ->select('query', DB::raw('count(*) as total'))
      ->where('type', 'movie')
      ->groupBy('query')
      ->orderBy('total', 'desc')
      ->limit(5)
      ->get();
    $topMoviesQuery = $topMoviesQuery->map(function ($item) use ($totalMoviesSearches) {
      $item->percentage = round(($item->total / $totalMoviesSearches) * 100, 2);
      return $item;
    });
    $averageMoviesSearchTime = DB::table('searches')
      ->where('type', 'movie')
      ->avg('search_time');

    $mostPopularHour = DB::table('searches')
      ->select(DB::raw('HOUR(created_at) as hour'), DB::raw('count(*) as total'))
      ->groupBy('hour')
      ->orderBy('total', 'desc')
      ->first();
    $mostPopularHour = $mostPopularHour ? $mostPopularHour->hour : null;

    $statistic = Statistic::firstOrNew(['id' => 1]);
    $statistic->top_people_query = $topPeopleQuery->toArray();
    $statistic->average_people_search_time = round($averagePeopleSearchTime, 2);
    $statistic->top_movies_query = $topMoviesQuery->toArray();
    $statistic->average_movies_search_time = round($averageMoviesSearchTime, 2);
    $statistic->most_popular_hour = $mostPopularHour;
    $statistic->save();
  }
}
