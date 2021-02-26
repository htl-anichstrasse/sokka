import 'package:client/models/Product.dart';

class MenuEntry {
    int _titleID;
    int get getTitleID => this._titleID;
    set setTitleID(final int titleID) => this._titleID = titleID;

    int _menuID;
    int get getMenuID => this._menuID;
    set setMenuID(final int menuID) => this._menuID = menuID;

    Product _product;
    Product get getProduct => this._product;
    set setProdcut(final Product product) => this._product = product;

    MenuEntry({ final int titleID, final int menuID, final Product product }) {
        this._titleID = titleID;
        this._menuID = menuID;
        this._product = product;
    }
}