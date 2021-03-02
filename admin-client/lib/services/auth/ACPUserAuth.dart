import 'dart:async';
import 'package:admin_client/util/NetworkWrapper.dart';
import 'package:admin_client/util/CookieStorage.dart';

class ACPUserAuth {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final CookieStorage _cookieStorage = new CookieStorage();

    static const String ACP_LOGIN_ROUTE = 'https://api.sokka.me/acp/login';
    static const String ACP_LOGOUT_ROUTE = 'https://api.sokka.me/user/logout';
    static const String VALIDATE_ROUTE = 'https://api.sokka.me/user/validate';

    Future<String> loginACPUser({ final String username, final String password} ) async {
        return await this._networkWrapper
            .post(
                ACP_LOGIN_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'name': username,
                    'password': password,
                }
            )
            .then((response) {
                return response['token'];
            });
    }

    Future<void> logoutACPUser({ final String username, final String token }) async {
        await this._networkWrapper
            .post(
                ACP_LOGOUT_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'name': username,
                    'token': token,
                    
                },
            );
    }

    Future<bool> validateACPSession({ final String username, final String token }) async {
        return await this._networkWrapper
            .post(
                VALIDATE_ROUTE,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    'name': username,
                    'token': token
                },
            )
            .then((response) {
                return response['success'];
            });
    }

    Future<bool> acpSessionIsValid() async {
        String name = await this._cookieStorage.getUsername();
        String token = await this._cookieStorage.getSessionToken();

        return await this.validateACPSession(username: name, token: token);
    }
}