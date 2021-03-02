import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class NetworkWrapper {
    /// The Dart way of creating a singleton.
    static NetworkWrapper _instance = new NetworkWrapper.internal();
    factory NetworkWrapper() => _instance;

    final JsonDecoder _jsonDecoder = new JsonDecoder();
    final JsonEncoder _jsonEncoder = new JsonEncoder();

    Future<dynamic> get(final String url, { final Map<String, String> headers }) async {
        return await http
            .get(
                url,
                headers: headers,
            )
            .then((http.Response response) {
                if (response.statusCode < 200 || response.statusCode > 400 || json == null) {
                    throw new Exception("Error fetching data from $url with ${response.statusCode}");
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
                    throw new Exception("Error fetching data from $url with error ${response.statusCode}");
                }
                return this._jsonDecoder.convert(response.body);
            });
    }

    NetworkWrapper.internal();
}