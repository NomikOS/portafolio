<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class InputFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);

        $method = $request->method();
        $url = implode('/', $request->segments());

        $response = $next($request);
        $status = $response->status();

        $str1 =
            "\n\n\n\n\n---------------------------------------\n"
            . "||||||||||||| URL && INPUT ($method) |||||"
            . "\n---------------------------------------\n"
            . "$url";

        $str2 =
            "\n---------------------------------------\n"
            . "||||||||||||| OUTPUT ($status) ||||||||||||"
            . "\n---------------------------------------\n"
            . "$url";

        $str3 =
            "\n---------------------------------------\n"
            . "------------- END ---------------------"
            . "\n---------------------------------------\n";

        if (method_exists($response, 'getOriginalContent') && isset($resp['debug'])) {
            $resp = $response->getOriginalContent();

            unset($resp['debug']['trace']);
            $r = $resp;
        } else {
            $r = json_decode($response->getContent());
        }

        /**
         * @see https://laravel.com/api/master/Illuminate/Http/Response.html
         */

        return $response;
    }
}
