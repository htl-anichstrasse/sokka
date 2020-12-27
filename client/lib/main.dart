import 'package:client/services/user_api_service.dart';
import 'package:client/util/routes.dart';
import 'package:client/util/session_token_storage.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/app_themes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final SessionTokenStorage _sessionTokenStorage = new SessionTokenStorage();
    final UserAPIService _userAPIService = new UserAPIService(); 

    String _email;
    String _sessionToken;
    bool _sessionTokenIsValid = false;

    String _initialRoute;

    @override
    Widget build(BuildContext context) {
        /// Check if a email is given.
        this._sessionTokenStorage.getSessionToken('email').then((email) => this._email = email);

        /// Check if a session token is given.
        this._sessionTokenStorage.getSessionToken('sessionToken').then((token) => this._sessionToken = token);

        /// Check if token is valid.
        this._userAPIService.validateSessionToken(this._sessionToken, this._email)
            .then((isValid) => this._sessionTokenIsValid = isValid);

        this._sessionTokenIsValid ? this._initialRoute = '/' : this._initialRoute = '/login';
        
        SystemChrome.setEnabledSystemUIOverlays([]);
        
        return new MaterialApp(
            debugShowCheckedModeBanner: true,
            theme: AppThemes.getDarkModeAppTheme,
            initialRoute: this._initialRoute,
            routes: routes
        );
    }
}