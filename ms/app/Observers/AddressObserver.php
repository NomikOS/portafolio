<?php

namespace App\Observers;

use App\Api\V1\Models\Address;
use App\Api\V1\Traits\TraitCommonFunctions;

/**
 * Model's events:
 * creating, created, updating, updated, saving, saved,
 * deleting, deleted, restoring, restored.
 */
class AddressObserver
{
    use TraitCommonFunctions;

    public function __construct(Address $address)
    {
        $this->address = $address;
    }

    public function saving(Address $address)
    {
        $county = $address->county ? $address->county : 'R.M.';
        $address->hash = $this->getHashFromAddress($address->name, $address->address, $address->address_number, $address->apt, $address->pisos, $county);
        $address->county = $county;
    }

}
