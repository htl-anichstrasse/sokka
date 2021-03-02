import 'dart:math' as MATH;
import 'package:flutter/material.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class HomeScreen extends StatefulWidget {
    @override
    _HomeScreenState createState() => new _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
    final CookieStorage _cookieStorage = new CookieStorage();
    final DateFormat _dateFormatter = new DateFormat('yyyy-MM-dd');
    final List<String> _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    String _qrCode;

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
                                onPressed: () => null,
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
                                showDialog(
                                    context: context,
                                    builder: (BuildContext context) 
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
                                                                        text: '${this._qrCode}',
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
                                                                                onPressed: () => {
                                                                                    Navigator.of(context).pop(),
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
                                )
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

        setState(() => this._qrCode = qrCode);
    }
}