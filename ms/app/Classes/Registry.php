<?php

namespace App\Classes;

class Registry
{
    private static $_registry;

    public static function set($key, $object)
    {
        self::$_registry[$key] = $object;
    }

    public static function get($key)
    {
        if (!isset(self::$_registry[$key])) {
            throw InvalidArgumentException("Key $key is not available in the registry");
        }

        return self::$_registry[$key];
    }
}
