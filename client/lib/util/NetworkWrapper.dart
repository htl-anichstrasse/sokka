import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class NetworkWrapper {
    /// The Dart way of creating a singleton.
    static NetworkWrapper _instance = new NetworkWrapper.internal();
    factory NetworkWrapper() => _instance;

    final JsonDecoder _jsonDecoder = new JsonDecoder();
    final JsonEncoder _jsonEncoder = new JsonEncoder();

    Future<dynamic> get(final String url) async {
        return await http.get(url).then((http.Response response) {
            if (response.statusCode < 200 || response.statusCode > 400 || json == null) {
                throw new Exception("Error fetching data from $url");
            }
            return this._jsonDecoder.convert(response.body);
        });
    }

    Future<dynamic> post(final String url, { final Map<String, String> headers, body, encoding }) async {
        return await http
            .post(
                url,
                headers: headers,
                body: this._jsonEncoder.convert(body),
                encoding: encoding
            )
            .then((http.Response response) {
                if (response.statusCode < 200 || response.statusCode > 400 || json == null) {
                    throw new Exception("Error fetching data from $url");
                }
                return this._jsonDecoder.convert(response.body);
            });
    }

    NetworkWrapper.internal();
}