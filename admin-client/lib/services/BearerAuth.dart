import 'dart:convert';
import 'package:client/util/CookieStorage.dart';

class BearerAuth {
    final CookieStorage _cookieStorage = new CookieStorage();

    Future<String> createBearerAuthToken() async {
        final name = await this._cookieStorage.getName();
        final token = await this._cookieStorage.getSessionToken();

        return 'Bearer ${base64Encode(utf8.encode('$name:$token'))}';
    }

    String createBearerAuthTokenManually(final String email, final String sessionToken) {
        return 'Bearer ${base64Encode(utf8.encode('$email:$sessionToken'))}';
    }
}