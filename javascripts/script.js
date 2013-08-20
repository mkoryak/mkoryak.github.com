

Explore
Gist
Blog
Help

mkoryak

41
395
115

public RobinHerbots/jquery.inputmask

jquery.inputmask / js / jquery.inputmask.js
Robin Herbots a day ago
fix form reset #298

6 contributors
file 1518 lines (1410 sloc) 92.739 kb
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 221 222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 238 239 240 241 242 243 244 245 246 247 248 249 250 251 252 253 254 255 256 257 258 259 260 261 262 263 264 265 266 267 268 269 270 271 272 273 274 275 276 277 278 279 280 281 282 283 284 285 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 301 302 303 304 305 306 307 308 309 310 311 312 313 314 315 316 317 318 319 320 321 322 323 324 325 326 327 328 329 330 331 332 333 334 335 336 337 338 339 340 341 342 343 344 345 346 347 348 349 350 351 352 353 354 355 356 357 358 359 360 361 362 363 364 365 366 367 368 369 370 371 372 373 374 375 376 377 378 379 380 381 382 383 384 385 386 387 388 389 390 391 392 393 394 395 396 397 398 399 400 401 402 403 404 405 406 407 408 409 410 411 412 413 414 415 416 417 418 419 420 421 422 423 424 425 426 427 428 429 430 431 432 433 434 435 436 437 438 439 440 441 442 443 444 445 446 447 448 449 450 451 452 453 454 455 456 457 458 459 460 461 462 463 464 465 466 467 468 469 470 471 472 473 474 475 476 477 478 479 480 481 482 483 484 485 486 487 488 489 490 491 492 493 494 495 496 497 498 499 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520 521 522 523 524 525 526 527 528 529 530 531 532 533 534 535 536 537 538 539 540 541 542 543 544 545 546 547 548 549 550 551 552 553 554 555 556 557 558 559 560 561 562 563 564 565 566 567 568 569 570 571 572 573 574 575 576 577 578 579 580 581 582 583 584 585 586 587 588 589 590 591 592 593 594 595 596 597 598 599 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616 617 618 619 620 621 622 623 624 625 626 627 628 629 630 631 632 633 634 635 636 637 638 639 640 641 642 643 644 645 646 647 648 649 650 651 652 653 654 655 656 657 658 659 660 661 662 663 664 665 666 667 668 669 670 671 672 673 674 675 676 677 678 679 680 681 682 683 684 685 686 687 688 689 690 691 692 693 694 695 696 697 698 699 700 701 702 703 704 705 706 707 708 709 710 711 712 713 714 715 716 717 718 719 720 721 722 723 724 725 726 727 728 729 730 731 732 733 734 735 736 737 738 739 740 741 742 743 744 745 746 747 748 749 750 751 752 753 754 755 756 757 758 759 760 761 762 763 764 765 766 767 768 769 770 771 772 773 774 775 776 777 778 779 780 781 782 783 784 785 786 787 788 789 790 791 792 793 794 795 796 797 798 799 800 801 802 803 804 805 806 807 808 809 810 811 812 813 814 815 816 817 818 819 820 821 822 823 824 825 826 827 828 829 830 831 832 833 834 835 836 837 838 839 840 841 842 843 844 845 846 847 848 849 850 851 852 853 854 855 856 857 858 859 860 861 862 863 864 865 866 867 868 869 870 871 872 873 874 875 876 877 878 879 880 881 882 883 884 885 886 887 888 889 890 891 892 893 894 895 896 897 898 899 900 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919 920 921 922 923 924 925 926 927 928 929 930 931 932 933 934 935 936 937 938 939 940 941 942 943 944 945 946 947 948 949 950 951 952 953 954 955 956 957 958 959 960 961 962 963 964 965 966 967 968 969 970 971 972 973 974 975 976 977 978 979 980 981 982 983 984 985 986 987 988 989 990 991 992 993 994 995 996 997 998 999 1000 1001 1002 1003 1004 1005 1006 1007 1008 1009 1010 1011 1012 1013 1014 1015 1016 1017 1018 1019 1020 1021 1022 1023 1024 1025 1026 1027 1028 1029 1030 1031 1032 1033 1034 1035 1036 1037 1038 1039 1040 1041 1042 1043 1044 1045 1046 1047 1048 1049 1050 1051 1052 1053 1054 1055 1056 1057 1058 1059 1060 1061 1062 1063 1064 1065 1066 1067 1068 1069 1070 1071 1072 1073 1074 1075 1076 1077 1078 1079 1080 1081 1082 1083 1084 1085 1086 1087 1088 1089 1090 1091 1092 1093 1094 1095 1096 1097 1098 1099 1100 1101 1102 1103 1104 1105 1106 1107 1108 1109 1110 1111 1112 1113 1114 1115 1116 1117 1118 1119 1120 1121 1122 1123 1124 1125 1126 1127 1128 1129 1130 1131 1132 1133 1134 1135 1136 1137 1138 1139 1140 1141 1142 1143 1144 1145 1146 1147 1148 1149 1150 1151 1152 1153 1154 1155 1156 1157 1158 1159 1160 1161 1162 1163 1164 1165 1166 1167 1168 1169 1170 1171 1172 1173 1174 1175 1176 1177 1178 1179 1180 1181 1182 1183 1184 1185 1186 1187 1188 1189 1190 1191 1192 1193 1194 1195 1196 1197 1198 1199 1200 1201 1202 1203 1204 1205 1206 1207 1208 1209 1210 1211 1212 1213 1214 1215 1216 1217 1218 1219 1220 1221 1222 1223 1224 1225 1226 1227 1228 1229 1230 1231 1232 1233 1234 1235 1236 1237 1238 1239 1240 1241 1242 1243 1244 1245 1246 1247 1248 1249 1250 1251 1252 1253 1254 1255 1256 1257 1258 1259 1260 1261 1262 1263 1264 1265 1266 1267 1268 1269 1270 1271 1272 1273 1274 1275 1276 1277 1278 1279 1280 1281 1282 1283 1284 1285 1286 1287 1288 1289 1290 1291 1292 1293 1294 1295 1296 1297 1298 1299 1300 1301 1302 1303 1304 1305 1306 1307 1308 1309 1310 1311 1312 1313 1314 1315 1316 1317 1318 1319 1320 1321 1322 1323 1324 1325 1326 1327 1328 1329 1330 1331 1332 1333 1334 1335 1336 1337 1338 1339 1340 1341 1342 1343 1344 1345 1346 1347 1348 1349 1350 1351 1352 1353 1354 1355 1356 1357 1358 1359 1360 1361 1362 1363 1364 1365 1366 1367 1368 1369 1370 1371 1372 1373 1374 1375 1376 1377 1378 1379 1380 1381 1382 1383 1384 1385 1386 1387 1388 1389 1390 1391 1392 1393 1394 1395 1396 1397 1398 1399 1400 1401 1402 1403 1404 1405 1406 1407 1408 1409 1410 1411 1412 1413 1414 1415 1416 1417 1418 1419 1420 1421 1422 1423 1424 1425 1426 1427 1428 1429 1430 1431 1432 1433 1434 1435 1436 1437 1438 1439 1440 1441 1442 1443 1444 1445 1446 1447 1448 1449 1450 1451 1452 1453 1454 1455 1456 1457 1458 1459 1460 1461 1462 1463 1464 1465 1466 1467 1468 1469 1470 1471 1472 1473 1474 1475 1476 1477 1478 1479 1480 1481 1482 1483 1484 1485 1486 1487 1488 1489 1490 1491 1492 1493 1494 1495 1496 1497 1498 1499 1500 1501 1502 1503 1504 1505 1506 1507 1508 1509 1510 1511 1512 1513 1514 1515 1516 1517

/**
 * @license Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - 2013 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0
 */

