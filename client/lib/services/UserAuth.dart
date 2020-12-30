import 'dart:async';
import 'package:client/util/NetworkWrapper.dart';

class UserAuth {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();

    static const String LOGIN_ROUTE = 'https://api.sokka.me/user/login';
    static const String LOGOUT_ROUTE = 'https://api.sokka.me/user/logout';
    static const String SIGNUP_ROUTE = 'https://api.sokka.me/user/signup';
    static const String VALIDATE_ROUTE = 'https://api.sokka.me/user/validate';

    Future<String> loginUser(final String email, final String password) async {
        return await this._networkWrapper
            .post(
                LOGIN_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'email': email,
                    'password': password,
                }
            )
            .then((response) {
                return response['token'];
            });
    }

    Future<void> logoutUser(final String sessionToken) async {
        await this._networkWrapper
            .post(
                LOGOUT_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'token': sessionToken,
                },
            );
    }

    Future<String> signUpUser(final String email, final String password) async {
        return await this._networkWrapper
            .post(
                SIGNUP_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'email': email,
                    'password': password,
                    "tos": true,
                    "privacypolicy": true,
                },
            )
            .then((response) {
                return response['token'];
            });
    }

    Future<bool> validateSessionToken(final String sessionToken, final String email) async {
        return await this._networkWrapper
            .post(
                VALIDATE_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'token': sessionToken,
                    'email': email
                },
            )
            .then((response) {
                return response['success'];
            });
    }
}