<?php

namespace App\Observers;

use App\Api\V1\Models\Vehicle;

/**
 * Model's events:
 * creating, created, updating, updated, saving, saved, deleting, deleted, restoring, restored.
 */
class VehicleObserver
{
    public function __construct(Vehicle $vehicle)
    {
        $this->vehicle = $vehicle;
    }

    public function saving(Vehicle $vehicle)
    {
    	/**
    	 * Name based on ppu if needed
    	 */
        $vehicle->name = $vehicle->name ? $vehicle->name : $vehicle->ppu;
    }

}
