<?php

require_once __DIR__ . '/../../debugger.php';

class RenderCest
{
    /**
     * @group test
     * @param ApiTester $I [description]
     */
    public function x(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPOST('/', $input);
        $I->seeResponseCodeIs(200);
    }

}
