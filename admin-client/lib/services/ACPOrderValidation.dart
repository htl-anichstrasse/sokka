import 'package:client/models/Order.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:intl/intl.dart';
import 'BearerAuth.dart';

class ACPOrderValidation {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final BearerAuth _bearerAuth = new BearerAuth();
    final DateFormat _dateFormatter = new DateFormat('yyyy-MM-dd');

    static const ACP_ORDER_VALIDATE = 'https://api.sokka.me/acp/order/validate';
    static const ACP_ORDER_INVALIDATE = 'https://api.sokka.me/acp/order/invalidate';

    Future<dynamic> validateOrder({ final String orderKey }) async {
        final response = await this._networkWrapper.get(
            '$ACP_ORDER_VALIDATE?order=$orderKey',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await this._bearerAuth.createBearerAuthToken(),
            },
        );
        if (response['success'] && response['valid']) {
            final order = response['order'];

            final Map<String, int> menuOrders = new Map<String, int>();
            final Map<String, int> productOrders = new Map<String, int>();

            for (var menu in order['menuOrders']) {
                menuOrders[menu['menu']['name']] = menu['quantity'];
            }
            for (var product in order['productOrders']) {
                productOrders[product['product']['name']] = product['quantity'];
            }

            return new Order(orderID: order['id'], userID: order['user_id'], rebate: order['rebate'],
                subTotal: order['total'].toDouble(), timestamp: _dateFormatter.format(DateTime.parse(order['timestamp'])),
                menuOrders: menuOrders, productOrders: productOrders);

        } else if (response['success'] && !response['valid']) {
            return response['reasons'];
        }
        return response['message'];
    }

    Future<bool> invalidateOrder(final String orderKey) async {
        final response = await this._networkWrapper.post(
            ACP_ORDER_INVALIDATE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await this._bearerAuth.createBearerAuthToken(),
            },
            body: {
                'order': orderKey,
            },
        );
        return response['success'];
    }
}