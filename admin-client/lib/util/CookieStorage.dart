import 'package:shared_preferences/shared_preferences.dart';

class CookieStorage {
    static CookieStorage _instance = new CookieStorage.internal();
    factory CookieStorage() => _instance;

    Map<String, String> _cookieCache = new Map<String, String>();

    static const TOKEN_STRING = 'token';
    static const USERNAME_STRING = 'username';

    Future<void> initializeCache() async {
        this._cookieCache[TOKEN_STRING] = await this.getSessionToken();
        this._cookieCache[USERNAME_STRING] = await this.getUsername();
    }

    Future<String> getSessionToken() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.TOKEN_STRING);
    }

    String getSessionTokenSync() {
        return this._cookieCache[TOKEN_STRING];
    }

    Future<void> storeSessionToken({ final String token }) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.TOKEN_STRING, token);
    }

    Future<String> getUsername() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.USERNAME_STRING);
    }

    String getUsernameSync() {
        return this._cookieCache[USERNAME_STRING];
    }

    Future<void> storeUsername({ final String username }) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.USERNAME_STRING, username);
    }

    void deleteValue({ final String key }) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.remove(key);
    }

    CookieStorage.internal();
}