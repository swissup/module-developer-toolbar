define([
    'jquery',
    'Mgt_DeveloperToolbar/js/toolbar/popup'
], function ($) {
    'use strict';

    function toggleToolbar(useState) {
        var toolbar = $('#mgt-developer-toolbar').show(),
            toolbarBlocksContainer = $('#mgt-developer-toolbar-blocks'),
            savedState = window.localStorage.getItem('mgt-developer-toolbar'),
            isCollapsible = +$(toolbar).attr('data-collapsible'),
            state = !savedState || savedState === 'false';

        if (!isCollapsible) {
            state = true;
        } else if (useState) {
            state = !savedState || savedState === 'true';
        }

        toolbarBlocksContainer.toggle(state);
        toolbar.toggleClass('collapsed', !state);
        window.localStorage.setItem('mgt-developer-toolbar', state);
    }

    function init() {
        toggleToolbar(true);

        $('.mgt-developer-toolbar-logo').on('click', function () {
            toggleToolbar();
        });

        $('#mgt-developer-toolbar').on('dblclick', function () {
            toggleToolbar();
        });

        $('#mgt-developer-toolbar').on('mousedown', function (event) {
            if (event.detail > 1) {
                event.preventDefault(); // prevent text selection
            }
        });

        $('#mgt-developer-toolbar-blocks .mgt-developer-toolbar-block').on('mouseover', function () {
            $('.mgt-developer-toolbar-block-information').hide();
            $('.mgt-developer-toolbar-block-information').eq($(this).index()).show();
        });

        $('#mgt-developer-toolbar').on('mouseout', function () {
            $('.mgt-developer-toolbar-block-information').hide();
        });
    }

    if ($.breeze) {
        $(document).on('breeze:load', init);
    } else {
        init();
    }
});
