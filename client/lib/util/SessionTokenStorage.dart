import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SessionTokenStorage {
    static SessionTokenStorage _instance = new SessionTokenStorage.internal();
    factory SessionTokenStorage() => _instance;

    final FlutterSecureStorage _tokenStorage = new FlutterSecureStorage();

    Future<String> getSessionToken(final String key) async {
        return await this._tokenStorage.read(key: key);
    }

    void storeNewSessionToken(final String key, final String token) async {
        await this._tokenStorage.write(key: key, value: token);
    }

    void deleteSessionToken(final String key) async {
        await this._tokenStorage.delete(key: key);
    }

    SessionTokenStorage.internal();
}