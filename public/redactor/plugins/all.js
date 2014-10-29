/* File: clips.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.clips = function() {
    return {
        init: function() {
            var items = [
                ['Lorem ipsum...', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
                ['Red label', '<span class="label-red">Label</span>']
            ];

            this.clips.template = $('<ul id="redactor-modal-list">');

            for (var i = 0; i < items.length; i++) {
                var li = $('<li>');
                var a = $('<a href="#" class="redactor-clip-link">').text(items[i][0]);
                var div = $('<div class="redactor-clip">').hide().html(items[i][1]);

                li.append(a);
                li.append(div);
                this.clips.template.append(li);
            }

            this.modal.addTemplate('clips', '<section>' + this.utils.getOuterHtml(this.clips.template) + '</section>');

            var button = this.button.add('clips', 'Clips');
            this.button.addCallback(button, this.clips.show);

        },
        show: function() {
            this.modal.load('clips', 'Insert Clips', 400);

            this.modal.createCancelButton();

            $('#redactor-modal-list').find('.redactor-clip-link').each($.proxy(this.clips.load, this));

            this.selection.save();
            this.modal.show();
        },
        load: function(i, s) {
            $(s).on('click', $.proxy(function(e) {
                e.preventDefault();
                this.clips.insert($(s).next().html());

            }, this));
        },
        insert: function(html) {
            this.selection.restore();
            this.insert.html(html);
            this.modal.close();
            this.observe.load();
        }
    };
};


/* File: counter.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.counter = function() {
    return {
        init: function() {
            if (!this.opts.counterCallback) return;

            this.$editor.on('keyup.redactor-limiter', $.proxy(function(e) {
                var words = 0,
                    characters = 0,
                    spaces = 0;
                var text = this.$editor.text();

                if (text !== '') {
                    var arrWords = text.split(' ');
                    var arrSpaces = text.match(/\s/g);

                    if (arrWords) words = arrWords.length;
                    if (arrSpaces) spaces = arrSpaces.length;

                    characters = text.length;

                }

                this.core.setCallback('counter', {
                    words: words,
                    characters: characters,
                    spaces: spaces
                });


            }, this));
        }
    };
};
/* File: definedlinks.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.definedlinks = function() {
    return {
        init: function() {
            if (!this.opts.definedLinks) return;

            this.modal.addCallback('link', $.proxy(this.definedlinks.load, this));

        },
        load: function() {
            var $select = $('<select id="redactor-defined-links" />');
            $('#redactor-modal-link-insert').prepend($select);

            this.definedlinks.storage = {};

            $.getJSON(this.opts.definedLinks, $.proxy(function(data) {
                $.each(data, $.proxy(function(key, val) {
                    this.definedlinks.storage[key] = val;
                    $select.append($('<option>').val(key).html(val.name));

                }, this));

                $select.on('change', $.proxy(this.definedlinks.select, this));

            }, this));

        },
        select: function(e) {
            var key = $(e.target).val();
            var name = '',
                url = '';
            if (key !== 0) {
                name = this.definedlinks.storage[key].name;
                url = this.definedlinks.storage[key].url;
            }

            $('#redactor-link-url').val(url);

            var $el = $('#redactor-link-url-text');
            if ($el.val() === '') $el.val(name);
        }
    };
};
/* File: filemanager.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.filemanager = function() {
    return {
        init: function() {
            if (!this.opts.fileManagerJson) return;

            this.modal.addCallback('file', this.filemanager.load);
        },
        load: function() {
            var $modal = this.modal.getModal();

            this.modal.createTabber($modal);
            this.modal.addTab(1, 'Upload', 'active');
            this.modal.addTab(2, 'Choose');

            $('#redactor-modal-file-upload-box').addClass('redactor-tab redactor-tab1');

            var $box = $('<div id="redactor-file-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').hide();
            $modal.append($box);


            $.ajax({
                dataType: "json",
                cache: false,
                url: this.opts.fileManagerJson,
                success: $.proxy(function(data) {
                    var ul = $('<ul id="redactor-modal-list">');
                    $.each(data, $.proxy(function(key, val) {
                        var a = $('<a href="#" title="' + val.title + '" rel="' + val.link + '">' + val.title + ' <span style="font-size: 11px; color: #888;">' + val.name + '</span> <span style="position: absolute; right: 10px; font-size: 11px; color: #888;">(' + val.size + ')</span></a>');
                        var li = $('<li />');

                        a.on('click', $.proxy(this.filemanager.insert, this));

                        li.append(a);
                        ul.append(li);

                    }, this));

                    $('#redactor-file-manager-box').append(ul);


                }, this)
            });

        },
        insert: function(e) {
            e.preventDefault();

            this.file.insert('<a href="' + $(e.target).attr('rel') + '">' + $(e.target).attr('title') + '</a>');
        }
    };
};
/* File: fontcolor.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fontcolor = function() {
    return {
        init: function() {
            var colors = [
                '#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00',
                '#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca',
                '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694',
                '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314',
                '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100',
                '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b', '#974806', '#7f6000'
            ];

            var buttons = ['fontcolor', 'backcolor'];

            for (var i = 0; i < 2; i++) {
                var name = buttons[i];

                var button = this.button.add(name, this.lang.get(name));
                var $dropdown = this.button.addDropdown(button);

                $dropdown.width(242);
                this.fontcolor.buildPicker($dropdown, name, colors);

            }
        },
        buildPicker: function($dropdown, name, colors) {
            var rule = (name == 'backcolor') ? 'background-color' : 'color';

            var len = colors.length;
            var self = this;
            var func = function(e) {
                e.preventDefault();
                self.fontcolor.set($(this).data('rule'), $(this).attr('rel'));
            };

            for (var z = 0; z < len; z++) {
                var color = colors[z];

                var $swatch = $('<a rel="' + color + '" data-rule="' + rule + '" href="#" style="float: left; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');
                $swatch.css('background-color', color);
                $swatch.on('click', func);

                $dropdown.append($swatch);
            }

            var $elNone = $('<a href="#" style="display: block; clear: both; padding: 5px; font-size: 12px; line-height: 1;"></a>').html(this.lang.get('none'));
            $elNone.on('click', $.proxy(function(e) {
                e.preventDefault();
                this.fontcolor.remove(rule);

            }, this));

            $dropdown.append($elNone);
        },
        set: function(rule, type) {
            this.inline.format('span', 'style', rule + ': ' + type + ';');
        },
        remove: function(rule) {
            this.inline.removeStyleRule(rule);
        }
    };
};
/* File: fontfamily.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fontfamily = function() {
    return {
        init: function() {
            var fonts = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Monospace'];
            var that = this;
            var dropdown = {};

            $.each(fonts, function(i, s) {
                dropdown['s' + i] = {
                    title: s,
                    func: function() {
                        that.fontfamily.set(s);
                    }
                };
            });

            dropdown.remove = {
                title: 'Remove Font Family',
                func: that.fontfamily.reset
            };

            var button = this.button.add('fontfamily', 'Change Font Family');
            this.button.addDropdown(button, dropdown);

        },
        set: function(value) {
            this.inline.format('span', 'style', 'font-family:' + value + ';');
        },
        reset: function() {
            this.inline.removeStyleRule('font-family');
        }
    };
};
/* File: fontsize.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fontsize = function() {
    return {
        init: function() {
            var fonts = [10, 11, 12, 14, 16, 18, 20, 24, 28, 30];
            var that = this;
            var dropdown = {};

            $.each(fonts, function(i, s) {
                dropdown['s' + i] = {
                    title: s + 'px',
                    func: function() {
                        that.fontsize.set(s);
                    }
                };
            });

            dropdown.remove = {
                title: 'Remove Font Size',
                func: that.fontsize.reset
            };

            var button = this.button.add('fontsize', 'Change Font Size');
            this.button.addDropdown(button, dropdown);
        },
        set: function(size) {
            this.inline.format('span', 'style', 'font-size: ' + size + 'px;');
        },
        reset: function() {
            this.inline.removeStyleRule('font-size');
        }
    };
};
/* File: fullscreen.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fullscreen = function() {
    return {
        init: function() {
            this.fullscreen.isOpen = false;

            var button = this.button.add('fullscreen', 'Fullscreen');
            this.button.addCallback(button, this.fullscreen.toggle);

            if (this.opts.fullscreen) this.fullscreen.toggle();
        },
        enable: function() {
            this.button.changeIcon('fullscreen', 'normalscreen');
            this.button.setActive('fullscreen');
            this.fullscreen.isOpen = true;

            if (this.opts.toolbarExternal) {
                this.fullscreen.toolcss = {};
                this.fullscreen.boxcss = {};
                this.fullscreen.toolcss.width = this.$toolbar.css('width');
                this.fullscreen.toolcss.top = this.$toolbar.css('top');
                this.fullscreen.toolcss.position = this.$toolbar.css('position');
                this.fullscreen.boxcss.top = this.$box.css('top');
            }

            this.fullscreen.height = this.$editor.height();

            if (this.opts.maxHeight) this.$editor.css('max-height', '');
            if (this.opts.minHeight) this.$editor.css('min-height', '');

            if (!this.$fullscreenPlaceholder) this.$fullscreenPlaceholder = $('<div/>');
            this.$fullscreenPlaceholder.insertAfter(this.$box);

            this.$box.appendTo(document.body);

            this.$box.addClass('redactor-box-fullscreen');
            $('body, html').css('overflow', 'hidden');

            this.fullscreen.resize();
            $(window).on('resize.redactor.fullscreen', $.proxy(this.fullscreen.resize, this));
            $(document).scrollTop(0, 0);

            this.$editor.focus();
            this.observe.load();
        },
        disable: function() {
            this.button.removeIcon('fullscreen', 'normalscreen');
            this.button.setInactive('fullscreen');
            this.fullscreen.isOpen = false;

            $(window).off('resize.redactor.fullscreen');
            $('body, html').css('overflow', '');

            this.$box.insertBefore(this.$fullscreenPlaceholder);
            this.$fullscreenPlaceholder.remove();

            this.$box.removeClass('redactor-box-fullscreen').css({
                width: 'auto',
                height: 'auto'
            });

            this.code.sync();

            if (this.opts.toolbarExternal) {
                this.$box.css('top', this.fullscreen.boxcss.top);
                this.$toolbar.css({
                    'width': this.fullscreen.toolcss.width,
                    'top': this.fullscreen.toolcss.top,
                    'position': this.fullscreen.toolcss.position
                });
            }

            if (this.opts.minHeight) this.$editor.css('minHeight', this.opts.minHeight);
            if (this.opts.maxHeight) this.$editor.css('maxHeight', this.opts.maxHeight);

            this.$editor.css('height', 'auto');
            this.$editor.focus();
            this.observe.load();
        },
        toggle: function() {
            if (this.fullscreen.isOpen) {
                this.fullscreen.disable();
            } else {
                this.fullscreen.enable();
            }
        },
        resize: function() {
            if (!this.fullscreen.isOpen) return;

            var toolbarHeight = this.$toolbar.height();

            var height = $(window).height() - toolbarHeight;
            this.$box.width($(window).width() - 2).height(height + toolbarHeight);

            if (this.opts.toolbarExternal) {
                this.$toolbar.css({
                    'top': '0px',
                    'position': 'absolute',
                    'width': '100%'
                });

                this.$box.css('top', toolbarHeight + 'px');
            }

            this.$editor.height(height - 14);
        }
    };
};
/* File: imagemanager.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.imagemanager = function() {
    return {
        init: function() {
            if (!this.opts.imageManagerJson) return;

            this.modal.addCallback('image', this.imagemanager.load);
        },
        load: function() {
            var $modal = this.modal.getModal();

            this.modal.createTabber($modal);
            this.modal.addTab(1, 'Upload', 'active');
            this.modal.addTab(2, 'Choose');

            $('#redactor-modal-image-droparea').addClass('redactor-tab redactor-tab1');

            var $box = $('<div id="redactor-image-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').hide();
            $modal.append($box);

            $.ajax({
                dataType: "json",
                cache: false,
                url: this.opts.imageManagerJson,
                success: $.proxy(function(data) {
                    $.each(data, $.proxy(function(key, val) {
                        // title
                        var thumbtitle = '';
                        if (typeof val.title !== 'undefined') thumbtitle = val.title;

                        var img = $('<img src="' + val.thumb + '" rel="' + val.image + '" title="' + thumbtitle + '" style="width: 100px; height: 75px; cursor: pointer;" />');
                        $('#redactor-image-manager-box').append(img);
                        $(img).click($.proxy(this.imagemanager.insert, this));

                    }, this));


                }, this)
            });


        },
        insert: function(e) {
            this.image.insert('<img src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '">');
        }
    };
};
/* File: limiter.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.limiter = function() {
    return {
        init: function() {
            if (!this.opts.limiter) return;

            this.$editor.on('keydown.redactor-limiter', $.proxy(function(e) {
                var key = e.which;
                var ctrl = e.ctrlKey || e.metaKey;

                if (key == this.keyCode.BACKSPACE || key == this.keyCode.DELETE || key == this.keyCode.ESC || key == this.keyCode.SHIFT || (ctrl && key == 65) || (ctrl && key == 82) || (ctrl && key == 116)) {
                    return;
                }

                var count = this.$editor.text().length;
                if (count >= this.opts.limiter) {
                    return false;
                }


            }, this));

        }
    };
};
/* File: table.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.table = function() {
    return {
        getTemplate: function() {
            return String() + '<section id="redactor-modal-table-insert">' + '<label>' + this.lang.get('rows') + '</label>' + '<input type="text" size="5" value="2" id="redactor-table-rows" />' + '<label>' + this.lang.get('columns') + '</label>' + '<input type="text" size="5" value="3" id="redactor-table-columns" />' + '</section>';
        },
        init: function() {

            var dropdown = {};

            dropdown.insert_table = {
                title: this.lang.get('insert_table'),
                func: this.table.show
            };
            dropdown.insert_row_above = {
                title: this.lang.get('insert_row_above'),
                func: this.table.addRowAbove
            };
            dropdown.insert_row_below = {
                title: this.lang.get('insert_row_below'),
                func: this.table.addRowBelow
            };
            dropdown.insert_column_left = {
                title: this.lang.get('insert_column_left'),
                func: this.table.addColumnLeft
            };
            dropdown.insert_column_right = {
                title: this.lang.get('insert_column_right'),
                func: this.table.addColumnRight
            };
            dropdown.add_head = {
                title: this.lang.get('add_head'),
                func: this.table.addHead
            };
            dropdown.delete_head = {
                title: this.lang.get('delete_head'),
                func: this.table.deleteHead
            };
            dropdown.delete_column = {
                title: this.lang.get('delete_column'),
                func: this.table.deleteColumn
            };
            dropdown.delete_row = {
                title: this.lang.get('delete_row'),
                func: this.table.deleteRow
            };
            dropdown.delete_table = {
                title: this.lang.get('delete_table'),
                func: this.table.deleteTable
            };

            this.observe.addButton('td', 'table');
            this.observe.addButton('th', 'table');

            var button = this.button.addBefore('link', 'table', this.lang.get('table'));
            this.button.addDropdown(button, dropdown);
        },
        show: function() {
            this.modal.addTemplate('table', this.table.getTemplate());

            this.modal.load('table', this.lang.get('insert_table'), 300);
            this.modal.createCancelButton();

            var button = this.modal.createActionButton(this.lang.get('insert'));
            button.on('click', this.table.insert);

            this.selection.save();
            this.modal.show();

            $('#redactor-table-rows').focus();

        },
        insert: function() {

            var rows = $('#redactor-table-rows').val(),
                columns = $('#redactor-table-columns').val(),
                $tableBox = $('<div>'),
                tableId = Math.floor(Math.random() * 99999),
                $table = $('<table id="table' + tableId + '"><tbody></tbody></table>'),
                i, $row, z, $column;

            for (i = 0; i < rows; i++) {
                $row = $('<tr>');

                for (z = 0; z < columns; z++) {
                    $column = $('<td>' + this.opts.invisibleSpace + '</td>');

                    // set the focus to the first td
                    if (i === 0 && z === 0) {
                        $column.append(this.selection.getMarker());
                    }

                    $($row).append($column);
                }

                $table.append($row);
            }

            $tableBox.append($table);
            var html = $tableBox.html();


            this.modal.close();
            this.selection.restore();

            if (this.table.getTable()) return;

            this.buffer.set();

            var current = this.selection.getBlock() || this.selection.getCurrent();
            if (current && current.tagName != 'BODY') {
                if (current.tagName == 'LI') current = $(current).closest('ul, ol');
                $(current).after(html);
            } else {
                this.insert.html(html);
            }

            this.selection.restore();

            var table = this.$editor.find('#table' + tableId);

            if (!this.opts.linebreaks && (this.utils.browser('mozilla') || this.utils.browser('msie'))) {
                var $next = table.next();
                if ($next.length === 0) {
                    table.after(this.opts.emptyHtml);
                }
            }

            this.observe.buttons();

            table.find('span.redactor-selection-marker').remove();
            table.removeAttr('id');

            this.code.sync();
            this.core.setCallback('insertedTable', table);
        },
        getTable: function() {
            var $table = $(this.selection.getParent()).closest('table');

            if (!this.utils.isRedactorParent($table)) return false;
            if ($table.size() === 0) return false;

            return $table;
        },
        restoreAfterDelete: function($table) {
            this.selection.restore();
            $table.find('span.redactor-selection-marker').remove();
            this.code.sync();
        },
        deleteTable: function() {
            var $table = this.table.getTable();
            if (!$table) return;

            this.buffer.set();


            var $next = $table.next();
            if (!this.opts.linebreaks && $next.length !== 0) {
                this.caret.setStart($next);
            } else {
                this.caret.setAfter($table);
            }


            $table.remove();

            this.code.sync();
        },
        deleteRow: function() {
            var $table = this.table.getTable();
            if (!$table) return;

            var $current = $(this.selection.getCurrent());

            this.buffer.set();

            var $current_tr = $current.closest('tr');
            var $focus_tr = $current_tr.prev().length ? $current_tr.prev() : $current_tr.next();
            if ($focus_tr.length) {
                var $focus_td = $focus_tr.children('td, th').first();
                if ($focus_td.length) $focus_td.prepend(this.selection.getMarker());
            }

            $current_tr.remove();
            this.table.restoreAfterDelete($table);
        },
        deleteColumn: function() {
            var $table = this.table.getTable();
            if (!$table) return;

            this.buffer.set();

            var $current = $(this.selection.getCurrent());
            var $current_td = $current.closest('td, th');
            var index = $current_td[0].cellIndex;

            $table.find('tr').each($.proxy(function(i, elem) {
                var $elem = $(elem);
                var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
                if (i === 0) $elem.find('td, th').eq(focusIndex).prepend(this.selection.getMarker());

                $elem.find('td, th').eq(index).remove();

            }, this));

            this.table.restoreAfterDelete($table);
        },
        addHead: function() {
            var $table = this.table.getTable();
            if (!$table) return;

            this.buffer.set();

            if ($table.find('thead').size() !== 0) {
                this.table.deleteHead();
                return;
            }

            var tr = $table.find('tr').first().clone();
            tr.find('td').html(this.opts.invisibleSpace);
            $thead = $('<thead></thead>').append(tr);
            $table.prepend($thead);

            this.code.sync();

        },
        deleteHead: function() {
            var $table = this.table.getTable();
            if (!$table) return;

            var $thead = $table.find('thead');
            if ($thead.size() === 0) return;

            this.buffer.set();

            $thead.remove();
            this.code.sync();
        },
        addRowAbove: function() {
            this.table.addRow('before');
        },
        addRowBelow: function() {
            this.table.addRow('after');
        },
        addColumnLeft: function() {
            this.table.addColumn('before');
        },
        addColumnRight: function() {
            this.table.addColumn('after');
        },
        addRow: function(type) {
            var $table = this.table.getTable();
            if (!$table) return;

            this.buffer.set();

            var $current = $(this.selection.getCurrent());
            var $current_tr = $current.closest('tr');
            var new_tr = $current_tr.clone();

            new_tr.find('th').replaceWith(function() {
                var $td = $('<td>');
                $td[0].attributes = this.attributes;

                return $td.append($(this).contents());
            });

            new_tr.find('td').html(this.opts.invisibleSpace);

            if (type == 'after') {
                $current_tr.after(new_tr);
            } else {
                $current_tr.before(new_tr);
            }

            this.code.sync();
        },
        addColumn: function(type) {
            var $table = this.table.getTable();
            if (!$table) return;

            var index = 0;
            var current = $(this.selection.getCurrent());

            this.buffer.set();

            var $current_tr = current.closest('tr');
            var $current_td = current.closest('td, th');

            $current_tr.find('td, th').each($.proxy(function(i, elem) {
                if ($(elem)[0] === $current_td[0]) index = i;

            }, this));

            $table.find('tr').each($.proxy(function(i, elem) {
                var $current = $(elem).find('td, th').eq(index);

                var td = $current.clone();
                td.html(this.opts.invisibleSpace);

                if (type == 'after') {
                    $current.after(td);
                } else {
                    $current.before(td);
                }

            }, this));

            this.code.sync();
        }
    };
};
/* File: textdirection.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.textdirection = function() {
    return {
        init: function() {
            var that = this;
            var dropdown = {};

            dropdown.ltr = {
                title: 'Left to Right',
                func: that.textdirection.setLtr
            };
            dropdown.rtl = {
                title: 'Right to Left',
                func: that.textdirection.setRtl
            };

            var button = this.button.add('textdirection', 'Change Text Direction');
            this.button.addDropdown(button, dropdown);
        },
        setRtl: function() {
            this.buffer.set();
            this.block.setAttr('dir', 'rtl');
        },
        setLtr: function() {
            this.buffer.set();
            this.block.removeAttr('dir');
        }
    };
};
/* File: textexpander.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.textexpander = function() {
    return {
        init: function() {
            if (!this.opts.textexpander) return;

            this.$editor.on('keyup.redactor-limiter', $.proxy(function(e) {
                var key = e.which;
                if (key == this.keyCode.SPACE) {
                    var current = this.selection.getCurrent();
                    var cloned = $(current).clone();

                    var $div = $('<div>');
                    $div.html(cloned);

                    var text = $div.html();
                    $div.remove();

                    var len = this.opts.textexpander.length;
                    var replaced = 0;

                    for (var i = 0; i < len; i++) {
                        var re = new RegExp(this.opts.textexpander[i][0]);
                        if (text.search(re) != -1) {
                            replaced++;
                            text = text.replace(re, this.opts.textexpander[i][1]);

                            $div = $('<div>');
                            $div.html(text);
                            $div.append(this.selection.getMarker());

                            var html = $div.html().replace(/&nbsp;/, '');

                            $(current).replaceWith(html);
                            $div.remove();
                        }
                    }

                    if (replaced !== 0) {
                        this.selection.restore();
                    }
                }


            }, this));

        }
    };
};
/* File: video.js */
if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.video = function() {
    return {
        reUrlYoutube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
        reUrlVimeo: /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
        getTemplate: function() {
            return String() + '<section id="redactor-modal-video-insert">' + '<label>' + this.lang.get('video_html_code') + '</label>' + '<textarea id="redactor-insert-video-area" style="height: 160px;"></textarea>' + '</section>';
        },
        init: function() {
            var button = this.button.addAfter('image', 'video', this.lang.get('video'));
            this.button.addCallback(button, this.video.show);
        },
        show: function() {
            this.modal.addTemplate('video', this.video.getTemplate());

            this.modal.load('video', this.lang.get('video'), 700);
            this.modal.createCancelButton();

            var button = this.modal.createActionButton(this.lang.get('insert'));
            button.on('click', this.video.insert);

            this.selection.save();
            this.modal.show();

            $('#redactor-insert-video-area').focus();

        },
        insert: function() {
            var data = $('#redactor-insert-video-area').val();
            data = this.clean.stripTags(data);

            // parse if it is link on youtube & vimeo
            var iframeStart = '<iframe style="width: 500px; height: 281px;" src="',
                iframeEnd = '" frameborder="0" allowfullscreen></iframe>';

            if (data.match(this.video.reUrlYoutube)) {
                data = data.replace(this.video.reUrlYoutube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
            } else if (data.match(this.video.reUrlVimeo)) {
                data = data.replace(this.video.reUrlVimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
            }

            this.selection.restore();
            this.modal.close();

            var current = this.selection.getBlock() || this.selection.getCurrent();

            if (current) $(current).after(data);
            else {
                this.insert.html(data);
            }

            this.code.sync();
        }

    };
};