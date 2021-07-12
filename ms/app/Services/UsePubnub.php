<?php

namespace App\Services;

use Pubnub\Pubnub;

class UsePubnub extends Service
{
    protected $pubnubInstance = null;

    public function pubnub()
    {
        if (!$this->pubnubInstance) {
            $this->pubnubInstance = new Pubnub(array(
                'publish_key' => 'xxx', // env('PUBNUB_PUBLISH_KEY'),
                'subscribe_key' => 'xxx', // env('PUBNUB_SUBSCRIBE_KEY'),
            ));
        }

        return $this->pubnubInstance;
    }

    public function send($channel = 'test1', $data)
    {
        $info = $this->pubnub()->publish($channel, $data);
        return $info;
    }
}
