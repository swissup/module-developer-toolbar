(() => {
    'use strict';

    $.widget('treegrid', {
        create: function () {
            this.addFillerAndExpander(this.element.find('tbody tr:not([class*="treegrid-parent-"])'), 1);
            this._on('click tr', (e) => this.toggleRow($(e.handleObj.el)));
        },

        toggleRow: function (row, force, isNested) {
            var id = this.matchRowId(row),
                children;

            if (!id) {
                return;
            }

            children = $('.treegrid-parent-' + id, this.element);
            if (!children.length) {
                return;
            }

            this.addFillerAndExpander(
                children,
                row.find('.treegrid-indent, .treegrid-expander').length + 1
            );
            children.toggle(force);

            if (!isNested) {
                row.toggleClass('treegrid-expanded', force);
                row.find('.treegrid-expander')
                    .toggleClass('treegrid-expander-collapsed')
                    .toggleClass('treegrid-expander-expanded');
            }

            row.nextAll(`.treegrid-expanded.treegrid-parent-${id}`).each((i, tr) => {
                this.toggleRow($(tr), force, true);
            });
        },

        addFillerAndExpander: function (rows, level) {
            if (rows.first().hasClass('treegrid-processed')) {
                return;
            }

            rows.find('td:first-child').prepend(
                [...Array(level).keys()].fill('<span class="treegrid-indent"></span>').join('')
            );

            rows.addClass('treegrid-processed')
                .filter((i, tr) => {
                    return this.element.find(`.treegrid-parent-${this.matchRowId($(tr))}`).length;
                })
                .find('td:first-child').each((i, td) => {
                    $(td).find('.treegrid-indent:last-child')
                        .after('<span class="treegrid-expander treegrid-expander-collapsed"></span>')
                        .remove();
                });
        },

        matchRowId: function (row) {
            return row.get(0).className.match(/\s*treegrid-(\d+)/)?.[1];
        }
    });
})();
