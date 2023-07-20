define([
    'jquery'
], function ($) {
    'use strict';

    var Cookie = {
        all: function () {
            var pairs = document.cookie.split(';'),
                cookies = {};

            $.each(pairs, function (key, value) {
                var pair = value.trim().split('=');

                cookies[unescape(pair[0])] = unescape(pair[1]);
            });

            return cookies;
        },
        read: function (cookieName) {
            var cookies = this.all();

            if (cookies[cookieName]) {
                return cookies[cookieName];
            }

            return null;
        },
        write: function (cookieName, cookieValue, cookieLifeTime) {
            var expires = '',
                urlPath = '/',
                date = new Date();

            if (cookieLifeTime) {
                date.setTime(date.getTime() + cookieLifeTime * 1000);
                expires = '; expires=' + date.toGMTString();
            }

            document.cookie = escape(cookieName) + '=' + escape(cookieValue) + expires + '; path=' + urlPath;
        },
        clear: function (cookieName) {
            this.write(cookieName, '', -1);
        }
    };

    function toggleToolbar(state) {
        var toolbar = $('#mgt-developer-toolbar'),
            toolbarBlocksContainer = $('#mgt-developer-toolbar-blocks'),
            toolbarCookieValue = Cookie.read('mgt-developer-toolbar'),
            isCollapsible = $(toolbar).attr('data-collapsible');

        if (isCollapsible) {
            if (state) {
                if (!toolbarCookieValue || toolbarCookieValue === 'open') {
                    Cookie.write('mgt-developer-toolbar', 'open');
                    toolbar.css('width', '');
                    toolbarBlocksContainer.show();
                }

                if (toolbarCookieValue === 'closed') {
                    Cookie.write('mgt-developer-toolbar', 'closed');
                    toolbar.css('width', '50px');
                    toolbarBlocksContainer.hide();
                }
            } else {
                if (toolbarCookieValue === 'open') {
                    Cookie.write('mgt-developer-toolbar', 'closed');
                    toolbar.css('width', '50px');
                    toolbarBlocksContainer.hide();
                } else {
                    Cookie.write('mgt-developer-toolbar', 'open');
                    toolbar.css('width', '');
                    toolbarBlocksContainer.show();
                }
            }

            toolbar.show();
        } else {
            Cookie.write('mgt-developer-toolbar', 'open');
            toolbar.css('width', '');
            toolbarBlocksContainer.show();
            toolbar.show();
        }
    }

    function init() {
        toggleToolbar(true);

        $('.mgt-developer-toolbar-logo').on('click', function () {
            toggleToolbar(false);
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
