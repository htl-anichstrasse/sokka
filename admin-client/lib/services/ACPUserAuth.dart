import 'dart:async';
import 'package:client/util/CookieStorage.dart';
import 'package:client/util/NetworkWrapper.dart';

class ACPUserAuth {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final CookieStorage _cookieStorage = new CookieStorage();

    static const String ACP_LOGIN_ROUTE = 'https://api.sokka.me/acp/login';
    static const String ACP_LOGOUT_ROUTE = 'https://api.sokka.me/acp/logout';
    static const String ACP_VALIDATE_ROUTE = 'https://api.sokka.me/acp/validate';

    Future<String> loginACPUser(final String name, final String password) async {
        final response = await this._networkWrapper.post(
            ACP_LOGIN_ROUTE,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'name': name,
                'password': password,
            }
        );
        return response['token'];
    }

    Future<void> logoutACPUser(final String sessionToken, final String name) async {
        await this._networkWrapper.post(
            ACP_LOGOUT_ROUTE,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'token': sessionToken,
                'name': name
            },
        );
    }
    
    Future<bool> validateACPSessionToken(final String sessionToken, final String name) async {
        final response = await this._networkWrapper.post(
            ACP_VALIDATE_ROUTE,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'token': sessionToken,
                'name': name
            },
        );
        return response['success'];
    }

    Future<bool> validateACPSession() async {
        String email = await this._cookieStorage.getName();
        String token = await this._cookieStorage.getSessionToken();

        return await this.validateACPSessionToken(token, email);
    }
}