<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'google' => [
        'client_id' => '708003345564-alr7ub5l7mibaj251unfko86n9o0pitk.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect' => 'http://127.0.0.1:5173/auth/google',
    ],

    'flutterwave' => [
        'key' => 'FLWPUBK_TEST-8cad7a5e065dea34fc34687d2e04f585-X',
        'secret' => 'FLWSECK_TEST-23d0c4ff52455968094e5e2214ebb392-X',
        'environment' => 'FLWSECK_TEST050630a918d1',
    ],

];
