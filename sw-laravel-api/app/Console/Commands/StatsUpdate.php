<?php

namespace App\Console\Commands;

use App\Jobs\UpdateStats;
use Illuminate\Console\Command;

class StatsUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:stats-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update search statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        UpdateStats::dispatch();
        $this->info('Search statistics update job dispatched successfully.');
    }
}
