import 'package:shared_preferences/shared_preferences.dart';

class CookieStorage {
    static CookieStorage _instance = new CookieStorage.internal();
    factory CookieStorage() => _instance;

    Map<String, String> _cookieCache = new Map<String, String>();

    static const TOKEN_STRING = 'token';
    static const NAME_STRING = 'name';

    Future<void> initializeCache() async {
        this._cookieCache[TOKEN_STRING] = await this.getSessionToken();
        this._cookieCache[NAME_STRING] = await this.getName();
    }

    Future<String> getSessionToken() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.TOKEN_STRING);
    }

    String getSessionTokenSync() {
        return this._cookieCache[TOKEN_STRING];
    }

    Future<void> storeSessionToken(final String token) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.TOKEN_STRING, token);
    }

    Future<String> getName() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.NAME_STRING);
    }

    String getNameSync() {
        return this._cookieCache[NAME_STRING];
    }

    Future<void> storeName(final String name) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.NAME_STRING, name);
    }

    void deleteValue(final String key) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.remove(key);
    }

    CookieStorage.internal();
}