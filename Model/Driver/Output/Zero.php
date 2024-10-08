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
namespace Mgt\DeveloperToolbar\Model\Driver\Output;

use Magento\Framework\Profiler\Driver\Standard\Stat;
use Magento\Framework\Profiler\Driver\Standard\OutputInterface;
use Magento\Framework\App\ObjectManager;
use Mgt\DeveloperToolbar\Helper\Toolbar;

class Zero implements OutputInterface
{
    public function display(Stat $stat)
    {
        try {
            $objectManager = ObjectManager::getInstance();

            $registry = $objectManager->get('\Magento\Framework\Registry');
            $config = $objectManager->get('\Mgt\DeveloperToolbar\Model\Config');
            $isEnabled = $config->isEnabled() && $config->isAllowed();
            $collect = $registry->registry('mgt_developer_toolbar_collect');

            if ($isEnabled && $collect !== false) {
                $cache = $objectManager->get('\Magento\Framework\App\CacheInterface');
                $token = $registry->registry('mgt_developer_toolbar_token');

                $timers = $this->getTimers($stat);

                $cacheId = sprintf('%s_%s', Toolbar::CACHE_ID_TIMERS_PREFIX, $token);
                $cache->save(json_encode($timers), $cacheId, [Toolbar::CACHE_TAG]);

                $resourceConnection = $objectManager->get('\Magento\Framework\App\ResourceConnection');
                $readConnection = $resourceConnection->getConnection('read');
                $dbProfiler = $readConnection->getProfiler();
                $queryProfiles = $dbProfiler->getQueryProfiles();
                $queries = array();

                if ($queryProfiles && count($queryProfiles)) {
                    foreach ($queryProfiles as $queryProfile) {
                        $queries[] = [
                            'query' => $queryProfile->getQuery(),
                            'type'  => $queryProfile->getQueryType(),
                            'time'  => $queryProfile->getElapsedSecs()
                        ];
                    }
                }

                $cacheId = sprintf('%s_%s', Toolbar::CACHE_ID_QUERIES_PREFIX, $token);
                $cache->save(json_encode($queries), $cacheId, [Toolbar::CACHE_TAG]);
            }

            $reflectionClass = new \ReflectionClass('\Magento\Framework\Profiler');
            $reflectionProperty = $reflectionClass->getProperty('_enabled');
            $reflectionProperty->setAccessible(true);
            $reflectionProperty->setValue($reflectionClass, false);

        } catch (\Exception $e) {
        }
    }

    private function getTimers(Stat $stat)
    {
        $timers = [];
        $filteredTimerIds = [];

        try {
            $filteredTimerIds = $stat->getFilteredTimerIds();
        } catch (\Exception $e) {
        }

        foreach ($filteredTimerIds as $timerId) {
            $timers[] = [
                'id'  => $timerId,
                'sum'   => $stat->fetch($timerId, 'sum'),
                'avg'   => $stat->fetch($timerId, 'avg'),
                'count' => $stat->fetch($timerId, 'count'),
            ];
        }

        return $timers;
    }
}
