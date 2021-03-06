class Navigation {
    
    constructor() {
        let nav = this;

        nav.$modMenu = $("#mod-menu");

        nav.bzDesktopMenu();
        nav.bzPullMenu();
    }

    bzPullMenu() {
        let nav = this;

        let openClass = 'is-open';
        let closeClass = 'is-close';

        nav.$modMenuMb = $('#mod-menu-mob');

        nav.$modMenuMb.find(".pull-menu").on('click', function(event) {
            event.preventDefault();
            if ($(this).hasClass(openClass)) {
                close();
            } else {
                open();
            }
        });

        function open() {
            nav.$modMenuMb.find(".pull-menu").removeClass(closeClass).addClass(openClass);
            nav.$modMenu.find(".menu-desk").removeClass(closeClass).addClass(openClass);
        }

        function close() {
            nav.$modMenuMb.find(".pull-menu").removeClass(openClass).addClass(closeClass);
            nav.$modMenu.find(".menu-desk").removeClass(openClass).addClass(closeClass);
        }
    }

    bzDesktopMenu() {
        let nav = this;

        let li = nav.$modMenu.find('li'),
            menuDesk = nav.$modMenu.find('.menu-desk'),
            fadeSpeedEffect = 100,
            subMegaClass = 'mega',
            subListClass = 'list',
            hasSubClass = 'has-sub',
            hoverClass = 'hover',
            activeClass = 'active',
            subCurrent = '';

        li.on('mouseenter', function() {
            $(this).addClass(hoverClass).find('>ul,>div').stop().fadeIn(fadeSpeedEffect);
        }).on('mouseleave', function() {
            $(this).removeClass(hoverClass).find('>ul,>div').stop().fadeOut(fadeSpeedEffect);
        });

        function showArrow() {
            li.has('ul,div').addClass(hasSubClass).find('>a').append('<i>&nbsp</i>');
        }

        function autoActive() {
            let liActive = li.filter('.' + activeClass);
            liActive.parents('li').addClass(activeClass);
        }
    }
    
}

let navigation = new Navigation();
export default navigation;
window.Navigation = navigation;