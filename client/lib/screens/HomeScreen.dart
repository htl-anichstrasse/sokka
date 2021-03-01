import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/views/menu/MenuView.dart';
import 'package:client/views/orders/OrderView.dart';
import 'package:client/views/product/ProductGrid.dart';
import 'package:flutter/material.dart';
import 'dart:math' as MATH;
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
                        leading: new Transform.rotate(
                            angle: 180 * MATH.pi / 180,
                            child: new IconButton(
                                icon: new Icon(Icons.exit_to_app, color: Colors.white),
                                onPressed: ()
                                    => showDialog(
                                        context: context,
                                        builder: (BuildContext context) {
                                            return new AlertDialog(
                                                backgroundColor: Colors.transparent,
                                                title: new Stack(
                                                    children: <Widget>[
                                                        new Container(
                                                            padding: new EdgeInsets.only(top: 65.0, right: 20.0, bottom: 20.0, left: 20.0),
                                                            margin: new EdgeInsets.only(top: 45.0),
                                                            decoration: new BoxDecoration(
                                                                color: Colors.white,
                                                                shape: BoxShape.rectangle,
                                                                borderRadius: new BorderRadius.circular(20.0),
                                                                boxShadow: <BoxShadow>[
                                                                ],
                                                            ),
                                                            child: new Column(
                                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                                children: <Widget>[
                                                                    new Text(
                                                                        'ACCOUNT',
                                                                        style: GoogleFonts.montserrat(
                                                                            fontSize: 24.0,
                                                                            fontWeight: FontWeight.bold,
                                                                            color: Colors.black,
                                                                        )
                                                                    ),
                                                                    new SizedBox(
                                                                        height: 16.0
                                                                    ),
                                                                    new RichText(
                                                                        textAlign: TextAlign.center,
                                                                        text: new TextSpan(
                                                                            text: 'You are logged in as ',
                                                                            style: GoogleFonts.montserrat(
                                                                                color: Colors.black,
                                                                            ),
                                                                            children: <TextSpan>[
                                                                                new TextSpan(
                                                                                    text: '${this._cookieStorage.getEmailSync()}.',
                                                                                    style: GoogleFonts.montserrat(
                                                                                        color: Colors.black,
                                                                                        fontWeight: FontWeight.bold
                                                                                    ),
                                                                                ),
                                                                            ],
                                                                        ),
                                                                    ),
                                                                    new SizedBox(
                                                                        height: 24.0
                                                                    ),
                                                                    new Row(
                                                                        mainAxisAlignment: MainAxisAlignment.center,
                                                                        children: <Widget>[
                                                                            new Container(
                                                                                decoration: new BoxDecoration(
                                                                                    borderRadius: new BorderRadius.circular(10.0),
                                                                                    color: Colors.red,
                                                                                ),
                                                                                child: new FlatButton.icon(
                                                                                    icon: new Icon(Icons.exit_to_app, color: Colors.white),
                                                                                    label: new Text(
                                                                                        'Log out',
                                                                                        style: GoogleFonts.montserrat(
                                                                                            color: Colors.white,
                                                                                        )
                                                                                    ),
                                                                                    onPressed: () => {
                                                                                        this._userAuth.logoutUser(this._cookieStorage.getSessionTokenSync(),
                                                                                            this._cookieStorage.getEmailSync()).then((_) => {
                                                                                                this._cookieStorage.deleteValue(CookieStorage.TOKEN_STRING),
                                                                                                Navigator.of(context).popAndPushNamed('/login'),
                                                                                            }),
                                                                                    },
                                                                                ),
                                                                            ),
                                                                        ],
                                                                    ),
                                                                ],
                                                            ),
                                                        ),
                                                        new  Positioned(
                                                            left: 20.0,
                                                            right: 20.0,
                                                            child: new Container(
                                                                decoration: new BoxDecoration(
                                                                    color: Colors.white,
                                                                    shape: BoxShape.circle,
                                                                    boxShadow: <BoxShadow>[
                                                                        new BoxShadow(
                                                                            blurRadius: 4.0,
                                                                            color: Colors.black,
                                                                            spreadRadius: 1,
                                                                            offset: new Offset(0.0, 2.0)
                                                                        ),
                                                                    ],
                                                                ),
                                                                child: new CircleAvatar(
                                                                    backgroundColor: Colors.tealAccent[700],
                                                                    radius: 45.0,
                                                                    
                                                                    child: new Image(
                                                                        image: new AssetImage(
                                                                            'lib/styles/images/Sokka.png'
                                                                        ),
                                                                        width: 150.0,
                                                                        color: Colors.white
                                                                    ),
                                                                ),
                                                            ),
                                                        ),
                                                    ],
                                                ),
                                            );
                                        },
                                    ),
                            ),
                        ),
                        centerTitle: true,
                        iconTheme: new IconThemeData(color: Colors.white),
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
                                new Tab(text: 'Orders', icon: Icon(Icons.qr_code_rounded)),
                            ],
                        ),
                    ),
                    body: new SafeArea(
                        child: new TabBarView(
                            children: <Widget>[
                                new Container(
                                    child: new MenuView(),
                                ),
                                new Container(
                                    child: new ProductGrid(),
                                ),
                                new Container(
                                    child: new BasketView(),
                                ),
                                new Container(
                                    child: new OrderView(),
                                ),
                            ],
                        ),
                    ),
                ),
            ),
        );
    }
}