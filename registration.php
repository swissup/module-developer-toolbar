<?php

if (PHP_SAPI != 'cli') {
    $_SERVER['MAGE_PROFILER_STAT'] = new \Mgt\DeveloperToolbar\Model\Profiler\Driver\Standard\Stat();
    \Magento\Framework\Profiler::applyConfig(
        [
            'drivers' => [
                [
                    'output' => 'Mgt\DeveloperToolbar\Model\Driver\Output\Zero',
                    'stat'   => $_SERVER['MAGE_PROFILER_STAT'],
                ]
            ]
        ],
        BP,
        false
    );
}


\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE,
    'Mgt_DeveloperToolbar',
    __DIR__
);

if (!function_exists('dumpDie')) {
    function dumpDie(...$argc)
    {
        echo '<pre>';
        echo '<code>';
        var_dump(...$argc);
        echo '</code>';
        echo '</pre>';

    }
}

if (!function_exists('consoleLog')) {
    function consoleLog(...$argc)
    {
        $out = array_shift($argc);
        if (!is_array($out)) {
            $out = [$out];
        }
//        array_unshift($out, __FILE__ . ' :: ' . __LINE__);
        $backtrace = Spatie\Backtrace\Backtrace::create()
            ->withArguments()
            ->limit(2);
        $trace = $backtrace->frames();
        $out[] = $trace[1]->file . ' :: ' . $trace[1]->lineNumber;

        // $out = array_map(function($val){return sprintf("'%s'", $val);}, $out);
        // $out = http_build_query($out,'',', ');
        // $out = '"' . json_encode($out) . '"';
        $jsonOptions = JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT;
        $out = json_encode($out, $jsonOptions);
        echo '<script>console.log(' . $out . ');</script>';
    }
}

if (!function_exists('consoleTrace')) {
    function consoleTrace($limit = 20)
    {
        $applicationPath = BP;
        $backtrace = Spatie\Backtrace\Backtrace::create()
            ->withArguments()
//            ->reduceArguments()
            ->applicationPath($applicationPath ?? '')
            ->limit($limit)
//            ->withObject()
//            ->trimFilePaths()
        ;

        $trace = $backtrace->frames();//->toArray();

        $trace = array_map(function($frame) {
            $line = $frame->getSnippetAsString(1);
            $line = preg_replace('!\s+!', ' ', $line);
//            $line = str_pad($line, 120, ' ');

            $file = $frame->file;
            if (substr($file, 0, strlen(BP)) == BP) {
                $file = substr($file, strlen(BP));
            }
//            $file = str_pad($file, 100, ' ');
            $snippet = $frame->getSnippetAsString(10);
            $snippet = str_replace('\n', "\n", $snippet);

            return [
                'line' => $frame->lineNumber,
                'code_line' => $line,
                'file' => $file,
                'class' => $frame->class,
                'method' => $frame->method,
                'args' => $frame->arguments,
                'snippet' => $snippet,
            ];
        }, $trace);

        $out = $trace;
        array_shift($out);

        $jsonOptions = JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT;
        $out = json_encode($out, $jsonOptions);
        echo '<script>console.table(' . $out . ');</script>';
    }
}
