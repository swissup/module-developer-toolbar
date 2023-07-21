# MGT Developer Toolbar for Magento 2

<p align="center"><img alt="Toolbar Screenshot" src="doc/static_files/profiler_screenshot.png" width="773" height="133"/></p>

## Installation

```
composer require swissup/module-debug-toolbar --dev
bin/magento module:enable Mgt_DeveloperToolbar
bin/magento config:set mgt_developer_toolbar/module/is_enabled 1
```

## Main Features

* Profiler
* Memory Consumption
* List of all Database Queries
* Block nesting
* Cache Storage Information
* Session Storage Information
* Enabled / Disabled Modules
* Request / Response Data
* Handles
* Events / Observers
* Plugins
* Preferences
* PHP-Info

## Differences with [original repo](https://github.com/mgtcommerce/Mgt_Developertoolbar)

* PHP 8.2 compatible
* Magento 2.4.6 compatible
* Improved database page
* Similar queries feature
* Improved profiler page performance
* Filter profiler by significant entries
* [Breezefront](https://breezefront.com) compatible
