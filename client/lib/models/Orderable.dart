import 'package:flutter/material.dart';

abstract class Orderable {
    int get getID;
    set setID(final int id);

    String get getName;
    set setName(final String name);

    double get getPrice;
    set setPrice(final double price);

    NetworkImage get getImage;
    set setImage(final NetworkImage image);

    bool get isHidden;
    set setIsHidden(final bool isHidden);
}