<?php

namespace App\Providers;

use App\Api\V1\Models\OrderItem;
use App\Api\V1\Models\Vehicle;
use App\Api\V1\Models\Address;
use App\Api\V1\Models\Quote;
use App\Observers\OrderItemObserver;
use App\Observers\VehicleObserver;
use App\Observers\AddressObserver;
use App\Observers\QuoteObserver;
use Illuminate\Support\ServiceProvider;

class ObserverServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Vehicle::observe($this->app->make(VehicleObserver::class));
        OrderItem::observe($this->app->make(OrderItemObserver::class));
        Address::observe($this->app->make(AddressObserver::class));
        Quote::observe($this->app->make(QuoteObserver::class));
    }

    public function register()
    {
        $this->app->singleton(VehicleObserver::class, function ()
        {
            return new VehicleObserver(new Vehicle());
        });

        $this->app->singleton(OrderItemObserver::class, function ()
        {
            return new OrderItemObserver(new OrderItem());
        });

        $this->app->singleton(AddressObserver::class, function ()
        {
            return new AddressObserver(new Address());
        });

        $this->app->singleton(QuoteObserver::class, function ()
        {
            return new QuoteObserver(new Quote());
        });
    }
}
