import 'dart:async';
import 'package:client/util/network_wrapper.dart';
import 'package:client/util/session_token_storage.dart';

class APIDataSource {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final SessionTokenStorage _sessionTokenStorage = new SessionTokenStorage();

    static const String LOGIN_ROUTE = "https://api.sokka.me/user/login";
    static const String LOGOUT_ROUTE = "https://api.sokka.me/user/logout";
    static const String VALIDATE_ROUTE = "https://api.sokka.me/user/validate";

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