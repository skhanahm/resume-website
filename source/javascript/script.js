var skillsPanel = function () {
    'use strict';
    var $mainPanel = $('#skills_container');
    var $sectionBodyContainer = $($('.section_body_container'), $mainPanel);
    var $sectionBodyContent = $($('.section_body_content'), $mainPanel);
    var $listitems = $($('.listitem'), $sectionBodyContent);
    var $leftChevron = $('.listitem_left_chevron', $mainPanel);
    var $rightChevron = $('.listitem_right_chevron', $mainPanel);
    var $skillsOption = $('#skills_filter_option', $mainPanel);
    var marginLength = 258;
    var animating = false;
    var listItemVisibleCount = $listitems.length;

    var getElementMarginLeft = function ($element) {
        var marginLeftStr = $element.css('margin-left');
        marginLeftStr = marginLeftStr.substring(0, marginLeftStr.length - 2);
        var marginLeft = parseInt(marginLeftStr);

        return marginLeft;
    };

    $mainPanel.hover(
        function () {
            var containerWidth = $sectionBodyContainer.width();
            var marginLeft = getElementMarginLeft($sectionBodyContent);

            if (canScrollLeft(marginLeft)) {
                $leftChevron.css('display', 'inline-block');
            }

            if (canScrollRight(containerWidth, $listitems.length, marginLeft, marginLength)) {
                $rightChevron.css('display', 'inline-block');
            }
        }, function () {
            $leftChevron.css('display', 'none');
            $rightChevron.css('display', 'none');
        });

    $rightChevron.click(function () {
        if (animating) {
            return;
        }

        var marginLeft = getElementMarginLeft($sectionBodyContent);
        var containerWidth = $sectionBodyContainer.width();

        var listItemCount = listItemVisibleCount;

        if (canScrollRight(containerWidth, listItemCount, marginLeft, marginLength)) {
            animating = true;

            var itemFittingCount = Math.floor(containerWidth / marginLength);

            $sectionBodyContent.animate({
                'margin-left': '-=' + itemFittingCount * marginLength + 'px'
            }, 400, function () {
                animating = false;
                marginLeft = getElementMarginLeft($sectionBodyContent);

                if (!canScrollRight(containerWidth, listItemCount, marginLeft, marginLength)) {
                    $rightChevron.css('display', 'none');
                }

                if (canScrollLeft(marginLeft)) {
                    $leftChevron.css('display', 'inline-block');
                }
            });
        }
    });

    $leftChevron.click(function () {
        if (animating) {
            return;
        }

        var marginLeft = getElementMarginLeft($sectionBodyContent);
        var listItemCount = listItemVisibleCount;
        var containerWidth = $sectionBodyContainer.width();

        if (canScrollLeft(marginLeft)) {
            animating = true;

            var itemFittingCount = Math.floor(containerWidth / marginLength);

            $sectionBodyContent.animate({
                'margin-left': '+=' + itemFittingCount * marginLength + 'px'
            }, 400, function () {
                animating = false;
                marginLeft = getElementMarginLeft($sectionBodyContent);

                if (!canScrollLeft(marginLeft)) {
                    $leftChevron.css('display', 'none');
                }

                if (canScrollRight(containerWidth, listItemCount, marginLeft, marginLength)) {
                    $rightChevron.css('display', 'inline-block');
                }
            });
        }
    });

    $skillsOption.on('change', { element: $skillsOption }, function (e) {
        var value = e.data.element.val();
        var count = 0;

        $sectionBodyContent.css('margin-left', '0px');
        $leftChevron.css('display', 'none');

        for (var i = 0; i < $listitems.length; i++) {
            if (value === 'all') {
                $($listitems[i]).css('display', 'inline-block');
                count++;
            }
            else {
                if ($($listitems[i]).data('classification') != value) {
                    $($listitems[i]).css('display', 'none');
                }
                else {
                    $($listitems[i]).css('display', 'inline-block');
                    count++;
                }
            }
        }

        listItemVisibleCount = count;
    });

    var canScrollLeft = function (leftOffset) {
        if (leftOffset < 0) {
            return true;
        }

        return false;
    };

    var canScrollRight = function (outerContainerWidth, itemCount, leftOffset, elementWidth) {
        var countsIn = -leftOffset / elementWidth;

        if ((itemCount - countsIn) * elementWidth > outerContainerWidth) {
            return true;
        }

        return false;
    };
};

var eeePanel = function () {
    'use strict';
    var $mainContainer = $('#eee_container');
    var $tabs = $($('.eee_header_tab'), $mainContainer);
    var $bodyContainer = $($('#eee_body_container_background'), $mainContainer);
    var selectedIndex = 0;

    var $contents = $($('.eee_header_content'), $mainContainer);

    var onclick = function (e) {
        $(".eee_header_tab_border", $(e.data.tabs[selectedIndex])).css('height', '0px');

        $($contents[selectedIndex]).css('display', 'none');

        $(".eee_header_tab_border", e.data.tab).animate({
            height: '4px'
        }, 200);

        selectedIndex = $(".eee_header_tab_border", $(this)).data('index');

        $($contents[selectedIndex]).css('display', 'block');
    };

    for (var i = 0; i < $tabs.length; i++) {
        $($tabs[i]).on('click', {tab: $($tabs[i])}, function (e) {
            $(".eee_header_tab_border", $($tabs[selectedIndex])).css('height', '0px');

            $($contents[selectedIndex]).css('display', 'none');

            $(".eee_header_tab_border", e.data.tab).animate({
                'height': '4px',
            }, 200);

            selectedIndex = $(".eee_header_tab_border", $(this)).data('index');

            $($contents[selectedIndex]).css('display', 'block');
        });
    }
};

var heroPanel = function () {
    'use strict';
    var $mainContainer = $('#hero_inner');
    var $images = $($('.hero_image'), $mainContainer);
    var $leftChevron = $('.hero_left_chevron', $mainContainer);
    var $rightChevron = $('.hero_right_chevron', $mainContainer);
    var selectedIndex = 0;
    var indexCount = $images.length + 1;

    $rightChevron.click(function (event) {
        event.stopPropagation();
        selectedIndex = (selectedIndex + 1) % indexCount;

        if (selectedIndex > 0) {
            $($images[selectedIndex - 1]).fadeIn(100);
        }

        if (selectedIndex === 0) {
            $($images[$images.length - 1]).fadeOut(200);
        } else if (selectedIndex > 1) {
            $($images[selectedIndex - 2]).fadeOut(200);
        }
    });

    $leftChevron.click(function (event) {
        event.stopPropagation();
        selectedIndex = (selectedIndex - 1 + indexCount) % indexCount;

        if (selectedIndex > 0) {
            $($images[selectedIndex - 1]).fadeIn(100);
        }

        if (selectedIndex < indexCount - 1) {
            $($images[selectedIndex]).fadeOut(200);
        }
    });
};

function loadImages()
{
    var $image1 = $('#hero_image_1');
    var $image2 = $('#hero_image_2');
    var $image3 = $('#hero_image_3');
    var $image4 = $('#hero_image_4');

    $image1.attr("src", "images/hero_1.png");
    $image2.attr("src", "images/hero_2.png");
    $image3.attr("src", "images/hero_3.png");
    $image4.attr("src", "images/hero_4.png");
}

$(document).ready(function () {
    loadImages();

    var mySkillsPanel = new skillsPanel();
    var myEeePanel = new eeePanel();
    var myHeroPanel = new heroPanel();
});