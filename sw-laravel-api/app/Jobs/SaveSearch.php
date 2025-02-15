<?php

namespace App\Jobs;

use App\Models\Search;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SaveSearch implements ShouldQueue
{
    use Queueable;

    protected string $query;
    protected string $type;
    protected int $resultsCount;
    protected float $searchTime;

    /**
     * Create a new job instance.
     */
    public function __construct(string $query, string $type, int $resultsCount, float $searchTime)
    {
        $this->query = $query;
        $this->type = $type;
        $this->resultsCount = $resultsCount;
        $this->searchTime = $searchTime;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Search::create([
            'query' => $this->query,
            'type' => $this->type,
            'results_count' => $this->resultsCount,
            'search_time' => $this->searchTime,
        ]);
    }
}
