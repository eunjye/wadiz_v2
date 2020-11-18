/**
 ===================================================================
 # GUIDE(working-list)
 # Created by Jaehee on 2018-01-05
 ===================================================================
 */

var nameSpace = {
    global: window,
    jQ: window.jQuery,
    GUI: {}
};

/**
 ===============================================
 # 워킹 리스트 및 html 인클루드(웹서버에서 동작)
 ===============================================
 */
!function (param) {

    var $   = param.jQ,
        GUI = param.GUI;

    // include html
    GUI = {
        includeHtml: function () {
            var includeArea = $('[data-include]'),
                target, htmlStr;

            $.each(includeArea, function () {

                target  = $(this);
                htmlStr = target.data('include');

                target.load(htmlStr, function () {

                    target.removeAttr('data-include');

                    var page   = location.pathname.split('/').pop(), // url 의 마지막 배열을 뽑음
                        $links = target.find('li a');

                    $links.each(function () {
                        var $this = $(this);
                        if ($this.attr('href') == page) {
                            $this.parent().addClass('active');
                        }
                    })

                })

            });
        }
    };

    $(function () {
        GUI.includeHtml();
    });

}(nameSpace);

/**
 ===============================================
 # 인덱스,링크 생성,진척률 등 테이블 셋팅
 ===============================================
 **/
!function (param) {

    var $      = param.jQ,
        GUI    = param.GUI,
        detect = {};

    GUI = {
        detectDom: function () {
            detect.$ths       = $('.working-list thead th');
            detect.$tblBody   = $('.working-list tbody');
            detect.$tableRows = detect.$tblBody.find('tr');
            detect.$rowList   = detect.$tblBody.find('tr:not(".linetitle")');
            detect.$lineTitle = detect.$tblBody.find('.linetitle');
            detect.$total     = $('.total');
            detect.$del       = detect.$tblBody.find('.del');
        },

        init: function () {
            this.detectDom();
            this.subTitleColspan();
            this.setupTable();
            this.makeCount();
            this.progress();
        },

        subTitleColspan: function () {
            var sizeTh = detect.$ths.length;
            detect.$lineTitle.find('td').attr('colspan', sizeTh);
        },

        setupTable: function () {
            var i = 0;
            for (; i < detect.$rowList.length; i++) {
                var rowItem = detect.$rowList[i];
                $(rowItem).prepend('<td>');

                var $columns = $(rowItem).children('td');

                $columns.each(function (idx) {
                    var $this = $(this);

                    if (idx == 1) {
                        var depthString = $this.text(),
                            lastString  = depthString.substr(depthString.lastIndexOf('>') + 1);

                        $this.html(depthString.replace(lastString, '<b style="color: #333;">' + lastString + '</b>'))
                            .addClass('tal depth')

                    }
                    else if (idx == 2) {
                        $this.addClass('tal')
                            .children('a').css({'color': '#437cbc', 'font-weight':'bold'}).attr('target','_blank');
                       /* if ($(rowItem).is('.del')) {
                            $this.html('<span class="url">' + $this.html() + '</span>');
                        }
                        else {
                            $this.html('<a href="' + $this.html() + '" target="_blank" class="url">' + '<b style="color:#437cbc;">' + $this.html() + '</b></a>');
                        }*/

                    }
                    else if (idx == 3) {
                        $this.addClass('publ');
                    }
                    else if (idx == 4) {
                        $this.addClass('date');
                    }
                    else if (idx == 5) {
                        var stateText = $this.text();
                        if (stateText.indexOf('검수요청') > -1) {
                            $this.addClass('quest');
                        }
                        else if (stateText.indexOf('검수완료') > -1) {
                            $this.closest('tr').addClass('comp');
                        }
                        else if (stateText.indexOf(' ') > -1) {
                            $this.addClass('desc');
                        } /*else {
                            $this.css('background-color', '#fff')
                        }*/
                    }
                    else if (idx == 6) {
                        $this.find('.undecided').text('미');
                        $this.find('.delete').text('삭');
                        $this.find('.edit').text('중');
                        $this.find('.complete').text('완');
                    }

                });
            }
        },

        makeCount: function () {

            detect.$lineTitle.each(function (index) {
                $(this).data('idx', index);
            });

            var count = 0;

            detect.$tableRows.each(function (idx) {
                var $this   = $(this),
                    firstTd = $this.find('td:first-child');

                // 첫번째 linetitle 은 count 가 증가하기 전이므로 - 1 하여 요소를 선택하지 않는다.
                var subTitle = detect.$lineTitle[$this.data('idx') - 1];

                if ($this.is('.linetitle')) {
                    $(subTitle).find('.sub-tit').append(' (' + count + ')');
                    count = 0;
                } else {
                    firstTd.append(count + 1);
                    count = $this.hasClass('del') ? count : count + 1;
                }

                // each 문이 모두 돌았을 때 즉, 마지막 .linetitle 찾고 마지막으로 증가한 count 를 참조
                if (idx == detect.$tableRows.length - 1) {
                    var lastSubTitle = detect.$lineTitle[detect.$lineTitle.length - 1];
                    $(lastSubTitle).find('.sub-tit').append(' (' + count + ')');
                }

            });

        },

        progress: function () {
            var $lastChideTd = detect.$rowList.find('td:last-child'),
                totalSize    = ($lastChideTd.length - detect.$del.length),
                delSize      = detect.$del.find('.delete').length,
                edit      = $lastChideTd.find('.edit').length,
                compCount    = ($lastChideTd.find('.complete').length - delSize),
                totalPercent = (compCount / totalSize) * 100;

            detect.$total.html(
                '<span class="per">종합 진척률 : '
                + ~~totalPercent
                + '%</span>'
                + '<span class="status">'
                + delSize
                + ' / '
                + edit
                + ' (삭제/진행중)</span>'
                + '<span class="status">'
                + compCount
                + ' / '
                + totalSize
                + ' (완료/총 본수)</span>'
            );

            detect.$ths.each(function (idx) {
                var $this = $(this);
                if (idx == 0) {
                    $this.append(' (' + totalSize + ')');
                }
                else if (idx == 6) {
                    $this.append(' (' + compCount + ')');
                }

            });

        },

    };

    $(function () {
        GUI.init();
    });

}(nameSpace);

