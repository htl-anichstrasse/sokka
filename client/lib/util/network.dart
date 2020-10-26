import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Network {
    static Network _instance = new Network.internal();
    factory Network() => _instance;

    final JsonDecoder _jsonDecoder = new JsonDecoder();

    Future<dynamic> get(final String url) {
        return http.get(url).then((http.Response response) {
            if (response.statusCode < 200 || response.statusCode > 400 || json == null) {
                throw new Exception("Error fetching data from $url");
            }
            return this._jsonDecoder.convert(response.body);
        });
    }
    
    Future<dynamic> post(final String url, {final Map headers, body, encoding}) {
        return http
            .post(
                url,
                body: body,
                headers: headers,
                encoding: encoding
            )
            .then((http.Response response) {
                if (response.statusCode < 200 || response.statusCode > 400 || json == null) {
                    throw new Exception("Error fetching data from $url");
                }
                return this._jsonDecoder.convert(response.body);
            });
    }

    Network.internal();
}