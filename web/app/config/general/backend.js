'use strict';

/*Chứa những config chung của dev thường xuyên thay đổi mỗi dự án*/

module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || '427079307489462',
        clientSecret: process.env.FACEBOOK_SECRET || 'd78875d70774594c0b93d646c07cb6ab',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'yXwFK6ff3fOc8dvessqKvd9Z8',
        clientSecret: process.env.TWITTER_SECRET || 'k0w9heOObYwlwchdRBQ6tmHiPQN5O26nwz5XDzxPWPtby6llNx',
        callbackURL: '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || '941481178075-mrmusgvq3asuq1relija3smn7psmogkh.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'sSIpuxYkac8r8LgXtVJ9pM6W',
        callbackURL: '/auth/google/callback'
    },
    awsService: {
        sendMail: 'https://gmqsadiyrc.execute-api.ap-southeast-1.amazonaws.com/development/utils/sendmail',
        upload: '',
        resize: '',
        crop: ''
    },
    context: {
        cmsprefix: '/admin',
        settings: {
            services: {
                webUrl: 'http://localhost:9006',
                adminUrl: 'http://localhost:9002',
                apiUrl: 'http://localhost:9001/v1/api',
                uploadApi: 'http://localhost:9001/v1',
            }
        }
    },
    adminassets: {
        css: [
            'adminassets/admin-lte/bootstrap/css/bootstrap.min.css',
            'adminassets/font-awesome/css/font-awesome.min.css',
            'adminassets/ionicons/dist/css/ionicons.min.css',
            'adminassets/admin-lte/plugins/datatables/dataTables.bootstrap.css',
            'adminassets/admin-lte/dist/css/skins/skin-blue.min.css',
            'adminassets/admin-lte/plugins/select2/select2.min.css',
            'adminassets/admin-lte/dist/css/AdminLTE.min.css',
            'adminassets/angular-dialog-service/dist/dialogs.min.css',
            'adminassets/jsoneditor/dist/jsoneditor.min.css',
            'adminassets/angular-toastr/dist/angular-toastr.min.css',
            'adminassets/cropper/dist/cropper.css',
            'adminassets/ui-select/dist/select.css',
            'adminassets/daterangepicker/daterangepicker.css',
            'app/templates/admin/html/admin-*/client/style/*.css',
        ],
        js: [
            'adminassets/lodash/lodash.js',
            'adminassets/tether/dist/js/tether.min.js',
            'adminassets/tinymce/tinymce.js',
            'adminassets/jquery/dist/jquery.min.js',
            'adminassets/popper.js/dist/umd/popper.js',
            'adminassets/bootstrap/dist/js/bootstrap.min.js',
            'adminassets/admin-lte/dist/js/app.min.js',
            'adminassets/angular/angular.js',
            'adminassets/angular-resource/angular-resource.js',
            'adminassets/angular-animate/angular-animate.js',
            'adminassets/@uirouter/angularjs/release/angular-ui-router.js',
            'adminassets/@uirouter/angularjs/release/stateEvents.js',
            'adminassets/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'adminassets/angular-file-upload/dist/angular-file-upload.min.js',
            'adminassets/angular-sanitize/angular-sanitize.min.js',
            'adminassets/ui-select/dist/select.js',
            'adminassets/tinymce/tinymce.min.js',
            'adminassets/angular-ui-tinymce/dist/tinymce.min.js',
            'adminassets/admin-lte/plugins/select2/select2.min.js',
            'adminassets/angular-messages/angular-messages.min.js',
            'adminassets/angular-input-masks/releases/angular-input-masks-standalone.min.js',
            'adminassets/angular-local-storage/dist/angular-local-storage.js',
            'adminassets/angular-dialog-service/dist/dialogs.min.js',
            'adminassets/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
            'adminassets/moment/moment.js',
            'adminassets/moment/locale/vi.js',
            'adminassets/daterangepicker/daterangepicker.js',
            'adminassets/cropper/dist/cropper.js',
            'adminassets/jsoneditor/dist/jsoneditor.min.js',
            'adminassets/ng-jsoneditor/ng-jsoneditor.js',
            'adminassets/angular-file-upload-shim/dist/angular-file-upload-shim.min.js',
            'adminassets/ng-file-upload/dist/ng-file-upload.min.js',
            'adminassets/angular-toastr/dist/angular-toastr.min.js',
            'app/templates/admin/html/admin-core/client/js/app.js',
            'app/templates/admin/html/admin-core/client/js/config.js',
            'app/templates/admin/html/admin-core/client/js/service.js',
            'app/templates/admin/html/admin-*/client/js/*.js',
        ]
    }
}