(function ($) {
  if ($.fn.inputmask == undefined) {
    $.inputmask = {
      //options default
      defaults: {
        placeholder: "_",
        optionalmarker: {
          start: "[",
          end: "]"
        },
        escapeChar: "\\",
        mask: null,
        oncomplete: $.noop, //executes when the mask is complete
        onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
        oncleared: $.noop, //executes when the mask is cleared
        repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
        greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
        autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
        clearMaskOnLostFocus: true,
        insertMode: true, //insert the input or overwrite the input
        clearIncomplete: false, //clear the incomplete input on blur
        aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
        onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
        onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
        showMaskOnFocus: true, //show the mask-placeholder when the input has focus
        showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
        onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
        skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
        showTooltip: false, //show the activemask as tooltip
        //numeric basic properties
        numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
        radixPoint: "", //".", // | ","
        skipRadixDance: false, //disable radixpoint caret positioning
        rightAlignNumerics: true, //align numerics to the right
        //numeric basic properties
        definitions: {
          '9': {
            validator: "[0-9]",
            cardinality: 1
          },
          'a': {
            validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
            cardinality: 1
          },
          '*': {
            validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
            cardinality: 1
          }
        },
        keyCode: {
          ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
          NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
        },
        //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
        ignorables: [9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
        getMaskLength: function (buffer, greedy, repeat, currentBuffer, opts) {
          var calculatedLength = buffer.length;
          if (!greedy) {
            if (repeat == "*") {
              calculatedLength = currentBuffer.length + 1;
            } else if (repeat > 1) {
              calculatedLength += (buffer.length * (repeat - 1));
            }
          }
          return calculatedLength;
        }
      },
      val: $.fn.val, //store the original jquery val function
      escapeRegex: function (str) {
        var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
        return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
      }
    };

    $.fn.inputmask = function (fn, options) {
      var opts = $.extend(true, {}, $.inputmask.defaults, options),
        msie10 = navigator.userAgent.match(new RegExp("msie 10", "i")) !== null,
        iphone = navigator.userAgent.match(new RegExp("iphone", "i")) !== null,
        android = navigator.userAgent.match(new RegExp("android.*safari.*", "i")) !== null,
        pasteEvent = isInputEventSupported('paste') && !msie10 ? 'paste' : 'input',
        android53x,
        masksets,
        activeMasksetIndex = 0;

      if (android) {
        var browser = navigator.userAgent.match(/safari.*/i),
          version = parseInt(new RegExp(/[0-9]+/).exec(browser));
        android53x = (version <= 537);
        //android534 = (533 < version) && (version <= 534);
      }
      if (typeof fn === "string") {
        switch (fn) {
          case "mask":
            //resolve possible aliases given by options
            resolveAlias(opts.alias, options);
            masksets = generateMaskSets();

            return this.each(function () {
              maskScope($.extend(true, {}, masksets), 0).mask(this);
            });
          case "unmaskedvalue":
            var $input = $(this), input = this;
            if ($input.data('_inputmask')) {
              masksets = $input.data('_inputmask')['masksets'];
              activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
              opts = $input.data('_inputmask')['opts'];
              return maskScope(masksets, activeMasksetIndex).unmaskedvalue($input);
            } else return $input.val();
          case "remove":
            return this.each(function () {
              var $input = $(this), input = this;
              if ($input.data('_inputmask')) {
                masksets = $input.data('_inputmask')['masksets'];
                activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                opts = $input.data('_inputmask')['opts'];
                //writeout the unmaskedvalue
                input._valueSet(maskScope(masksets, activeMasksetIndex).unmaskedvalue($input, true));
                //clear data
                $input.removeData('_inputmask');
                //unbind all events
                $input.unbind(".inputmask");
                $input.removeClass('focus.inputmask');
                //restore the value property
                var valueProperty;
                if (Object.getOwnPropertyDescriptor)
                  valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                if (valueProperty && valueProperty.get) {
                  if (input._valueGet) {
                    Object.defineProperty(input, "value", {
                      get: input._valueGet,
                      set: input._valueSet
                    });
                  }
                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                  if (input._valueGet) {
                    input.__defineGetter__("value", input._valueGet);
                    input.__defineSetter__("value", input._valueSet);
                  }
                }
                try { //try catch needed for IE7 as it does not supports deleting fns
                  delete input._valueGet;
                  delete input._valueSet;
                } catch (e) {
                  input._valueGet = undefined;
                  input._valueSet = undefined;

                }
              }
            });
            break;
          case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
            if (this.data('_inputmask')) {
              masksets = this.data('_inputmask')['masksets'];
              activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
              return masksets[activeMasksetIndex]['_buffer'].join('');
            }
            else return "";
          case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
            return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
          case "isComplete":
            masksets = this.data('_inputmask')['masksets'];
            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
            opts = this.data('_inputmask')['opts'];
            return maskScope(masksets, activeMasksetIndex).isComplete(this[0]._valueGet().split(''));
          default:
            //check if the fn is an alias
            if (!resolveAlias(fn, options)) {
              //maybe fn is a mask so we try
              //set mask
              opts.mask = fn;
            }
            masksets = generateMaskSets();

            return this.each(function () {
              maskScope($.extend(true, {}, masksets), activeMasksetIndex).mask(this);
            });

            break;
        }
      } else if (typeof fn == "object") {
        opts = $.extend(true, {}, $.inputmask.defaults, fn);

        resolveAlias(opts.alias, fn); //resolve aliases
        masksets = generateMaskSets();

        return this.each(function () {
          maskScope($.extend(true, {}, masksets), activeMasksetIndex).mask(this);
        });
      } else if (fn == undefined) {
        //look for data-inputmask atribute - the attribute should only contain optipns
        return this.each(function () {
          var attrOptions = $(this).attr("data-inputmask");
          if (attrOptions && attrOptions != "") {
            try {
              attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
              var dataoptions = $.parseJSON("{" + attrOptions + "}");
              $.extend(true, dataoptions, options);
              opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
              resolveAlias(opts.alias, dataoptions);
              opts.alias = undefined;
              $(this).inputmask(opts);
            } catch (ex) { } //need a more relax parseJSON
          }
        });
      }

      //helper functions
      function isInputEventSupported(eventName) {
        var el = document.createElement('input'),
          eventName = 'on' + eventName,
          isSupported = (eventName in el);
        if (!isSupported) {
          el.setAttribute(eventName, 'return;');
          isSupported = typeof el[eventName] == 'function';
        }
        el = null;
        return isSupported;
      }
      function resolveAlias(aliasStr, options) {
        var aliasDefinition = opts.aliases[aliasStr];
        if (aliasDefinition) {
          if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias); //alias is another alias
          $.extend(true, opts, aliasDefinition); //merge alias definition in the options
          $.extend(true, opts, options); //reapply extra given options
          return true;
        }
        return false;
      }
      function getMaskTemplate(mask) {
        var escaped = false, outCount = 0, greedy = opts.greedy, repeat = opts.repeat;
        if (repeat == "*") greedy = false;
        if (mask.length == 1 && greedy == false) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
        var singleMask = $.map(mask.split(""), function (element, index) {
          var outElem = [];
          if (element == opts.escapeChar) {
            escaped = true;
          }
          else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
            var maskdef = opts.definitions[element];
            if (maskdef && !escaped) {
              for (var i = 0; i < maskdef.cardinality; i++) {
                outElem.push(getPlaceHolder(outCount + i));
              }
            } else {
              outElem.push(element);
              escaped = false;
            }
            outCount += outElem.length;
            return outElem;
          }
        });

        //allocate repetitions
        var repeatedMask = singleMask.slice();
        for (var i = 1; i < repeat && greedy; i++) {
          repeatedMask = repeatedMask.concat(singleMask.slice());
        }

        return { "mask": repeatedMask, "repeat": repeat, "greedy": greedy };
      }
      //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
      function getTestingChain(mask) {
        var isOptional = false, escaped = false;
        var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

        return $.map(mask.split(""), function (element, index) {
          var outElem = [];

          if (element == opts.escapeChar) {
            escaped = true;
          } else if (element == opts.optionalmarker.start && !escaped) {
            isOptional = true;
            newBlockMarker = true;
          }
          else if (element == opts.optionalmarker.end && !escaped) {
            isOptional = false;
            newBlockMarker = true;
          }
          else {
            var maskdef = opts.definitions[element];
            if (maskdef && !escaped) {
              var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
              for (var i = 1; i < maskdef.cardinality; i++) {
                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] | element });
                if (isOptional == true) //reset newBlockMarker
                  newBlockMarker = false;
              }
              outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] | element });
            } else {
              outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null, def: element });
              escaped = false;
            }
            //reset newBlockMarker
            newBlockMarker = false;
            return outElem;
          }
        });
      }
      function generateMaskSets() {
        var ms = [];
        var genmasks = []; //used to keep track of the masks that where processed, to avoid duplicates
        function markOptional(maskPart) { //needed for the clearOptionalTail functionality
          return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
        }
        function splitFirstOptionalEndPart(maskPart) {
          var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
          for (i = 0; i < mpl; i++) {
            if (maskPart.charAt(i) == opts.optionalmarker.start) {
              optionalStartMarkers++;
            }
            if (maskPart.charAt(i) == opts.optionalmarker.end) {
              optionalEndMarkers++;
            }
            if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
              break;
          }
          var maskParts = [maskPart.substring(0, i)];
          if (i < mpl) {
            maskParts.push(maskPart.substring(i + 1, mpl));
          }
          return maskParts;
        }
        function splitFirstOptionalStartPart(maskPart) {
          var mpl = maskPart.length;
          for (i = 0; i < mpl; i++) {
            if (maskPart.charAt(i) == opts.optionalmarker.start) {
              break;
            }
          }
          var maskParts = [maskPart.substring(0, i)];
          if (i < mpl) {
            maskParts.push(maskPart.substring(i + 1, mpl));
          }
          return maskParts;
        }
        function generateMask(maskPrefix, maskPart) {
          var maskParts = splitFirstOptionalEndPart(maskPart);
          var newMask, maskTemplate;

          var masks = splitFirstOptionalStartPart(maskParts[0]);
          if (masks.length > 1) {
            newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
            if ($.inArray(newMask, genmasks) == -1) {
              genmasks.push(newMask);
              maskTemplate = getMaskTemplate(newMask);
              ms.push({
                "mask": newMask,
                "_buffer": maskTemplate["mask"],
                "buffer": maskTemplate["mask"].slice(),
                "tests": getTestingChain(newMask),
                "lastValidPosition": undefined,
                "greedy": maskTemplate["greedy"],
                "repeat": maskTemplate["repeat"]
              });
            }
            newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
            if ($.inArray(newMask, genmasks) == -1) {
              genmasks.push(newMask);
              maskTemplate = getMaskTemplate(newMask);
              ms.push({
                "mask": newMask,
                "_buffer": maskTemplate["mask"],
                "buffer": maskTemplate["mask"].slice(),
                "tests": getTestingChain(newMask),
                "lastValidPosition": undefined,
                "greedy": maskTemplate["greedy"],
                "repeat": maskTemplate["repeat"]
              });
            }
            if (splitFirstOptionalStartPart(masks[1]).length > 1) { //optional contains another optional
              generateMask(maskPrefix + masks[0], masks[1] + maskParts[1]);
            }
            if (maskParts.length > 1 && splitFirstOptionalStartPart(maskParts[1]).length > 1) {
              generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1]);
              generateMask(maskPrefix + masks[0], maskParts[1]);
            }
          }
          else {
            newMask = maskPrefix + maskParts;
            if ($.inArray(newMask, genmasks) == -1) {
              genmasks.push(newMask);
              maskTemplate = getMaskTemplate(newMask);
              ms.push({
                "mask": newMask,
                "_buffer": maskTemplate["mask"],
                "buffer": maskTemplate["mask"].slice(),
                "tests": getTestingChain(newMask),
                "lastValidPosition": undefined,
                "greedy": maskTemplate["greedy"],
                "repeat": maskTemplate["repeat"]
              });
            }
          }

        }
        if ($.isArray(opts.mask)) {
          $.each(opts.mask, function (ndx, lmnt) {
            generateMask("", lmnt.toString());
          });
        } else generateMask("", opts.mask.toString());

        return opts.greedy ? ms : ms.sort(function (a, b) { return a["mask"].length - b["mask"].length; });
      }
      function getPlaceHolder(pos) {
        return opts.placeholder.charAt(pos % opts.placeholder.length);
      }

      function maskScope(masksets, activeMasksetIndex) {
        //maskset helperfunctions

        function getActiveMaskSet() {
          return masksets[activeMasksetIndex];
        }

        function getActiveTests() {
          return getActiveMaskSet()['tests'];
        }

        function getActiveBufferTemplate() {
          return getActiveMaskSet()['_buffer'];
        }

        function getActiveBuffer() {
          return getActiveMaskSet()['buffer'];
        }

        function isValid(pos, c, strict, isRTL) { //strict true ~ no correction or autofill
          strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

          function _isValid(position, activeMaskset) {
            var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '', buffer = activeMaskset["buffer"];
            for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
              chrs += getBufferElement(buffer, testPos - (i - 1));
            }

            if (c) {
              chrs += c;
            }

            //return is false or a json object => { pos: ??, c: ??} or true
            return activeMaskset['tests'][testPos].fn != null ? activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts) : false;
          }

          if (strict) {
            var result = _isValid(pos, getActiveMaskSet()); //only check validity in current mask when validating strict
            if (result === true) {
              result = { "pos": pos }; //always take a possible corrected maskposition into account
            }
            return result;
          }

          var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex;
          $.each(masksets, function (index, value) {
            var activeMaskset = this;
            activeMasksetIndex = index;

            var maskPos = pos;
            if (currentActiveMasksetIndex != activeMasksetIndex && !isMask(pos)) {
              if (c == activeMaskset['_buffer'][maskPos] || c == opts.skipOptionalPartCharacter) { //match non-mask item
                results.push({ "activeMasksetIndex": index, "result": { "refresh": true, c: activeMaskset['_buffer'][maskPos] } }); //new command hack only rewrite buffer
                activeMaskset['lastValidPosition'] = maskPos;
                return false;
              } else {
                if (masksets[currentActiveMasksetIndex]["lastValidPosition"] >= maskPos)
                  activeMaskset['lastValidPosition'] = isRTL ? getMaskLength() + 1 : -1; //mark mask as validated and invalid
                else maskPos = isRTL ? seekPrevious(pos) : seekNext(pos);
              }

            }
            if ((activeMaskset['lastValidPosition'] == undefined
              && maskPos == (isRTL ? seekPrevious(getMaskLength()) : seekNext(-1))
              )
              || (isRTL || opts.numericInput)
              ? activeMaskset['lastValidPosition'] <= opts.numericInput ? getMaskLength() : seekNext(maskPos)
              : activeMaskset['lastValidPosition'] >= seekPrevious(maskPos)) {
              if (maskPos >= 0 && maskPos < getMaskLength()) {
                result = _isValid(maskPos, activeMaskset);
                if (result !== false) {
                  if (result === true) {
                    result = { "pos": maskPos }; //always take a possible corrected maskposition into account
                  }
                  var newValidPosition = result.pos || maskPos;
                  if (activeMaskset['lastValidPosition'] == undefined ||
                    (isRTL ?
                      (opts.greedy ?
                        activeMaskset['lastValidPosition'] > newValidPosition :
                        newValidPosition == getActiveBuffer().length - 1) :
                      activeMaskset['lastValidPosition'] < newValidPosition))
                    activeMaskset['lastValidPosition'] = opts.numericInput ? 0 : newValidPosition; //set new position from isValid
                }
                results.push({ "activeMasksetIndex": index, "result": result });
              }
            }
          });
          activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex

          return results; //return results of the multiple mask validations
        }

        function determineActiveMasksetIndex(isRTL) {
          var currentMasksetIndex = activeMasksetIndex,
            highestValid = { "activeMasksetIndex": 0, "lastValidPosition": isRTL ? getMaskLength() + 1 : -1 };
          $.each(masksets, function (index, value) {
            var activeMaskset = this;
            if (activeMaskset['lastValidPosition'] != undefined) {
              if ((isRTL || opts.numericInput) ? (activeMaskset['lastValidPosition'] < highestValid['lastValidPosition']) : (activeMaskset['lastValidPosition'] > highestValid['lastValidPosition'])) {
                highestValid["activeMasksetIndex"] = index;
                highestValid["lastValidPosition"] = activeMaskset['lastValidPosition'];
              }
            }
          });
          activeMasksetIndex = highestValid["activeMasksetIndex"];
          if (currentMasksetIndex != activeMasksetIndex) {
            if (isRTL) {
              clearBuffer(getActiveBuffer(), 0, seekPrevious(highestValid["lastValidPosition"]));
            } else {
              clearBuffer(getActiveBuffer(), seekNext(highestValid["lastValidPosition"]), getMaskLength());
            }
            getActiveMaskSet()["writeOutBuffer"] = true;
          }
        }

        function isMask(pos) {
          var testPos = determineTestPosition(pos);
          var test = getActiveTests()[testPos];

          return test != undefined ? test.fn : false;
        }

        function determineTestPosition(pos) {
          return pos % getActiveTests().length;
        }



        function getMaskLength() {
          return opts.getMaskLength(getActiveBufferTemplate(), getActiveMaskSet()['greedy'], getActiveMaskSet()['repeat'], getActiveBuffer(), opts);
        }

        //pos: from position

        function seekNext(pos) {
          var maskL = getMaskLength();
          if (pos >= maskL) return maskL;
          var position = pos;
          while (++position < maskL && !isMask(position)) {
          }
          ;
          return position;
        }

        //pos: from position

        function seekPrevious(pos) {
          var position = pos;
          if (position <= 0) return 0;

          while (--position > 0 && !isMask(position)) {
          }
          ;
          return position;
        }

        function setBufferElement(buffer, position, element, autoPrepare, isRTL) {
          if (autoPrepare) position = prepareBuffer(buffer, position, isRTL);

          var test = getActiveTests()[determineTestPosition(position)];
          var elem = element;
          if (elem != undefined) {
            switch (test.casing) {
              case "upper":
                elem = element.toUpperCase();
                break;
              case "lower":
                elem = element.toLowerCase();
                break;
            }
          }

          buffer[position] = elem;
        }

        function getBufferElement(buffer, position, autoPrepare) {
          if (autoPrepare) position = prepareBuffer(buffer, position);
          return buffer[position];
        }

        //needed to handle the non-greedy mask repetitions

        function prepareBuffer(buffer, position, isRTL) {
          var j;
          if (isRTL) {
            while (position < 0 && buffer.length < getMaskLength()) {
              j = getActiveBufferTemplate().length - 1;
              position = getActiveBufferTemplate().length;
              while (getActiveBufferTemplate()[j] !== undefined) {
                buffer.unshift(getActiveBufferTemplate()[j--]);
              }
            }
          } else {
            while (buffer[position] == undefined && buffer.length < getMaskLength()) {
              j = 0;
              while (getActiveBufferTemplate()[j] !== undefined) { //add a new buffer
                buffer.push(getActiveBufferTemplate()[j++]);
              }
            }
          }

          return position;
        }

        function writeBuffer(input, buffer, caretPos) {
          input._valueSet(buffer.join(''));
          if (caretPos != undefined) {
            caret(input, caretPos);
          }
        }

        ;

        function clearBuffer(buffer, start, end) {
          for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
            setBufferElement(buffer, i, getBufferElement(getActiveBufferTemplate().slice(), i, true));
          }
        }

        ;

        function setReTargetPlaceHolder(buffer, pos) {
          var testPos = determineTestPosition(pos);
          setBufferElement(buffer, pos, getBufferElement(getActiveBufferTemplate(), testPos));
        }

        function checkVal(input, writeOut, strict, nptvl) {
          var isRTL = $(input).data('_inputmask')['isRTL'],
            inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet(), isRTL).split('');

          $.each(masksets, function (ndx, ms) {
            ms["buffer"] = ms["_buffer"].slice();
            ms["lastValidPosition"] = undefined;
            ms["p"] = (isRTL && ms["greedy"] == true) ? getMaskLength() : -1;
          });
          if (strict !== true) activeMasksetIndex = 0;
          if (writeOut) input._valueSet(""); //initial clear

          if (isRTL && !opts.numericInput)
            inputValue = inputValue.reverse();

          var ml = getMaskLength();
          $.each(inputValue, function (ndx, charCode) {
            var index = (isRTL && getActiveMaskSet()["greedy"] == true) ? (opts.numericInput ? ml : ml - ndx) : ndx,
              lvp = getActiveMaskSet()["lastValidPosition"],
              pos = getActiveMaskSet()["p"];

            pos = lvp == undefined ? index : pos;
            lvp = lvp == undefined ? -1 : lvp;

            if ((strict && isMask(isRTL ? index - 1 : index)) ||
              ((charCode != getBufferElement(getActiveBufferTemplate().slice(), isRTL ? index - 1 : index, true) || isMask(isRTL ? index - 1 : index)) &&
                $.inArray(charCode, getActiveBufferTemplate().slice(lvp + 1, pos)) == -1)
              ) {
              $(input).trigger("keypress", [true, charCode.charCodeAt(0), writeOut, strict, index, isRTL]);
            }
          });
          if (strict === true) {
            getActiveMaskSet()["lastValidPosition"] = isRTL ? (opts.numericInput ? 0 : seekNext(getActiveMaskSet()["p"])) : seekPrevious(getActiveMaskSet()["p"]);
          }
        }

        function escapeRegex(str) {
          return $.inputmask.escapeRegex.call(this, str);
        }

        function truncateInput(inputValue, rtl) {
          return rtl ? inputValue.replace(new RegExp("^(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*"), "") : inputValue.replace(new RegExp("(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*$"), "");
        }

        function clearOptionalTail(input) {
          var buffer = getActiveBuffer(), tmpBuffer = buffer.slice(), testPos, pos;
          if ($(input).data('_inputmask')['isRTL']) {
            for (var pos = 0; pos <= tmpBuffer.length - 1; pos++) {
              var testPos = determineTestPosition(pos);
              if (getActiveTests()[testPos].optionality) {
                if (!isMask(pos) || !isValid(pos, buffer[pos], true))
                  tmpBuffer.splice(0, 1);
                else break;
              } else break;
            }
          } else {
            for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
              var testPos = determineTestPosition(pos);
              if (getActiveTests()[testPos].optionality) {
                if (!isMask(pos) || !isValid(pos, buffer[pos], true))
                  tmpBuffer.pop();
                else break;
              } else break;
            }
          }
          writeBuffer(input, tmpBuffer);
        }

        //functionality fn
        this.unmaskedvalue = function ($input, skipDatepickerCheck) {
          return unmaskedvalue($input, skipDatepickerCheck);
        };
        function unmaskedvalue($input, skipDatepickerCheck) {
          if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
            //checkVal(input, false, true);
            return $.map(getActiveBuffer(), function (element, index) {
              return isMask(index) && isValid(index, element, true) ? element : null;
            }).join('');
          } else {
            return $input[0]._valueGet();
          }
        }

        function caret(input, begin, end) {
          var npt = input.jquery && input.length > 0 ? input[0] : input, range;
          if (typeof begin == 'number') {
            if (!$(input).is(':visible')) {
              return;
            }
            end = (typeof end == 'number') ? end : begin;
            if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
            if (npt.setSelectionRange) {
              npt.selectionStart = begin;
              npt.selectionEnd = android ? begin : end;

            } else if (npt.createTextRange) {
              range = npt.createTextRange();
              range.collapse(true);
              range.moveEnd('character', end);
              range.moveStart('character', begin);
              range.select();
            }
          } else {
            if (!$(input).is(':visible')) {
              return { "begin": 0, "end": 0 };
            }
            if (npt.setSelectionRange) {
              begin = npt.selectionStart;
              end = npt.selectionEnd;
            } else if (document.selection && document.selection.createRange) {
              range = document.selection.createRange();
              begin = 0 - range.duplicate().moveStart('character', -100000);
              end = begin + range.text.length;
            }
            return { "begin": begin, "end": end };
          }
        };

        this.isComplete = function (buffer) {
          return isComplete(buffer);
        };
        function isComplete(buffer) {
          var complete = false, highestValidPosition = 0, currentActiveMasksetIndex = activeMasksetIndex;
          $.each(masksets, function (ndx, ms) {
            activeMasksetIndex = ndx;
            var aml = seekPrevious(getMaskLength());
            if (ms["lastValidPosition"] != undefined && ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == aml) {
              var msComplete = true;
              for (var i = 0; i <= aml; i++) {
                var mask = isMask(i), testPos = determineTestPosition(i);
                if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceHolder(i))) || (!mask && buffer[i] != getActiveBufferTemplate()[testPos])) {
                  msComplete = false;
                  break;
                }
              }
              complete = complete || msComplete;
              if (complete) //break loop
                return false;
            }
            highestValidPosition = ms["lastValidPosition"];
          });
          activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
          return complete;
        }
        this.mask = function (el) {
          var $input = $(el);
          if (!$input.is(":input")) return;

          //store tests & original buffer in the input element - used to get the unmasked value
          $input.data('_inputmask', {
            'masksets': masksets,
            'activeMasksetIndex': activeMasksetIndex,
            'opts': opts,
            'isRTL': false
          });

          //show tooltip
          if (opts.showTooltip) {
            $input.prop("title", getActiveMaskSet()["mask"]);
          }

          //correct greedy setting if needed
          getActiveMaskSet()['greedy'] = getActiveMaskSet()['greedy'] ? getActiveMaskSet()['greedy'] : getActiveMaskSet()['repeat'] == 0;

          //handle maxlength attribute
          if ($input.attr("maxLength") != null) //only when the attribute is set
          {
            var maxLength = $input.prop('maxLength');
            if (maxLength > -1) { //handle *-repeat
              $.each(masksets, function (ndx, ms) {
                if (ms["repeat"] == "*") {
                  ms["repeat"] = maxLength;
                }
              });
            }
            if (getMaskLength() > maxLength && maxLength > -1) { //FF sets no defined max length to -1
              if (maxLength < getActiveBufferTemplate().length) getActiveBufferTemplate().length = maxLength;
              if (getActiveMaskSet()['greedy'] == false) {
                getActiveMaskSet()['repeat'] = Math.round(maxLength / getActiveBufferTemplate().length);
              }
              $input.prop('maxLength', getMaskLength() * 2);
            }
          }

          patchValueProperty(el);

          //init vars
          getActiveMaskSet()["undoBuffer"] = el._valueGet();
          var skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
            ignorable = false,
            isRTL = false;
          if (el.dir == "rtl" || opts.numericInput) {
            if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics))
              $input.css("text-align", "right");
            el.dir = "ltr";
            $input.removeAttr("dir");
            var inputData = $input.data('_inputmask');
            inputData['isRTL'] = true;
            $input.data('_inputmask', inputData);
            isRTL = true;
          }

          //unbind all events - to make sure that no other mask will interfere when re-masking
          $input.unbind(".inputmask");
          $input.removeClass('focus.inputmask');
          //bind events
          $input.closest('form').bind("submit", function () { //trigger change on submit if any
            if ($input[0]._valueGet && $input[0]._valueGet() != getActiveMaskSet()["undoBuffer"]) {
              $input.change();
            }
          }).bind('reset', function () {
              $.each(masksets, function (ndx, ms) {
                ms["buffer"] = ms["_buffer"].slice();
                ms["lastValidPosition"] = undefined;
                ms["p"] = -1;
              });
            });
          $input.bind("mouseenter.inputmask", function () {
            var $input = $(this), input = this;
            if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
              if (input._valueGet() != getActiveBuffer().join('')) {
                writeBuffer(input, getActiveBuffer());
              }
            }
          }).bind("blur.inputmask", function () {
              var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getActiveBuffer();
              $input.removeClass('focus.inputmask');
              if (nptValue != getActiveMaskSet()["undoBuffer"]) {
                $input.change();
              }
              if (opts.clearMaskOnLostFocus && nptValue != '') {
                if (nptValue == getActiveBufferTemplate().join(''))
                  input._valueSet('');
                else { //clearout optional tail of the mask
                  clearOptionalTail(input);
                }
              }
              if (!isComplete(buffer)) {
                $input.trigger("incomplete");
                if (opts.clearIncomplete) {
                  $.each(masksets, function (ndx, ms) {
                    ms["buffer"] = ms["_buffer"].slice();
                    ms["lastValidPosition"] = undefined;
                    ms["p"] = isRTL ? getMaskLength() : 0;
                  });
                  activeMasksetIndex = 0;
                  if (opts.clearMaskOnLostFocus)
                    input._valueSet('');
                  else {
                    buffer = getActiveBufferTemplate().slice();
                    writeBuffer(input, buffer);
                  }
                }
              }
            }).bind("focus.inputmask", function () {
              var $input = $(this), input = this, nptValue = input._valueGet();
              if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                if (input._valueGet() != getActiveBuffer().join('')) {
                  writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
                }
              }
              $input.addClass('focus.inputmask');
              getActiveMaskSet()["undoBuffer"] = input._valueGet();
              $input.click();
            }).bind("mouseleave.inputmask", function () {
              var $input = $(this), input = this;
              if (opts.clearMaskOnLostFocus) {
                if (!$input.hasClass('focus.inputmask')) {
                  if (input._valueGet() == getActiveBufferTemplate().join('') || input._valueGet() == '')
                    input._valueSet('');
                  else { //clearout optional tail of the mask
                    clearOptionalTail(input);
                  }
                }
              }
            }).bind("click.inputmask", function () {
              var input = this;
              setTimeout(function () {
                var selectedCaret = caret(input), buffer = getActiveBuffer();
                if (selectedCaret.begin == selectedCaret.end) {
                  var clickPosition = selectedCaret.begin,
                    lvp = getActiveMaskSet()["lastValidPosition"],
                    lastPosition;
                  determineInputDirection(input, selectedCaret);
                  if (isRTL) {
                    if (opts.numericInput) {
                      lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ? $.inArray(opts.radixPoint, buffer) : getMaskLength();
                    } else {
                      lastPosition = seekPrevious((lvp == undefined ? getMaskLength() : lvp) + 1);
                    }
                    caret(input, clickPosition > lastPosition && (isValid(clickPosition, buffer[clickPosition], true, isRTL) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                  } else {
                    lastPosition = seekNext(lvp == undefined ? -1 : lvp);
                    caret(input, clickPosition < lastPosition && (isValid(clickPosition, buffer[clickPosition], true, isRTL) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                  }
                }
              }, 0);
            }).bind('dblclick.inputmask', function () {
              var input = this;
              if (getActiveMaskSet()["lastValidPosition"] != undefined) {
                setTimeout(function () {
                  isRTL ?
                    caret(input, seekPrevious(getActiveMaskSet()["lastValidPosition"]), getMaskLength()) :
                    caret(input, 0, seekNext(getActiveMaskSet()["lastValidPosition"]));
                }, 0);
              }
            }).bind("keydown.inputmask", keydownEvent
            ).bind("keypress.inputmask", keypressEvent
            ).bind("keyup.inputmask", keyupEvent
            ).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function () {
              var input = this, $input = $(input);
              setTimeout(function () {
                checkVal(input, true, false);
                if (isComplete(getActiveBuffer()))
                  $input.trigger("complete");
                $input.click();
              }, 0);
            }).bind('setvalue.inputmask', function () {
              var input = this;
              getActiveMaskSet()["undoBuffer"] = input._valueGet();
              checkVal(input, true);
              if (input._valueGet() == getActiveBufferTemplate().join(''))
                input._valueSet('');
            }).bind('complete.inputmask', opts.oncomplete)
            .bind('incomplete.inputmask', opts.onincomplete)
            .bind('cleared.inputmask', opts.oncleared);

          //apply mask
          checkVal(el, true, false);
          // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
          var activeElement;
          try {
            activeElement = document.activeElement;
          } catch (e) {
          }
          if (activeElement === el) { //position the caret when in focus
            $input.addClass('focus.inputmask');
            caret(el, getActiveMaskSet()["p"]);
          } else if (opts.clearMaskOnLostFocus) {
            if (getActiveBuffer().join('') == getActiveBufferTemplate().join('')) {
              el._valueSet('');
            } else {
              clearOptionalTail(el);
            }
          } else {
            writeBuffer(el, getActiveBuffer());
          }

          installEventRuler(el);

          //private functions

          function installEventRuler(npt) {
            var events = $._data(npt).events;

            $.each(events, function (eventType, eventHandlers) {
              $.each(eventHandlers, function (ndx, eventHandler) {
                if (eventHandler.namespace == "inputmask") {
                  var handler = eventHandler.handler;
                  eventHandler.handler = function (e) {
                    if (this.readOnly || this.disabled)
                      e.preventDefault;
                    else
                      return handler.apply(this, arguments);
                  };
                }
              });
            });
          }

          function patchValueProperty(npt) {
            var valueProperty;
            if (Object.getOwnPropertyDescriptor)
              valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
            if (valueProperty && valueProperty.get) {
              if (!npt._valueGet) {

                npt._valueGet = valueProperty.get;
                npt._valueSet = valueProperty.set;

                Object.defineProperty(npt, "value", {
                  get: function () {
                    var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                      activeMasksetIndex = inputData['activeMasksetIndex'];
                    return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : this._valueGet() != masksets[activeMasksetIndex]['_buffer'].join('') ? this._valueGet() : '';
                  },
                  set: function (value) {
                    this._valueSet(value);
                    $(this).triggerHandler('setvalue.inputmask');
                  }
                });
              }
            } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
              if (!npt._valueGet) {
                npt._valueGet = npt.__lookupGetter__("value");
                npt._valueSet = npt.__lookupSetter__("value");

                npt.__defineGetter__("value", function () {
                  var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                    activeMasksetIndex = inputData['activeMasksetIndex'];
                  return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : this._valueGet() != masksets[activeMasksetIndex]['_buffer'].join('') ? this._valueGet() : '';
                });
                npt.__defineSetter__("value", function (value) {
                  this._valueSet(value);
                  $(this).triggerHandler('setvalue.inputmask');
                });
              }
            } else {
              if (!npt._valueGet) {
                npt._valueGet = function () { return this.value; };
                npt._valueSet = function (value) { this.value = value; };
              }
              if ($.fn.val.inputmaskpatch != true) {
                $.fn.val = function () {
                  if (arguments.length == 0) {
                    var $self = $(this);
                    if ($self.data('_inputmask')) {
                      if ($self.data('_inputmask')['opts'].autoUnmask)
                        return $self.inputmask('unmaskedvalue');
                      else {
                        var result = $.inputmask.val.apply($self);
                        var inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                          activeMasksetIndex = inputData['activeMasksetIndex'];
                        return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
                      }
                    } else return $.inputmask.val.apply($self);
                  } else {
                    var args = arguments;
                    return this.each(function () {
                      var $self = $(this);
                      var result = $.inputmask.val.apply($self, args);
                      if ($self.data('_inputmask')) $self.triggerHandler('setvalue.inputmask');
                      return result;
                    });
                  }
                };
                $.extend($.fn.val, {
                  inputmaskpatch: true
                });
              }
            }
          }

          function determineInputDirection(input, pos) {
            //set input direction according the position to the radixPoint
            if (opts.numericInput && opts.radixPoint != "" && opts.skipRadixDance === false) {
              var nptStr = input._valueGet();
              var radixPosition = nptStr.indexOf(opts.radixPoint);
              isRTL = pos.begin <= radixPosition || pos.end <= radixPosition || radixPosition == -1;
            }
          }

          //shift chars to left from start to end and put c at end position if defined

          function shiftL(start, end, c) {
            var buffer = getActiveBuffer();
            while (!isMask(start) && start - 1 >= 0) start--; //jumping over nonmask position
            for (var i = start; i < end && i < getMaskLength() ; i++) {
              if (isMask(i)) {
                setReTargetPlaceHolder(buffer, i);
                var j = seekNext(i);
                var p = getBufferElement(buffer, j);
                if (p != getPlaceHolder(j)) {
                  if (j < getMaskLength() && isValid(i, p, true, isRTL) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                    setBufferElement(buffer, i, getBufferElement(buffer, j), true, isRTL);
                    if (j < end) {
                      setReTargetPlaceHolder(buffer, j); //cleanup next position
                    }
                  } else {
                    if (isMask(i))
                      break;
                  }
                } //else if (c == undefined) break;
              } else {
                setReTargetPlaceHolder(buffer, i);
              }
            }
            if (c != undefined)
              setBufferElement(buffer, isRTL ? end : seekPrevious(end), c);

            if (getActiveMaskSet()["greedy"] == false) {
              var trbuffer = truncateInput(buffer.join(''), isRTL).split('');
              buffer.length = trbuffer.length;
              for (var i = 0, bl = buffer.length; i < bl; i++) {
                buffer[i] = trbuffer[i];
              }
              if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
            }
            return start; //return the used start position
          }

          function shiftR(start, end, c, full) { //full => behave like a push right ~ do not stop on placeholders
            var buffer = getActiveBuffer();
            for (var i = start; i <= end && i < getMaskLength() ; i++) {
              if (isMask(i)) {
                var t = getBufferElement(buffer, i, true);
                setBufferElement(buffer, i, c, true, isRTL);
                if (t != getPlaceHolder(i)) {
                  var j = seekNext(i);
                  if (j < getMaskLength()) {
                    if (isValid(j, t, true, isRTL) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def)
                      c = t;
                    else {
                      if (isMask(j))
                        break;
                      else c = t;
                    }
                  } else break;
                } else {
                  c = t;
                  if (full !== true) break;
                }
              } else
                setReTargetPlaceHolder(buffer, i);
            }
            var lengthBefore = buffer.length;
            if (getActiveMaskSet()["greedy"] == false) {
              var trbuffer = truncateInput(buffer.join(''), isRTL).split('');
              buffer.length = trbuffer.length;
              for (var i = 0, bl = buffer.length; i < bl; i++) {
                buffer[i] = trbuffer[i];
              }
              if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
            }
            return end - (lengthBefore - buffer.length); //return new start position
          }

          ;

          function keydownEvent(e) {
            //Safari 5.1.x - modal dialog fires keypress twice workaround
            skipKeyPressEvent = false;

            var input = this, k = e.keyCode, pos = caret(input);
            determineInputDirection(input, pos);

            //backspace, delete, and escape get special treatment
            if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || (e.ctrlKey && k == 88)) { //backspace/delete
              e.preventDefault(); //stop default action but allow propagation
              var beginPos = pos.begin;
              if (pos.begin == 0 && pos.end == getMaskLength()) {
                clearBuffer(getActiveBuffer(), pos.begin, pos.end);
                $.each(masksets, function (ndx, ms) {
                  ms["buffer"] = ms["_buffer"].slice();
                  ms["lastValidPosition"] = undefined;
                  ms["p"] = isRTL ? getMaskLength() : 0;
                });
              } else if ((pos.end - pos.begin) > 1 || ((pos.end - pos.begin) == 1 && opts.insertMode)) { //partial selection
                clearBuffer(getActiveBuffer(), pos.begin, pos.end);
                var ml = getMaskLength();
                if (opts.greedy == false) {
                  isRTL ? shiftR(0, pos.end - 1, getPlaceHolder(pos.end), true) : shiftL(pos.begin, ml);
                } else {
                  for (var i = pos.begin; i < pos.end; i++) {
                    if (isMask(i))
                      isRTL ? shiftR(0, pos.end - 1, getPlaceHolder(pos.end), true) : shiftL(pos.begin, ml);
                  }
                }
                checkVal(input, false, true, getActiveBuffer());
              } else {
                $.each(masksets, function (ndx, ms) {
                  activeMasksetIndex = ndx;
                  beginPos = android53x ? pos.end : pos.begin;
                  var buffer = getActiveBuffer(), firstMaskPos = isRTL ? seekPrevious(getMaskLength() + 1) : seekNext(-1),
                    maskL = getMaskLength();
                  if (k == opts.keyCode.DELETE) { //handle delete
                    if (isRTL ? beginPos > firstMaskPos : beginPos < firstMaskPos)
                      beginPos = firstMaskPos;
                    if (beginPos < maskL) {
                      if (opts.numericInput && opts.radixPoint != "" && buffer[beginPos] == opts.radixPoint) {
                        beginPos = (buffer.length - 1 == beginPos) /* radixPoint is latest? delete it */ ? beginPos : seekNext(beginPos);
                        beginPos = shiftL(beginPos, maskL);
                      } else {
                        if (isRTL) {
                          beginPos = shiftR(0, beginPos, getPlaceHolder(beginPos), true);
                          beginPos = seekNext(beginPos);
                        } else {
                          beginPos = shiftL(beginPos, maskL);
                        }
                      }
                      if (getActiveMaskSet()['lastValidPosition'] != undefined) {
                        if (getActiveMaskSet()['lastValidPosition'] != -1 && getActiveBuffer()[getActiveMaskSet()['lastValidPosition']] == getActiveBufferTemplate()[getActiveMaskSet()['lastValidPosition']])
                          getActiveMaskSet()["lastValidPosition"] = isRTL ? seekNext(getActiveMaskSet()["lastValidPosition"]) : (getActiveMaskSet()["lastValidPosition"] == 0 ? -1 : seekPrevious(getActiveMaskSet()["lastValidPosition"]));
                        if (isRTL ? getActiveMaskSet()['lastValidPosition'] > firstMaskPos : getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                          getActiveMaskSet()["lastValidPosition"] = undefined;
                          getActiveMaskSet()["p"] = firstMaskPos;
                        } else {
                          getActiveMaskSet()["writeOutBuffer"] = true;
                          getActiveMaskSet()["p"] = beginPos;
                        }
                      }
                    }
                  } else if (k == opts.keyCode.BACKSPACE) { //handle backspace
                    if (isRTL ? beginPos <= firstMaskPos : beginPos > firstMaskPos) {
                      beginPos -= 1;
                      if (opts.numericInput && opts.radixPoint != "" && buffer[beginPos] == opts.radixPoint) {
                        beginPos = shiftR(0, (buffer.length - 1 == beginPos) /* radixPoint is latest? delete it */ ? beginPos : beginPos - 1, getPlaceHolder(beginPos), true);
                        beginPos++;
                      } else {
                        if (isRTL) {
                          beginPos = shiftR(0, beginPos, getPlaceHolder(beginPos), true);
                          beginPos = buffer[beginPos + 1] == opts.radixPoint ? beginPos + 1 : seekNext(beginPos);
                        } else {
                          beginPos = shiftL(beginPos, maskL);
                        }
                      }
                      if (getActiveMaskSet()['lastValidPosition'] != undefined) {
                        if (getActiveMaskSet()['lastValidPosition'] != -1 && getActiveBuffer()[getActiveMaskSet()['lastValidPosition']] == getActiveBufferTemplate()[getActiveMaskSet()['lastValidPosition']])
                          getActiveMaskSet()["lastValidPosition"] = isRTL ? seekNext(getActiveMaskSet()["lastValidPosition"]) : (getActiveMaskSet()["lastValidPosition"] == 0 ? -1 : seekPrevious(getActiveMaskSet()["lastValidPosition"]));
                        if (isRTL ? getActiveMaskSet()['lastValidPosition'] > firstMaskPos : getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                          getActiveMaskSet()["lastValidPosition"] = undefined;
                          getActiveMaskSet()["p"] = firstMaskPos;
                        } else {
                          getActiveMaskSet()["writeOutBuffer"] = true;
                          getActiveMaskSet()["p"] = beginPos;
                        }
                      }
                    } else if (activeMasksetIndex > 0) { //retry other masks
                      getActiveMaskSet()["lastValidPosition"] = undefined;
                      getActiveMaskSet()["writeOutBuffer"] = true;
                      getActiveMaskSet()["p"] = firstMaskPos;
                      //init first
                      activeMasksetIndex = 0;
                      getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                      getActiveMaskSet()["p"] = isRTL ? seekPrevious(getMaskLength() + 1) : seekNext(-1);
                      getActiveMaskSet()["lastValidPosition"] = undefined;
                    }
                  }
                });

              }

              determineActiveMasksetIndex(isRTL);
              writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
              if (input._valueGet() == getActiveBufferTemplate().join(''))
                $(input).trigger('cleared');

              if (opts.showTooltip) { //update tooltip
                $input.prop("title", getActiveMaskSet()["mask"]);
              }
            } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
              setTimeout(function () {
                var caretPos = isRTL ? getActiveMaskSet()["lastValidPosition"] : seekNext(getActiveMaskSet()["lastValidPosition"]);
                if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
              }, 0);
            } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
              caret(input, 0, e.shiftKey ? pos.begin : 0);
            } else if (k == opts.keyCode.ESCAPE) { //escape
              input._valueSet(getActiveMaskSet()["undoBuffer"]);
              checkVal(input, true, true);
            } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
              opts.insertMode = !opts.insertMode;
              caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
            } else if (opts.insertMode == false && !e.shiftKey) {
              if (k == opts.keyCode.RIGHT) {
                setTimeout(function () {
                  var caretPos = caret(input);
                  caret(input, caretPos.begin);
                }, 0);
              } else if (k == opts.keyCode.LEFT) {
                setTimeout(function () {
                  var caretPos = caret(input);
                  caret(input, caretPos.begin - 1);
                }, 0);
              }
            }
            var caretPos = caret(input);
            opts.onKeyDown.call(this, e, getActiveBuffer(), opts); //extra stuff to execute on keydown
            caret(input, caretPos.begin, caretPos.end);
            ignorable = $.inArray(k, opts.ignorables) != -1;
          }

          function keypressEvent(e, checkval, k, writeOut, strict, ndx, rtl) {
            isRTL = rtl == undefined ? isRTL : rtl;

            //Safari 5.1.x - modal dialog fires keypress twice workaround
            if (k == undefined && skipKeyPressEvent) return false;
            skipKeyPressEvent = true;

            var input = this, $input = $(input);

            e = e || window.event;
            var k = k || e.which || e.charCode || e.keyCode,
              c = String.fromCharCode(k);

            if (opts.numericInput && c == opts.radixPoint && checkval !== true) {
              var nptStr = input._valueGet();
              var radixPosition = nptStr.indexOf(opts.radixPoint);
              caret(input, seekNext(radixPosition != -1 ? radixPosition : getMaskLength()));
            }

            if ((!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) && checkval !== true) {
              return true;
            } else {
              if (k) {
                var pos, results, result;
                if (checkval) {
                  var pcaret = strict ? ndx : (opts.numericInput ? seekNext(getActiveMaskSet()["p"]) : getActiveMaskSet()["p"]);
                  pos = { begin: pcaret, end: pcaret };
                } else {
                  pos = caret(input);
                }

                //should we clear a possible selection??
                var isSelection = (pos.end - pos.begin) > 1 || ((pos.end - pos.begin) == 1 && opts.insertMode), redetermineLVP = false;
                if (isSelection) {
                  var initialIndex = activeMasksetIndex;
                  $.each(masksets, function (ndx, lmnt) {
                    activeMasksetIndex = ndx;
                    getActiveMaskSet()["undoBuffer"] = getActiveBuffer().join(''); //init undobuffer for recovery when not valid
                    var posend = pos.end < getMaskLength() ? pos.end : getMaskLength();
                    if (getActiveMaskSet()["lastValidPosition"] > pos.begin && getActiveMaskSet()["lastValidPosition"] < posend) {
                      getActiveMaskSet()["lastValidPosition"] = isRTL ? seekNext(posend) : seekPrevious(pos.begin);
                    } else {
                      redetermineLVP = true;
                    }
                    clearBuffer(getActiveBuffer(), pos.begin, posend);
                    var ml = getMaskLength();
                    if (opts.greedy == false) {
                      isRTL ? shiftR(0, posend - 1, getPlaceHolder(posend), true) : shiftL(pos.begin, ml);
                    } else {
                      for (var i = pos.begin; i < posend; i++) {
                        if (isMask(i))
                          isRTL ? shiftR(0, posend - 1, getPlaceHolder(posend - 1), true) : shiftL(pos.begin, ml);
                      }
                    }
                  });
                  if (redetermineLVP === true) {
                    activeMasksetIndex = initialIndex;
                    checkVal(input, false, true, getActiveBuffer());
                    if (!opts.insertMode) { //preserve some space
                      $.each(masksets, function (ndx, lmnt) {
                        activeMasksetIndex = ndx;
                        isRTL ? shiftL(0, posend) : shiftR(pos.begin, getMaskLength(), getPlaceHolder(pos.begin), true);
                        getActiveMaskSet()["lastValidPosition"] = isRTL ? seekPrevious(getActiveMaskSet()["lastValidPosition"]) : seekNext(getActiveMaskSet()["lastValidPosition"]);
                      });
                    }
                  }
                  activeMasksetIndex = initialIndex; //restore index
                }

                if (isRTL) {
                  var p = seekPrevious(isSelection ? pos.begin : pos.end);
                  results = isValid(p, c, strict, isRTL);
                  if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
                  $.each(results, function (index, result) {
                    activeMasksetIndex = result["activeMasksetIndex"];
                    getActiveMaskSet()["writeOutBuffer"] = true;
                    var np = result["result"];
                    if (np !== false) {
                      var refresh = false, buffer = getActiveBuffer();
                      if (np !== true) {
                        refresh = np["refresh"]; //only rewrite buffer from isValid
                        p = np.pos != undefined ? np.pos : p; //set new position from isValid
                        c = np.c != undefined ? np.c : c; //set new char from isValid
                      }
                      if (refresh !== true) {
                        var maskL = getMaskLength(); //update masklength to include possible groupSeparator offset
                        var firstMaskPos = seekNext(-1), firstUnmaskedPosition = firstMaskPos;
                        if (opts.insertMode == true) {
                          if (getActiveMaskSet()['greedy'] == true) {
                            var bfrClone = buffer.slice();
                            while (getBufferElement(bfrClone, firstUnmaskedPosition, true) != getPlaceHolder(firstUnmaskedPosition) && firstUnmaskedPosition <= p) {
                              firstUnmaskedPosition = firstUnmaskedPosition == maskL ? (maskL + 1) : seekNext(firstUnmaskedPosition);
                            }
                          }
                          if (firstUnmaskedPosition <= p && (getActiveMaskSet()['greedy'] || (buffer.length < maskL || getBufferElement(buffer, p) == getPlaceHolder(p)))) {
                            if (buffer[firstMaskPos] != getPlaceHolder(firstMaskPos) && buffer.length < maskL) {
                              var offset = prepareBuffer(buffer, -1, isRTL);
                              if ((isSelection ? pos.begin : pos.end) != 0) p = p + offset;
                              maskL = buffer.length;
                            }
                            shiftL(firstUnmaskedPosition, p, c);
                            //shift the lvp if needed
                            var lvp = getActiveMaskSet()["lastValidPosition"], plvp = seekPrevious(lvp);
                            if (lvp <= p && (getBufferElement(getActiveBuffer(), plvp) != getPlaceHolder(plvp))) {
                              getActiveMaskSet()["lastValidPosition"] = plvp;
                            }
                          } else getActiveMaskSet()["writeOutBuffer"] = false;
                        } else setBufferElement(buffer, p, c, true, isRTL);
                      }
                      getActiveMaskSet()["p"] = p;
                    }
                  });
                } else {
                  var p = seekNext(pos.begin - 1);
                  results = isValid(p, c, strict, isRTL);
                  if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
                  $.each(results, function (index, result) {
                    activeMasksetIndex = result["activeMasksetIndex"];
                    getActiveMaskSet()["writeOutBuffer"] = true;
                    var np = result["result"];
                    if (np !== false) {
                      var refresh = false, buffer = getActiveBuffer();
                      if (np !== true) {
                        refresh = np["refresh"]; //only rewrite buffer from isValid
                        p = np.pos != undefined ? np.pos : p; //set new position from isValid
                        c = np.c != undefined ? np.c : c; //set new char from isValid
                      }
                      if (refresh !== true) {
                        if (opts.insertMode == true) {
                          var lastUnmaskedPosition = getMaskLength();
                          var bfrClone = buffer.slice();
                          while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(lastUnmaskedPosition);
                          }
                          if (lastUnmaskedPosition >= p) {
                            shiftR(p, buffer.length, c);
                            //shift the lvp if needed
                            var lvp = getActiveMaskSet()["lastValidPosition"], nlvp = seekNext(lvp);
                            if (nlvp != getMaskLength() && lvp >= p && (getBufferElement(getActiveBuffer(), nlvp) != getPlaceHolder(nlvp))) {
                              getActiveMaskSet()["lastValidPosition"] = nlvp;
                            }
                          } else getActiveMaskSet()["writeOutBuffer"] = false;
                        } else setBufferElement(buffer, p, c, true, isRTL);
                      }
                      getActiveMaskSet()["p"] = seekNext(p);
                    }
                  });
                }

                if (strict !== true) determineActiveMasksetIndex(isRTL);
                if (writeOut !== false) {
                  $.each(results, function (ndx, rslt) {
                    if (rslt["activeMasksetIndex"] == activeMasksetIndex) {
                      result = rslt;
                      return false;
                    }
                  });
                  if (result != undefined) {
                    var self = this;
                    setTimeout(function () { opts.onKeyValidation.call(self, result["result"], opts); }, 0);
                    if (getActiveMaskSet()["writeOutBuffer"] && result["result"] !== false) {
                      var buffer = getActiveBuffer();
                      writeBuffer(input, buffer, checkval ? undefined : ((opts.numericInput && isRTL) ? seekNext(getActiveMaskSet()["p"]) : getActiveMaskSet()["p"]));
                      if (checkval !== true) {
                        setTimeout(function() { //timeout needed for IE
                          if (isComplete(buffer))
                            $input.trigger("complete");
                        }, 0);
                      }
                    } else if (isSelection) {
                      getActiveMaskSet()["buffer"] = getActiveMaskSet()["undoBuffer"].split('');
                    }
                  }
                }

                if (opts.showTooltip) { //update tooltip
                  $input.prop("title", getActiveMaskSet()["mask"]);
                }
                e.preventDefault();
              }
            }
          }

          function keyupEvent(e) {
            var $input = $(this), input = this, k = e.keyCode, buffer = getActiveBuffer();
            var caretPos = caret(input);
            opts.onKeyUp.call(this, e, buffer, opts); //extra stuff to execute on keyup
            caret(input, caretPos.begin, caretPos.end);
            if (k == opts.keyCode.TAB && $input.hasClass('focus.inputmask') && input._valueGet().length == 0 && opts.showMaskOnFocus) {
              buffer = getActiveBufferTemplate().slice();
              writeBuffer(input, buffer);
              if (!isRTL) caret(input, 0);
              getActiveMaskSet()["undoBuffer"] = input._valueGet();
            }
          }
        };
        return this;
      };
      return this;
    };
  }
})(jQuery);

