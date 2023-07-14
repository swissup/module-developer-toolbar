MGT Developer Toolbar for Magento 2
============================

The [MGT Developer Toolbar](https://www.mgt-commerce.com/docs/mgt-developer-toolbar/magento2/introduction) is a 
must-have for Magento 2 developers and frontend guys.
The toolbar shows you all important information for performance optimisation and Magento development.

![Profiler](doc/static_files/profiler_screenshot.png "Profiler")

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