/**
 ===============================================
 # 콤보박스 소팅 기능(담당자,날짜 소팅)
 ===============================================
 **/
!(function (param) {

    var $      = param.jQ,
        GUI    = param.GUI,
        detect = {};

    GUI = {
        detectDom: function () {
            detect.$workList = $('.working-list');
            detect.rowLists  = detect.$workList.find('tbody tr:not(".linetitle")');
            detect.$comboBox = detect.$workList.find('select');

        },

        init: function () {
            this.detectDom();
            $(document).on('change', detect.$comboBox, this.comboSorting);
            this.orderSorting(3, '.publ');
            this.orderSorting(4, '.date');
        },

        comboSorting: function () {

            var comboValue = [];

            detect.$comboBox.each(function () {
                var $target = $(this);
                comboValue.push($.trim($target.find('option:selected').text()));
            });

            detect.rowLists.each(function () {
                var $targetRow = $(this),
                    $publValue = $targetRow.find('.publ').text(),
                    $dateValue = $targetRow.find('.date').text();

                $targetRow.hide();

                // jQuery.inArray : 배열 내의 값을 찾아서 인덱스를 반환(요소가 없을 경우 -1을 반환)
                // 담당자 전체, date 를 만족한 경우 모든 table row 를 보여줌
                if ($.inArray('담당자 전체', comboValue) > -1 && $.inArray('작업일 선택', comboValue) > -1) {
                    $targetRow.show();
                }
                // 담당자 이름만 선택하고 date 전체인 경우
                else if ($.inArray('담당자 전체', comboValue) == -1 && $.inArray('작업일 선택', comboValue) > -1) {
                    if (comboValue[0] == $publValue) {
                        $targetRow.show();
                    }
                }
                // 담당자 전체이면서 작업 날짜를 선택한 경우
                else if ($.inArray('담당자 전체', comboValue) > -1 && $.inArray('작업일 선택', comboValue) == -1) {
                    if (comboValue[1] == $dateValue) {
                        $targetRow.show();
                    }
                }
                // 담당자 이름, 작업 날짜를 둘다 선택한 경우
                else if ($.inArray('담당자 전체', comboValue) == -1 && $.inArray('작업일 선택', comboValue) == -1) {
                    if (comboValue[0] == $publValue && comboValue[1] == $dateValue) {
                        $targetRow.show();
                    }
                }
            });

        },

        orderSorting: function (idx, elm) {
            var $comboBox = detect.$workList.find('thead th').eq(idx),
                dataStack = [],
                $items    = detect.$workList.find(elm + ':visible');

            $items.each(function () {
                var $self        = $(this),
                    $targetValue = $.trim($self.text());

                if (!!$targetValue) {
                    if ($.inArray($targetValue, dataStack) == -1) {
                        dataStack.push($.trim($targetValue));
                        // console.log(dataStack);
                    }
                }

            });

            var alignedData = dataStack.sort(compareForSort);
            
            function compareForSort(first, second) {
                if (first == second) {
                    return 0;
                }
                if (first < second) {
                    return -1;
                } else {
                    return 1;
                }
            }
            
            // 취합하여 모인 정렬된 배열을 콤보박스에 추가
            for (var i = 0, max = alignedData.length; i < max; i++) {
                $comboBox.find('select')
                    .append('<option>' + alignedData[i] + '</option>');
            }

        },

    };

    $(function () {
        GUI.init();
    });

})(nameSpace);

/**
 ===============================================
 # 리본 UI
 ===============================================
 **/
!(function (param) {
    var $   = param.jQ,
        GUI = param.GUI;

    GUI.ribbon = function () {
        var $ribbon = $('#guide #head .ribbon');
        $ribbon.on('click', function () {
            var $this   = $(this),
                cloneEl = $this.clone(true);

            $this.before(cloneEl);
            $('.' + $this.attr('class') + ':last').remove();
        });
    };

    $(function () {
        GUI.ribbon();
    });

})(nameSpace);