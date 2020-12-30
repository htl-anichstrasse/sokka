import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/util/routes.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/AppThemes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final CookieStorage _cookieStorage = new CookieStorage();
    final UserAuth _userAuth = new UserAuth(); 

    @override
    Widget build(BuildContext context) {
        this._cookieStorage.getSessionToken().then((token)
            => print('token on startup: $token'));

        String email;
        String sessionToken;
        bool tokenIsValid = false;

        String initialRoute;

        this._cookieStorage.getEmail().then((emailAddress)
            => email = emailAddress);
        print('email: $email');
        this._cookieStorage.getSessionToken().then((token)
            => sessionToken = token);

        this._userAuth.validateSessionToken(sessionToken, email)
            .then((isValid) => tokenIsValid = isValid);

        if (tokenIsValid) {
            initialRoute = '/';
        } else {
            initialRoute = '/login';
            this._cookieStorage.deleteValue(CookieStorage.TOKEN_STRING);
        }

        SystemChrome.setEnabledSystemUIOverlays([]);

        return new MaterialApp(
            debugShowCheckedModeBanner: true,
            theme: AppThemes.getDarkModeAppTheme,
            initialRoute: initialRoute,
            routes: routes
        );
    }
}