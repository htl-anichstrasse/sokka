import 'dart:convert';
import 'package:client/util/CookieStorage.dart';

class BearerAuth {
    final CookieStorage _cookieStorage = new CookieStorage();

    String createBearerAuthToken() {
        return 'Bearer ${base64Encode(utf8
            .encode('${this._cookieStorage.getEmailSync()}:${this._cookieStorage.getSessionTokenSync()}'))}';
    }

    String createBearerAuthTokenManually(final String email, final String sessionToken) {
        return 'Bearer ${base64Encode(utf8.encode('$email:$sessionToken'))}';
    }
}