import 'package:client/models/Product.dart';

class MenuEntry {
    int _title_id;
    int get getTitleID => this._title_id;
    set setTitleID(final int titleID) => this._title_id = titleID;

    int _menu_id;
    int get getMenuID => this._menu_id;
    set setMenuID(final int menuID) => this._menu_id = menuID;

    Product _product;
    Product get getProduct => this._product;
    set setProdcut(final Product product) => this._product = product;

    MenuEntry({ final int titleID, final int menuID, final Product product }) {
        this._title_id = titleID;
        this._menu_id = menuID;
        this._product = product;
    }
}