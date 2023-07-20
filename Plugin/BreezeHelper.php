<?php

namespace Mgt\DeveloperToolbar\Plugin;

use Magento\Framework\App\RequestInterface;

class BreezeHelper
{
    private RequestInterface $request;

    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }

    public function afterIsTurboEnabled($subject, $result)
    {
        if (!$result) {
            return $result;
        }

        return $this->request->getFullActionName() !== 'mgtdevelopertoolbar_toolbar_container';
    }
}
