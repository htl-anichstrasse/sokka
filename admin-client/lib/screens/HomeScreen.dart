import 'dart:math' as MATH;
import 'package:client/models/Order.dart';
import 'package:client/services/ACPOrderValidation.dart';
import 'package:client/services/ACPUserAuth.dart';
import 'package:flutter/material.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class HomeScreen extends StatefulWidget {
    @override
    _HomeScreenState createState() => new _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
    final CookieStorage _cookieStorage = new CookieStorage();
    final ACPUserAuth _acpUserAuth = new ACPUserAuth();
    final ACPOrderValidation _acpOrderValidation = new ACPOrderValidation();
    final DateFormat _dateFormatter = new DateFormat('yyyy-MM-dd');
    final List<String> _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    String _qrOrderKey;

    @override
    Widget build(BuildContext context) {
        final date = DateTime.now();

        return new Builder(
            builder: (context)
                => new Scaffold(
                    appBar: new AppBar(
                        title: new Text(
                            '${_days[date.weekday - 1]} - ${date.year}-${date.month}-${date.day}',
                            style: GoogleFonts.montserrat(
                                color: Colors.white
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
                                                                        'ACP USER',
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
                                                                            text: 'You are logged in as\n',
                                                                            style: GoogleFonts.montserrat(
                                                                                color: Colors.black,
                                                                            ),
                                                                            children: <TextSpan>[
                                                                                new TextSpan(
                                                                                    text: '${this._cookieStorage.getNameSync()}.',
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
                                                                                        this._acpUserAuth.logoutACPUser(this._cookieStorage.getSessionTokenSync(),
                                                                                            this._cookieStorage.getNameSync()).then((_) => {
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
                    ),
                    bottomNavigationBar: new BottomAppBar(
                        color: Colors.tealAccent[700],
                        child: new Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                                new Container(
                                    padding: new EdgeInsets.only(top: 20.0, bottom: 20.0, left: 30.0),
                                    child: new Text(
                                        'SOKKA',
                                        style: GoogleFonts.montserrat(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                        ),
                                    ),
                                ),
                                new Container(
                                    padding: new EdgeInsets.only(top: 20.0, bottom: 20.0, right: 30.0),
                                    child: new Text(
                                        'ADMIN-CLIENT',
                                        style: GoogleFonts.montserrat(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                        ),
                                    ),
                                ),
                            ],
                        ),
                    ),
                    floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
                    floatingActionButton: new FloatingActionButton(
                        backgroundColor: new Color(0xFFFF8D4A),
                        child: new Icon(Icons.qr_code_scanner_rounded, color: Colors.white),
                        onPressed: () => {
                            this._scanQR().then((_) => {
                                if (this._qrOrderKey == '-1') {
                                    showDialog(
                                        context: context,
                                        builder: (context)
                                            => new AlertDialog(
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
                                                                        )
                                                                    ),
                                                                    new SizedBox(
                                                                        height: 16.0
                                                                    ),
                                                                    new RichText(
                                                                        textAlign: TextAlign.center,
                                                                        text: new TextSpan(
                                                                            text: 'The QR-Scan has been canceled!',
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
                                                                                    icon: new Icon(Icons.close, color: Colors.white),
                                                                                    label: new Text(
                                                                                        'Close',
                                                                                        style: GoogleFonts.montserrat(
                                                                                            color: Colors.white,
                                                                                        ),
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
                                                                            'lib/styles/images/SadSokka.png'
                                                                        ),
                                                                        height: 80.0,
                                                                        color: Colors.white
                                                                    ),
                                                                ),
                                                            ),
                                                        ),
                                                    ],
                                                ),
                                            ),
                                    ),
                                } else {
                                    this._acpOrderValidation.validateOrder(orderKey: this._qrOrderKey)
                                        .then((response) => {
                                            if (response is Order) {
                                                showDialog(
                                                    context: context,
                                                    builder: (context)
                                                        => new AlertDialog(
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
                                                                                        text: 'Order is valid!',
                                                                                        style: GoogleFonts.montserrat(
                                                                                            color: Colors.black,
                                                                                        ),
                                                                                    ),
                                                                                ),
                                                                                new SizedBox(
                                                                                    height: 12.0
                                                                                ),
                                                                                new Divider(
                                                                                    thickness: 1.0,
                                                                                    color: Colors.black,
                                                                                    indent: 20.0,
                                                                                    endIndent: 20.0,
                                                                                ),
                                                                                new Column(
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: <Widget>[
                                                                                        for (MapEntry entry in response.getMenuOrders.entries)
                                                                                            this._createEntryContainer(entry),
                                                                                    ],
                                                                                ),
                                                                                new Column(
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: <Widget>[
                                                                                        for (MapEntry entry in response.getProductOrders.entries)
                                                                                            this._createEntryContainer(entry),
                                                                                    ],
                                                                                ),
                                                                                new Divider(
                                                                                    thickness: 1.0,
                                                                                    color: Colors.black,
                                                                                    indent: 20.0,
                                                                                    endIndent: 20.0,
                                                                                ),
                                                                                new Row(
                                                                                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                                                                    children: <Widget>[
                                                                                        new Container(
                                                                                            // padding: new EdgeInsets.only(left: 25.0),
                                                                                            child: new Text(
                                                                                                'TOTAL',
                                                                                                style: GoogleFonts.montserrat(
                                                                                                    fontSize: 14.0,
                                                                                                    fontWeight: FontWeight.bold
                                                                                                )
                                                                                            ),
                                                                                        ),
                                                                                        
                                                                                        new Container(
                                                                                            child: new Text(
                                                                                                '${response.getTotal.toStringAsFixed(2)} €',
                                                                                                style: GoogleFonts.montserrat(
                                                                                                    fontSize: 14.0,
                                                                                                    fontWeight: FontWeight.bold
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                    ],
                                                                                ),
                                                                                new Divider(
                                                                                    thickness: 1.0,
                                                                                    color: Colors.black,
                                                                                    indent: 20.0,
                                                                                    endIndent: 20.0,
                                                                                ),
                                                                                new SizedBox(
                                                                                    height: 24.0,
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
                                                                                                    'Complete order',
                                                                                                    style: GoogleFonts.montserrat(
                                                                                                        color: Colors.white,
                                                                                                    ),
                                                                                                ),
                                                                                                onPressed: () => {
                                                                                                    print(this._qrOrderKey),
                                                                                                    this._acpOrderValidation.invalidateOrder(this._qrOrderKey)
                                                                                                        .then((success) {
                                                                                                            final completionStatus = success
                                                                                                                ? 'The order has been completed successfully!'
                                                                                                                : 'There was an error completing this order.\n\nPlease try again!';
                                                                                                            final sokkaImage = success ? 'lib/styles/images/Sokka.png' : 'lib/styles/images/SadSokka.png';
                                                                                                            Navigator.of(context).pop();
                                                                                                            showDialog(
                                                                                                                context: context,
                                                                                                                builder: (context)
                                                                                                                    => new AlertDialog(
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
                                                                                                                                    ),
                                                                                                                                    child: new Column(
                                                                                                                                        crossAxisAlignment: CrossAxisAlignment.center,
                                                                                                                                        children: <Widget>[
                                                                                                                                            new Text(
                                                                                                                                                'ORDER-STATUS',
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
                                                                                                                                                    text: completionStatus,
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
                                                                                                                                                            icon: new Icon(Icons.close, color: Colors.white),
                                                                                                                                                            label: new Text(
                                                                                                                                                                'Close',
                                                                                                                                                                style: GoogleFonts.montserrat(
                                                                                                                                                                    color: Colors.white,
                                                                                                                                                                ),
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
                                                                                                                                                    sokkaImage
                                                                                                                                                ),
                                                                                                                                                height: 80.0,
                                                                                                                                                color: Colors.white
                                                                                                                                            ),
                                                                                                                                        ),
                                                                                                                                    ),
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                        ),
                                                                                                                    ),
                                                                                                                    
                                                                                                            );
                                                                                                        })
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
                                                                                        'lib/styles/images/Sokka.png',
                                                                                    ),
                                                                                    height: 80.0,
                                                                                    color: Colors.white
                                                                                ),
                                                                            ),
                                                                        ),
                                                                    ),
                                                                ],
                                                            ),
                                                        ),
                                                ),
                                            } else {
                                                showDialog(
                                                    context: context,
                                                    builder: (context)
                                                        => new AlertDialog(
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
                                                                        ),
                                                                        child: new Column(
                                                                            crossAxisAlignment: CrossAxisAlignment.center,
                                                                            children: <Widget>[
                                                                                new Text(
                                                                                    'ORDER-STATUS',
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
                                                                                        text: '${response[0]}!',
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
                                                                                                icon: new Icon(Icons.close, color: Colors.white),
                                                                                                label: new Text(
                                                                                                    'Close',
                                                                                                    style: GoogleFonts.montserrat(
                                                                                                        color: Colors.white,
                                                                                                    ),
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
                                                                                        'lib/styles/images/SadSokka.png'
                                                                                    ),
                                                                                    height: 80.0,
                                                                                    color: Colors.white
                                                                                ),
                                                                            ),
                                                                        ),
                                                                    ),
                                                                ],
                                                            ),
                                                        ),
                                                        
                                                ),
                                            },
                                        }),
                                }
                            })
                        },
                    ),
                    body: new Container(
                        decoration: new BoxDecoration(
                            image: new DecorationImage(
                                image: new AssetImage(
                                    'lib/styles/images/BasketBackground.png'
                                ),
                                fit: BoxFit.cover,
                            ),
                        ),
                        
                    ),
                ),
        );
    }

    Future<void> _scanQR() async {
        final qrCode = await FlutterBarcodeScanner.scanBarcode(
            '#FF6666',
            'Cancel',
            true,
            ScanMode.QR,
        );

        if (!mounted) {
            return;
        }

        setState(() => this._qrOrderKey = qrCode);
    }

    Widget _createEntryContainer(final MapEntry entry) {
        return new Container(
            padding: EdgeInsets.only(bottom: 5.0),
            child: new Text(
                '${entry.value}x - ${entry.key}',
                style: GoogleFonts.montserrat(
                    color: Colors.black,
                    fontSize: 14,
                ),
            ),
        );
    }
}