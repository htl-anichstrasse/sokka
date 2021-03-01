import 'dart:ui';

import 'package:client/services/OrderService.dart';
import 'package:client/util/ShoppingBasketController.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:client/models/Menu.dart';
import 'package:flutter/scheduler.dart';
import 'package:google_fonts/google_fonts.dart';

class BasketView extends StatefulWidget {
    @override 
    _BasketViewState createState() => _BasketViewState();
}

class _BasketViewState extends State<BasketView> { 
    final ShoppingBasketController _shoppingBasketController = new ShoppingBasketController();
    final OrderService _orderService = new OrderService();
    double _totalPrice = 0.0;

    @override
    void initState() {
        super.initState();
        this._updateTotalPrice();
    }

    @override
    Widget build(BuildContext context) {
        return this._shoppingBasketController.getBasket().isNotEmpty
            ? new Scaffold(
                bottomNavigationBar: new BottomAppBar(
                    color: new Color(0xFF008C78),
                    child: new Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                            new Container(
                                padding: new EdgeInsets.all(10.0),
                                child: new Text(
                                    'TOTAL',
                                    style: GoogleFonts.montserrat(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                    ),
                                ),
                            ),
                            new Container(
                                padding: new EdgeInsets.all(10.0),
                                child: new Text(
                                '${this._totalPrice.toStringAsFixed(2)} €',
                                    style: GoogleFonts.montserrat(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                    ),
                                ),
                            ),
                        ],
                    ),
                ),
                floatingActionButton: new FloatingActionButton(
                    backgroundColor: new Color(0xFFFF8D4A),
                    child: Icon(Icons.payment, color: Colors.white),
                    onPressed: () => {
                        showModalBottomSheet(
                            context: context,
                            builder: (BuildContext context) => new Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: <Widget>[
                                    new ListTile(
                                        leading: new Icon(
                                            Icons.credit_card,
                                            color: Colors.white,
                                        ),
                                        title: new Text(
                                            'Pay with credit card',
                                            style: GoogleFonts.montserrat(
                                                color: Colors.white,
                                            ),
                                        ),
                                        onTap: null,
                                    ),
                                    new ListTile(
                                        leading: new Icon(
                                            Icons.money,
                                            color: Colors.white,
                                        ),
                                        title: new Text(
                                            'Pay with cash',
                                            style: GoogleFonts.montserrat(
                                                color: Colors.white,
                                            ),
                                        ),
                                        onTap: () => this._orderService.createOrder().then((response) {
                                            final image = response['success'] ? 'lib/styles/images/Sokka.png' : 'lib/styles/images/SadSokka.png';
                                            Navigator.of(context).pop();
                                            showDialog(
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
                                                                                'ORDER',
                                                                                style: GoogleFonts.montserrat(
                                                                                    fontSize: 24.0,
                                                                                    fontWeight: FontWeight.bold,
                                                                                    color: Colors.black,
                                                                                ),
                                                                            ),
                                                                            new SizedBox(
                                                                                height: 16.0
                                                                            ),
                                                                            new RichText(
                                                                                textAlign: TextAlign.center,
                                                                                text: new TextSpan(
                                                                                    text: response['message'],
                                                                                    style: GoogleFonts.montserrat(
                                                                                        color: Colors.black,
                                                                                    ),
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
                                                                                            icon: new Icon(Icons.cancel, color: Colors.white),
                                                                                            label: new Text(
                                                                                                'Close',
                                                                                                style: GoogleFonts.montserrat(
                                                                                                    color: Colors.white,
                                                                                                )
                                                                                            ),
                                                                                            onPressed: () => Navigator.of(context).pop(),
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
                                                                                    image
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
                                            );
                                        }),
                                    ),
                                    new Spacer(),
                                    new Container(
                                        decoration: new BoxDecoration(
                                            color: Colors.red,
                                        ),
                                        child: new ListTile(
                                            leading: new Icon(
                                                Icons.cancel_outlined,
                                                color: Colors.white,
                                            ),
                                            title: new Text(
                                                'Cancel',
                                                style: GoogleFonts.montserrat(
                                                    color: Colors.white,
                                                    fontWeight: FontWeight.bold
                                                ),
                                            ),
                                            onTap: () => Navigator.of(context).pop(),
                                        ),
                                    ),
                                ],
                            ),
                        ),
                    },
                ),
                floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
                body: new Builder(
                    builder: (context) => 
                        new Container(
                        decoration: new BoxDecoration(
                        image: new DecorationImage(
                                image: new AssetImage('lib/styles/images/BasketBackground.png'),
                                fit: BoxFit.cover,
                            ),
                        ),
                        child: new ListView.builder(
                            padding: new EdgeInsets.all(10.0),
                            itemCount: this._shoppingBasketController.getBasket().length,
                            itemBuilder: (BuildContext context, int index) => new Dismissible(
                                key: new UniqueKey(),
                                onDismissed: (DismissDirection direction) => {
                                    setState(() => {
                                        this._shoppingBasketController.getBasket().removeAt(index),
                                        this._updateTotalPrice(),
                                    }),
                                    Scaffold.of(context).showSnackBar(new SnackBar(
                                            content: new Text(
                                                '${this._shoppingBasketController.getBasket()[index].getName} has been removed from your basket',
                                                style: GoogleFonts.montserrat(),
                                            ),
                                        ),
                                    ),
                                },
                                child: new Card(
                                    color: Colors.transparent,
                                    shape: new RoundedRectangleBorder(
                                        borderRadius: new BorderRadius.circular(15.0),
                                    ),
                                    clipBehavior: Clip.antiAlias,
                                    child: new ClipRRect(
                                        child: new BackdropFilter(
                                            filter: new ImageFilter.blur(sigmaX: 16.0, sigmaY: 16.0),
                                            child: new Container(
                                                decoration: new BoxDecoration(
                                                    gradient: new LinearGradient(
                                                        colors: <Color>[
                                                            Colors.white.withOpacity(0.7),
                                                            Colors.white.withOpacity(0.05),
                                                        ],
                                                        stops: [0.0, 1.0],
                                                        begin: FractionalOffset.topLeft,
                                                        end: FractionalOffset.bottomRight,
                                                        tileMode: TileMode.repeated
                                                    ),
                                                ),
                                                child: new ListTile(
                                                    leading: this._shoppingBasketController.getBasket()[index] is Menu
                                                        ? Icon(Icons.restaurant_menu)
                                                        : Icon(Icons.fastfood),
                                                    title: new Text(
                                                        '${this._shoppingBasketController.getBasket()[index].getName}',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
                                                        ),
                                                    ),
                                                    trailing: new Text(
                                                        '${this._shoppingBasketController.getBasket()[index].getPrice.toStringAsFixed(2)} €',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
                                                            fontWeight: FontWeight.bold
                                                        ),
                                                    ),
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            )
            : new Scaffold(
                body: Container(
                    decoration: new BoxDecoration(
                    image: new DecorationImage(
                            image: new AssetImage('lib/styles/images/BasketBackground.png'),
                            fit: BoxFit.cover,
                        ),
                    ),
                    child: new SizedBox.expand(
                        child: new Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                                new Container(
                                    width: 200.0,
                                    height: 200.0,
                                    decoration: new BoxDecoration(
                                        color: Colors.white,
                                        shape: BoxShape.circle,
                                        boxShadow: <BoxShadow>[
                                            new BoxShadow(blurRadius: 8.0, color: Colors.black, spreadRadius: 1),
                                        ],
                                    ),
                                    child: new CircleAvatar(
                                        backgroundColor: Colors.tealAccent[700],
                                        child: new Image(
                                            image: new AssetImage('lib/styles/images/SadSokka.png'),
                                            color: Colors.white,
                                            height: 180.0,
                                        ),
                                    ),
                                ),
                                new Container(
                                    padding: new EdgeInsets.only(top: 50.0),
                                    child: new Text(
                                        'Your shopping basket is empty!',
                                        style: GoogleFonts.montserrat(
                                            color: Colors.white,
                                            fontSize: 18.0,
                                        ),
                                    ),
                                ),
                            ],
                        ),
                    ),
                ),
            );
    }

    void _updateTotalPrice() {
        this._totalPrice = 0.0;
        this._shoppingBasketController.getBasket().forEach((orderable) => {
            this._totalPrice += orderable.getPrice
        });
    }
}