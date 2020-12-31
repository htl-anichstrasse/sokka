import 'package:shared_preferences/shared_preferences.dart';

class CookieStorage {
    static CookieStorage _instance = new CookieStorage.internal();
    factory CookieStorage() => _instance;

    static const TOKEN_STRING = 'token';
    static const EMAIL_STRING = 'email';
 
    Future<String> getSessionToken() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.TOKEN_STRING);
    }

    void storeSessionToken(final String token) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.TOKEN_STRING, token);
    }

    Future<String> getEmail() async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        return sharedPrefs.getString(CookieStorage.EMAIL_STRING);
    }

    void storeEmail(final String email) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.setString(CookieStorage.EMAIL_STRING, email);
    }

    void deleteValue(final String key) async {
        final SharedPreferences sharedPrefs = await SharedPreferences.getInstance();
        await sharedPrefs.remove(key);
    }

    CookieStorage.internal();
}