import 'package:client/models/Menu.dart';
import 'package:flutter/material.dart';

class MenuController {
    static MenuController _instance = new MenuController.internal();
    factory MenuController() => _instance;
    
    List<Menu> _menus = [
        // new Menu(name: 'Veggie', entries: ['Green salad', 'Spring rolls', 'Vanilla muffin'], image: new NetworkImage('https://api.sokka.me/image?id=c731451fba7a79bff570856d290ff01e'), price: 4.50),
        //new Menu(name: 'Meat Love', entries: ['Chicken soup with croutons', 'Meat loaf', 'Chocolate molten lava cake'], image: new NetworkImage('https://api.sokka.me/image?id=c731451fba7a79bff570856d290ff01e'), price: 5.50),
        //new Menu(name: 'Meat Love', entries: ['Chicken soup with croutons', 'Meat loaf', 'Chocolate molten lava cake'], image: new NetworkImage('https://api.sokka.me/image?id=c731451fba7a79bff570856d290ff01e'), price: 5.50),
    ];

    List<Menu> getMenus() {
        return this._menus;
    }

    /// Appends a single menu to the hopper
    void appendToMenus(final Menu menu) {
        this._menus.add(menu);
    }

    /// Appends an iterable to the hopper
    void appendIterableToMenus(final List<Menu> menus) {
        this._menus.addAll(menus);
    }

    /// Remove menu at passed index
    void removeFromMenusAt(final int index) {
        this._menus.removeAt(index);
    }

    /// Remove first menu of the hopper
    void removeFirstFromMenus() {
        this._menus.removeAt(0);
    }    

    /// remove last menu of the hopper
    void removeLastFromMenus() {
        this._menus.removeLast();
    }

    /// Clear the entire hopper
    void resetMenus() {
        this._menus.clear();
    }

    MenuController.internal();
}
