define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    document.head.appendChild(document.createElement('style')).innerHTML = `
        .modal-mgt-toolbar-popup {
            --mgt-toolbar-popup-modal-gap: 20px;
            .breeze-theme & {
                --mgt-toolbar-popup-modal-gap: 0px;
            }

            z-index: 999999;

            .modal-inner-wrap {
                left: 0 !important;
                margin: var(--mgt-toolbar-popup-modal-gap) auto !important;
                width: calc(100% - var(--mgt-toolbar-popup-modal-gap) * 2) !important;
                height: calc(100% - var(--mgt-toolbar-popup-modal-gap) * 2) !important;
                max-width: 1600px !important;
                max-height: none !important;
            }

            .modal-content {
                flex-grow: 1;
            }

            iframe {
                border: 0;
                width: 100%;
                height: 100%;
            }
        }
    `;

    function openModal(content) {
        var iframe = $('<iframe></iframe>'),
            style = `<style>
                .mgt-developer-toolbar-return-to-site {
                    display: none;
                }
            </style>`;

        iframe.modal({
            modalClass: 'modal-mgt-toolbar-popup',
            autoOpen: true,
            buttons: []
        }).on('load', function () {
            $(this).contents().find('head').append(style);
        });

        const iframeDocument = iframe[0].contentDocument;

        content = content.replace('</head>', `${style}</head>`);

        // do not use "srcdoc" or "src" for working anchor links
        iframeDocument.open();
        iframeDocument.write(content);
        iframeDocument.close();
    }

    $('.mgt-toolbar-popup').off('click').on('click', function (e) {
        if (window.self !== window.top || $('body').hasClass('mgtdevelopertoolbar-toolbar-container')) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: $(e.currentTarget).attr('href'),
            type: 'GET',
            success: (data) => {
                openModal(data);
            }
        });

        return false;
    });
});
