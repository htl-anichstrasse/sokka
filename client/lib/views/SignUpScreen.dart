import 'package:client/services/FetchOrderables.dart';
import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SignUpScreen extends StatefulWidget {
    @override
    _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
    final UserAuth _userAuth = new UserAuth();
    final CookieStorage _cookieStorage = new CookieStorage();
    final FetchOrderables _fetchOrderables = new FetchOrderables();

    final TextEditingController _emailController = new TextEditingController();
    final TextEditingController _passwordController = new TextEditingController();
    final TextEditingController _repeatPasswordController = new TextEditingController();

    String _email;
    String _password;
    String _repeatPassword;

    @override 
    Widget build(BuildContext context) {
        return new Scaffold(
            resizeToAvoidBottomPadding: false,
            body: new Builder(
                builder: (context) => new Stack(
                    children: <Widget>[
                        new Container(
                            decoration: new BoxDecoration(
                                image: new DecorationImage(
                                    image: new AssetImage('lib/styles/images/SignUpBackground.png'),
                                    fit: BoxFit.cover,
                                ),
                            ),
                        ),
                        new Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            mainAxisSize: MainAxisSize.max,
                            children: <Widget>[
                                new Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: <Widget>[
                                        new Image(
                                            image: new AssetImage('lib/styles/images/SokkaDropShadow.png'),
                                            width: 250.0,
                                        ),
                                        new Container(
                                            child:new Text(
                                            'WELCOME TO',
                                                style: GoogleFonts.montserrat(
                                                    fontSize: 16.0,
                                                    letterSpacing: 2.0,
                                                ),
                                            ),
                                        ),
                                        new Container(
                                            child: new Text(
                                            'SOKKA',
                                                style: GoogleFonts.montserrat(
                                                    fontSize: 36.0,
                                                    fontWeight: FontWeight.bold,
                                                    letterSpacing: 10.0,
                                                ),
                                            ),
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 80.0, right: 160.0),
                                            alignment: Alignment.bottomLeft,
                                            child: new Text(
                                                'USER SIGN UP',
                                                style: GoogleFonts.montserrat(
                                                    fontSize: 20
                                                ),
                                            )
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 10.0, right: 50.0),
                                            width: 230.0,
                                            child: new TextFormField(
                                                controller: this._emailController,
                                                obscureText: false,
                                                keyboardType: TextInputType.emailAddress,
                                                keyboardAppearance: Brightness.dark,
                                                decoration: new InputDecoration(
                                                    labelText: 'EMAIL ADDRESS',
                                                    labelStyle: GoogleFonts.montserrat(
                                                        fontSize: 10.0,
                                                        color: new Color(0xFF80FFFFFF)
                                                    ),
                                                    enabledBorder: new UnderlineInputBorder(
                                                        borderSide:  new BorderSide(color: new Color(0xFF80FFFFFF))
                                                    ),
                                                ),
                                                style: GoogleFonts.montserrat(
                                                    color: Colors.white,
                                                ),
                                            ),
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 10.0, right: 50.0),
                                            width: 230.0,
                                            child: new TextFormField(
                                                controller: this._passwordController,
                                                obscureText: true,
                                                keyboardAppearance: Brightness.dark,
                                                decoration: new InputDecoration(
                                                    labelText: 'PASSWORD',
                                                    labelStyle: GoogleFonts.montserrat(
                                                        fontSize: 10.0,
                                                        color: new Color(0xFF80FFFFFF)
                                                    ),
                                                    enabledBorder: new UnderlineInputBorder(
                                                        borderSide:  new BorderSide(color: new Color(0xFF80FFFFFF))
                                                    ),
                                                ),
                                                style: GoogleFonts.montserrat(
                                                    color: Colors.white,
                                                ),
                                            ),
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 10.0, right: 50.0),
                                            width: 230.0,
                                            child: new TextFormField(
                                                controller: this._repeatPasswordController,
                                                obscureText: true,
                                                keyboardAppearance: Brightness.dark,
                                                decoration: new InputDecoration(
                                                    labelText: 'REPEAT PASSWORD',
                                                    labelStyle: GoogleFonts.montserrat(
                                                        fontSize: 10.0,
                                                        color: new Color(0xFF80FFFFFF)
                                                    ),
                                                    enabledBorder: new UnderlineInputBorder(
                                                        borderSide:  new BorderSide(color: new Color(0xFF80FFFFFF))
                                                    ),
                                                ),
                                                style: GoogleFonts.montserrat(
                                                    color: Colors.white,
                                                ),
                                            ),
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 40.0, left: 50.0),
                                            decoration: new BoxDecoration(
                                                boxShadow: [
                                                    new BoxShadow(
                                                        color: Colors.black.withOpacity(0.3),
                                                        spreadRadius: 0.5,
                                                        blurRadius: 5,
                                                        offset: new Offset(3, 3),
                                                    ),
                                                ],
                                            ),
                                            width: 140.0,
                                            height: 42.0,
                                            child: new RaisedButton(
                                                shape: new RoundedRectangleBorder(
                                                    borderRadius: new BorderRadius.circular(15),
                                                ),
                                                color: new Color(0xFFFF8D4A),
                                                child: new Text(
                                                    'SUBMIT',
                                                    style: GoogleFonts.montserrat(
                                                        fontSize: 12.0,
                                                        color: Colors.white,
                                                    ),
                                                ),
                                                onPressed: () => {
                                                    this._email = this._emailController.text,
                                                    this._password = this._passwordController.text,
                                                    this._repeatPassword = this._repeatPasswordController.text,

                                                    if (this._email.isEmpty || this._password.isEmpty || this._repeatPassword.isEmpty) {
                                                        showDialog(
                                                            context: context,
                                                            builder: (BuildContext context) {
                                                                return new AlertDialog(
                                                                    title: new Column(
                                                                        mainAxisAlignment: MainAxisAlignment.center,
                                                                        children: <Widget>[
                                                                            new Image(
                                                                                image: new AssetImage('lib/styles/images/SadSokka.png'),
                                                                                width: 150.0,
                                                                            ),
                                                                            new Text(
                                                                                'All fields are required and need to be filled!',
                                                                                style: GoogleFonts.montserrat(
                                                                                    fontSize: 12.0
                                                                                ),
                                                                            ),
                                                                            new Container(
                                                                                margin: new EdgeInsets.only(top: 15.0),
                                                                                child: new FlatButton(
                                                                                    child: new Text(
                                                                                        'Close',
                                                                                        style: GoogleFonts.montserrat(
                                                                                            fontSize: 14.0,
                                                                                            color: Colors.black
                                                                                        ),
                                                                                    ),
                                                                                    onPressed: () => Navigator.of(context).pop(),
                                                                                ),
                                                                            ),
                                                                        ],
                                                                    ),
                                                                );
                                                            }
                                                        ),
                                                    },

                                                    if (this._password != this._repeatPassword) {
                                                        showDialog(
                                                            context: context,
                                                            builder: (BuildContext context) {
                                                                return new AlertDialog(
                                                                    title: new Column(
                                                                        mainAxisAlignment: MainAxisAlignment.center,
                                                                        children: <Widget>[
                                                                            new Image(
                                                                                image: new AssetImage('lib/styles/images/SadSokka.png'),
                                                                                width: 150.0,
                                                                            ),
                                                                            new Text(
                                                                                'The entered passwords do not match!',
                                                                                style: GoogleFonts.montserrat(
                                                                                    fontSize: 14.0,
                                                                                    color: Colors.black,
                                                                                ),
                                                                            ),
                                                                            new Container(
                                                                                margin: new EdgeInsets.only(top: 15.0),
                                                                                child: new FlatButton(
                                                                                    child: new Text(
                                                                                        'Close',
                                                                                        style: GoogleFonts.montserrat(
                                                                                            fontSize: 14.0,
                                                                                            color: Colors.black
                                                                                        ),
                                                                                    ),
                                                                                    onPressed: () => Navigator.of(context).pop(),
                                                                                ),
                                                                            ),
                                                                        ],
                                                                    )
                                                                );
                                                            },
                                                        ),
                                                    },

                                                    this._userAuth.signUpUser(this._email, this._password).then((token) {
                                                            if (token != null) {
                                                                Future.wait([this._cookieStorage.storeSessionToken(token), this._cookieStorage.storeEmail(this._email)])
                                                                    .then((_) => {
                                                                        this._initialize().then((_) => {
                                                                            Navigator.of(context).popAndPushNamed('/'),
                                                                        }),
                                                                    });
                                                            } else {
                                                                Scaffold.of(context).showSnackBar(new SnackBar(
                                                                    content: new Text(
                                                                        'There was a problem creating a new user.\nPlease try again!',
                                                                        style: GoogleFonts.montserrat(),
                                                                    ),
                                                                ));
                                                            }
                                                        }),
                                                },                                        
                                            ),
                                        ),
                                        new Container(
                                            margin: new EdgeInsets.only(top: 100.0, left: 200.0),
                                            child: new InkWell(
                                                child: new Text(
                                                    'Sign in',
                                                    style: GoogleFonts.montserrat(
                                                        fontSize: 16.0,
                                                    ),
                                                ),
                                                onTap: () => Navigator.of(context).pushNamed('/login'),    
                                            ),
                                        ),
                                    ],
                                ),
                            ],
                        ),
                    ],
                ),
            ),
        );
    }

    Future<void> _initialize() async {
        await this._cookieStorage.initializeCache();
        await this._fetchOrderables.initializeMenus();
        await this._fetchOrderables.initializeProducts();
    }
}