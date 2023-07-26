<?php
/**
 * MGT-Commerce GmbH
 * https://www.mgt-commerce.com
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to contact@mgt-commerce.com so we can send you a copy immediately.
 *
 * @category    Mgt
 * @package     Mgt_DeveloperToolbar
 * @author      Stefan Wieczorek <stefan.wieczorek@mgt-commerce.com>
 * @copyright   Copyright (c) 2020 (https://www.mgt-commerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
namespace Mgt\DeveloperToolbar\Block;

use Magento\Developer\Helper\Data as DeveloperHelper;
use Magento\Framework\View\Element\Template;

class Toolbar extends Template
{
    /**
     * @var \Mgt\DeveloperToolbar\Model\Config
     */
    protected $config;

    /**
     * @var Boolean
     */
    protected $collapsible = true;
    
    /**
     * @var String
     */
    protected $token;

    /**
     * @param Context $context
     */
    public function __construct(
        Context $context
    ) {
        $this->config = $context->getConfig();
        parent::__construct($context);
    }
    
    public function canShow()
    {
        return $this->config->isEnabled() && $this->config->isAllowed();
    }
    
    public function setCollapsible($flag)
    {
        $this->collapsible = (bool)$flag;
    }
    
    public function isCollapsible()
    {
        return $this->collapsible;
    }
    
    public function setToken($token)
    {
        $this->token = $token;
    }
    
    public function getToken()
    {
        if (!$this->token) {
            $this->token = substr(sha1(time()),0,8);
        }
        return $this->token;
    }
}
