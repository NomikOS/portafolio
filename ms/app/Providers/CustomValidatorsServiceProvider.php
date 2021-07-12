<?php

namespace App\Providers;

use App\Api\V1\Traits\TraitCommonFunctions;
use Illuminate\Support\ServiceProvider;

class CustomValidatorsServiceProvider extends ServiceProvider
{
    use TraitCommonFunctions;

    public function boot()
    {
        $this->app['validator']->extend('rut', function ($attribute, $value, $parameters)
        {
            if ( ! $this->formatAndValidateRut($value))
            {
                return false;
            }

            return true;
        });

        $this->app['validator']->extend('phone9', function ($attribute, $value, $parameters)
        {
            if ( strlen(trim($value)) != 9)
            {
                return false;
            }

            return true;
        });        
    }

    public function register()
    {
    }
}
