import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/views/menu/MenuView.dart';
import 'package:client/views/product/ProductGrid.dart';
import 'package:flutter/material.dart';
import 'package:client/views/account/AccountView.dart';
import 'package:client/views/basket/BasketView.dart';
import 'package:google_fonts/google_fonts.dart';

class HomeScreen extends StatefulWidget {
    @override
    _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
    final CookieStorage _cookieStorage = new CookieStorage();
    final UserAuth _userAuth = new UserAuth();
    final List<String> _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    String _email; 
    String _sessionToken;

    @override
    Widget build(BuildContext context) {
        final date = DateTime.now();
        
        return new Builder(
            builder: (context) => new DefaultTabController(
                length: 4,
                child: new Scaffold(
                    appBar: new AppBar(
                        title: new Text(
                            '${_days[date.weekday - 1]} - ${date.day}.${date.month}.${date.year}',
                            style: GoogleFonts.montserrat(
                                color: Colors.white,
                            ),
                        ),
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
                                        child: new Column(
                                            children: <Widget>[
                                                new Text(
                                                    'SOKKA',
                                                    style: GoogleFonts.montserrat(
                                                        fontSize: 20.0,
                                                    ),
                                                ),
                                            ],
                                        ),
                                    ),
                                ),
                                new ListTile(
                                    leading: new Icon(Icons.account_circle, color: Colors.white),
                                    title: new Text('Account'),
                                    onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (context)
                                        => new Account())),
                                    onLongPress: () => null,
                                ),
                                new ListTile(
                                    leading: new Icon(Icons.account_balance_wallet, color: Colors.white),
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
                                            this._userAuth.logoutUser(this._sessionToken, this._email),
                                            this._cookieStorage.deleteValue(CookieStorage.TOKEN_STRING),

                                            Navigator.of(context).popAndPushNamed('/login'),
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
                            labelStyle: GoogleFonts.montserrat(),
                            tabs: [
                                new Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
                                new Tab(text: 'Products', icon: Icon(Icons.fastfood)),
                                new Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
                                new Tab(text: 'Codes', icon: Icon(Icons.qr_code)),
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
                                    // Product-Grid
                                    child: new ProductGrid(),
                                ),
                                new Container(
                                    // Basket-View
                                    child: new BasketView(),
                                ),
                                new Container(
                                    // QR-Codes
                                    child: new Icon(Icons.qr_code, color: Colors.white),
                                ),
                            ],
                        ),
                    ),
                ),
            ),
        );
    }
}