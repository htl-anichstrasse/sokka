import 'package:client/services/UserAPIService.dart';
import 'package:client/util/SessionTokenStorage.dart';
import 'package:client/views/menu/MenuView.dart';
import 'package:flutter/material.dart';
import 'package:client/views/account/AccountView.dart';
import 'package:client/views/basket/BasketView.dart';

class HomeScreen extends StatefulWidget {
    @override
    _HomeScreenState createState() => _HomeScreenState();
}       

class _HomeScreenState extends State<HomeScreen> {
    final SessionTokenStorage _sessionTokenStorage = new SessionTokenStorage();
    final UserAPIService _userAPIService = new UserAPIService();
    final List<String> _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @override
    void initState() {
        super.initState();
    }

    @override
    Widget build(BuildContext context) {
        return new Builder(
            builder: (context) => new DefaultTabController(
                length: 4,
                child: new Scaffold(
                    appBar: new AppBar(
                        title: new Text('${_days[new DateTime.now().weekday - 1]} - ${new DateTime.now().day}.${new DateTime.now().month}.${new DateTime.now().year}'),
                        centerTitle: true,
                        iconTheme: new IconThemeData(color: Colors.white),
                    ),
                    drawer: new Drawer(
                        child: new Column(
                            children: <Widget>[
                                new DrawerHeader(
                                    decoration: new BoxDecoration(color: Colors.tealAccent[700]),
                                    child: new Align(
                                        alignment: Alignment.topCenter,
                                        child: new Text('SOKKA'),
                                    ),
                                ),
                                new ListTile(
                                    leading: new Icon(Icons.account_circle, color: Colors.white),
                                    title: new Text('Account'),
                                    onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => new Account())),
                                    onLongPress: () => null,
                                ),
                                new ListTile(
                                    leading: new Icon(Icons.account_balance_wallet, color:Colors.white),
                                    title: new Text('Wallet'),
                                    onTap:() => null,
                                    onLongPress: () => null,
                                ),
                                new Spacer(),
                                new Container(
                                    child: new ListTile(
                                        leading: new Icon(Icons.settings, color: Colors.white),
                                        title: new Text('Settings'),
                                        onTap: () => null,
                                    ),
                                ),
                                new Container(
                                    decoration: new BoxDecoration(
                                        color: Colors.red,
                                    ),
                                    child: new ListTile(
                                        leading: new Icon(Icons.exit_to_app, color: Colors.white),
                                        title: new Text('Log out'),
                                        onTap: () => {
                                            this._sessionTokenStorage.getSessionToken('sessionToken')
                                                .then((token) => this._userAPIService.logoutUser(token)),
                                            this._sessionTokenStorage.deleteSessionToken('sessionToken'),

                                            Navigator.of(context).pushNamed('/login'),
                                            Scaffold.of(context).showSnackBar(new SnackBar(
                                                content: new Text('Successfully logged out.')
                                            )),
                                        },
                                    ),
                                ),
                            ],
                        ),
                    ),
                    bottomNavigationBar: new Container(
                        color: Colors.tealAccent[700],
                        child: new TabBar(
                            labelColor: Colors.white,
                            unselectedLabelColor: Colors.white70,
                            indicatorSize: TabBarIndicatorSize.tab,
                            indicatorPadding: new EdgeInsets.all(5.0),
                            indicatorColor: Colors.tealAccent[100],
                            tabs: [
                                new Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
                                new Tab(text: 'Meals', icon: Icon(Icons.fastfood)),
                                new Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
                                new Tab(text: 'Codes', icon: Icon(Icons.code)),
                            ],
                        ),
                    ),
                    body: new SafeArea(
                        child: new TabBarView(
                            children: <Widget>[
                                new Container(
                                    // Menu-View
                                    child: new MenuView(),
                                ),
                                new Container(
                                    // Meal-Grid
                                    child: new Icon(Icons.fastfood, color: Colors.white),
                                ),
                                new Container(
                                    // Basket-View
                                    child: new BasketView(),
                                ),
                                new Container(
                                    // QR-Codes
                                    child: new Icon(Icons.code, color: Colors.white),
                                ),
                            ],
                        ),
                    ),
                ),
            ),
        );
    }
}