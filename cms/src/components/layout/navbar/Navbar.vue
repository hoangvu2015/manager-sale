<template>
    <nav class="navbar app-navbar navbar-toggleable-md">
        <div class="navbar-brand-container d-flex align-items-center justify-content-start">
            <a class="navbar-brand" href="#">
                <i class="i-vuestic"></i>
            </a>
        </div>

        <div class="row navbar-container">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col">
                <a class="menu-icon i-menu-expanded" href="#" @click.prevent="toggleSidebar(false)" v-if="sidebarOpened"></a>
                <a class="menu-icon i-menu-collapsed" href="#" @click.prevent="toggleSidebar(true)" v-else></a>
            </div>

            <div class="offset-lg-8"></div>
            <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
                <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="toggleDropdown">
          <span class="avatar-container default_avatar">

          </span>
                </a>
                <div class="dropdown-menu last">
                    <div class="dropdown-menu-content">
                        <div class="dropdown-item plain-link-item">
                            <a class="plain-link" href="#" @click.prevent="profile">My Profile</a>
                        </div>
                        <div class="dropdown-item plain-link-item">
                            <a class="plain-link" @click="logout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import Dropdown from 'directives/Dropdown'
    import avatar from  'assets/icons/default_avatar.png';
    import UserService from 'services/auth';

    export default {
        name: 'navbar',

        directives: {
            dropdown: Dropdown
        },

        computed: {
            ...mapGetters([
                'sidebarOpened',
                'toggleWithoutAnimation',
                'authUser'
            ])
        },
        methods: {
            ...mapActions([
                'toggleSidebar',
                'toggleDropdown',
                'isToggleWithoutAnimation'
            ]),
            logout() {
                UserService
                    .logout()
                    .then(resp => {
                        this.$cookie.delete(tokenKey)
                        this.$router.push('/auth/login');
                    })
            },
            profile() {
                this.$router.push('/user/' + this.authUser._id);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../sass/_variables.scss";
    @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
    @import "../../../../node_modules/bootstrap/scss/variables";

    .navbar.app-navbar {
        .navbar-container {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        height: $top-nav-height;
        padding-left: $nav-padding-left;
        padding-right: $nav-padding-right;
        background-color: $top-nav-bg;

        .avatar-container {
            display: inline-block;
            width: 50px;
            height: 50px;
            background-color: white;
            border-radius: 50%;
            border: 2px solid $lighter-gray;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .menu-icon-container {
            padding: 0;
            font-size: $font-size-base;
        }

        .navbar-brand-container {
            position: absolute;
            z-index: 3;
            height: 100%;
            left: $navbar-brand-container-left;
            top: 0;
        }

        .nav-item {
            padding: 0;
            height: 100%;
        }

        .dropdown.navbar-dropdown {
            .dropdown-toggle {
                padding: 0;
                &:after {
                    display: none;
                }
            }

            &.show {
                @include media-breakpoint-up(lg) {
                    .dropdown-menu {
                        left: auto;
                        right: 0;
                    }
                }
                &:after {
                    position: absolute;
                    bottom: -$dropdown-show-b;
                    right: calc(50% - 10px);
                    width: 0;
                    height: 0;
                    display: block;
                    content: '';
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid $darkest-gray;
                }
            }

            .dropdown-menu {
                margin-top: $dropdown-show-b;
                padding-top: 0;
                width: 100%;
            }

            .dropdown-item {
                height: $navbar-dd-item-height;
                cursor: pointer;
                font-size: $font-size-base;

                &:hover, &:active, &:focus, &.active {
                    outline: none;
                }

                &.plain-link-item {
                    color: $brand-primary;

                    &:hover, &:active, &:focus {
                        background: $dropdown-background;
                    }

                    .plain-link {
                        text-decoration: none;
                    }
                }
            }
        }

        .notify {
            position: relative;

            &::after {
                content: '';
                position: absolute;
                right: -6px;
                top: -6px;
                background-color: $brand-primary;
                height: 12px;
                width: 12px;
                border-radius: 50%;
            }
        }

        .i-nav-notification.notify::after {
            right: -4px;
            top: 0;
        }

        @include media-breakpoint-down(md) {
            height: $top-mobile-nav-height;
            padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb $nav-mobile-padding-h;

            .navbar-brand-container {
                width: $nav-mobile-brand-width;
                top: $nav-mobile-brand-top;
                left: $nav-mobile-brand-left;
                height: auto;
                .navbar-brand {
                    height: $font-size-smaller;
                    padding: 0;
                    font-size: $font-size-smaller;
                }
            }

            .dropdown.navbar-dropdown {
                &.show {
                    display: flex;
                    &:after {
                        bottom: -$dropdown-mobile-show-b;
                        z-index: 2;
                    }
                    .dropdown-menu {
                        margin-top: $dropdown-mobile-show-b;
                        left: auto;
                        &.last {
                            right: 0;
                        }
                    }
                }
            }
        }
    }
</style>
